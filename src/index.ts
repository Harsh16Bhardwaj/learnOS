import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { buildPdf } from "./buildPdf.js";
import { commitAndPush } from "./gitPublish.js";
import { parseSyllabus } from "./parseSyllabus.js";
import { validateArticle } from "./qualityCheck.js";
import { renderArticleHtml, renderHomePage } from "./renderHtml.js";
import { sendEmail } from "./sendEmail.js";
import { formatPrepareResult, prepareDay, readConfig, readCounter } from "./selectTopic.js";
import { FinalizeResult } from "./types.js";
import {
  ROOT_DIR,
  ensureDir,
  parseArgs,
  quoteHtml,
  readText,
  writeText
} from "./utils.js";
import { updateCounterForSuccess } from "./updateCounter.js";
import {
  buildReferenceFromMarkdown,
  bumpRevisionHistoryForTargets,
  writeReference
} from "./referenceMemory.js";

async function runPrepare(): Promise<void> {
  const topics = parseSyllabus();
  const result = prepareDay(topics);
  console.log(formatPrepareResult(result));
}

async function runRenderHome(): Promise<void> {
  const config = readConfig();
  const counter = readCounter();
  const topics = parseSyllabus();
  const latestDay = counter.completedDays[counter.completedDays.length - 1];
  const latestTopic = topics.find((topic) => topic.day === latestDay) ?? null;
  const readHref = latestTopic ? `./site/days/${latestTopic.slug}.html` : "./outputs/markdown/";

  writeText(
    path.join(ROOT_DIR, "index.html"),
    renderHomePage({
      config,
      topic: latestTopic,
      today: counter.lastGeneratedDate,
      currentDay: latestDay ?? counter.currentDay,
      readHref
    })
  );
}

async function runFinalize(markdownPathInput: string): Promise<void> {
  const markdownPath = path.resolve(ROOT_DIR, markdownPathInput);
  if (!fs.existsSync(markdownPath)) {
    throw new Error(`Markdown file not found: ${markdownPath}`);
  }

  const topics = parseSyllabus();
  const config = readConfig();
  const prepareResult = prepareDay(topics);
  if (prepareResult.status !== "ready") {
    throw new Error(prepareResult.reason ?? "The day is not in a ready state.");
  }

  if (path.resolve(prepareResult.markdownPath) !== markdownPath) {
    throw new Error(`Expected markdown at ${prepareResult.markdownPath}, received ${markdownPath}.`);
  }

  const markdownSource = readText(markdownPath);
  validateArticle(markdownSource);

  ensureDir(path.dirname(prepareResult.htmlPath));
  ensureDir(path.dirname(prepareResult.pdfPath));
  ensureDir(path.dirname(prepareResult.sitePath));

  const html = renderArticleHtml({
    config,
    topic: prepareResult.topic,
    markdownSource,
    day: prepareResult.day,
    today: prepareResult.today,
    revisionTargets: prepareResult.revisionTargets
  });

  writeText(prepareResult.htmlPath, html);
  writeText(prepareResult.sitePath, html);

  await buildPdf(prepareResult.htmlPath, prepareResult.pdfPath);

  const reference = buildReferenceFromMarkdown({
    topic: prepareResult.topic,
    day: prepareResult.day,
    markdownSource
  });
  const referencePath = writeReference(reference, prepareResult.topic, config);
  bumpRevisionHistoryForTargets({
    revisionTargets: prepareResult.revisionTargets,
    topics,
    config,
    currentDay: prepareResult.day
  });

  updateCounterForSuccess(prepareResult.day, prepareResult.today);

  const siteHref = config.siteUrl
    ? `${config.siteUrl.replace(/\/$/, "")}/site/days/${prepareResult.topic.slug}.html`
    : `./site/days/${prepareResult.topic.slug}.html`;

  writeText(
    path.join(ROOT_DIR, "index.html"),
    renderHomePage({
      config,
      topic: prepareResult.topic,
      today: prepareResult.today,
      currentDay: prepareResult.day,
      readHref: `./site/days/${prepareResult.topic.slug}.html`
    })
  );

  const email = await sendEmail({
    config,
    topic: prepareResult.topic,
    day: prepareResult.day,
    today: prepareResult.today,
    pdfPath: prepareResult.pdfPath,
    siteHref
  });

  const git = commitAndPush({
    config,
    day: prepareResult.day,
    topic: prepareResult.topic
  });

  const result: FinalizeResult = {
    markdownPath: prepareResult.markdownPath,
    htmlPath: prepareResult.htmlPath,
    pdfPath: prepareResult.pdfPath,
    sitePath: prepareResult.sitePath,
    homepagePath: path.join(ROOT_DIR, "index.html"),
    referencePath,
    email,
    git
  };

  console.log(JSON.stringify(result, null, 2));
}

async function main(): Promise<void> {
  const [command, ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);

  switch (command) {
    case "prepare":
      await runPrepare();
      return;
    case "render-home":
      await runRenderHome();
      return;
    case "finalize": {
      const markdownPath = args.markdown;
      if (typeof markdownPath !== "string") {
        throw new Error("Missing required --markdown argument.");
      }
      await runFinalize(markdownPath);
      return;
    }
    default:
      throw new Error(
        `Unknown command "${quoteHtml(command ?? "")}". Use prepare, render-home, or finalize.`
      );
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
