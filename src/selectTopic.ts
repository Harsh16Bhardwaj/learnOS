import path from "node:path";
import { AppConfig, CounterState, PrepareResult, Topic } from "./types.js";
import {
  OUTPUT_HTML_DIR,
  OUTPUT_MARKDOWN_DIR,
  OUTPUT_PDF_DIR,
  ROOT_DIR,
  SITE_DAYS_DIR,
  formatDay,
  isoToday,
  readJson
} from "./utils.js";
import { computeRevisionTargets } from "./generateRevision.js";

export function readCounter(): CounterState {
  return readJson<CounterState>(path.join(ROOT_DIR, "counter.json"));
}

export function readConfig(): AppConfig {
  return readJson<AppConfig>(path.join(ROOT_DIR, "config.json"));
}

export function prepareDay(topics: Topic[]): PrepareResult {
  const config = readConfig();
  const counter = readCounter();
  const today = isoToday(config.timezone);

  if (counter.lastGeneratedDate === today) {
    const currentTopic =
      topics.find((topic) => topic.day === counter.currentDay) ?? topics[topics.length - 1];
    return {
      status: "skip",
      today,
      day: counter.currentDay,
      topic: currentTopic,
      revisionTargets: [],
      markdownPath: "",
      htmlPath: "",
      pdfPath: "",
      sitePath: "",
      reason: `A lesson has already been generated for ${today}.`
    };
  }

  const topic = topics.find((entry) => entry.day === counter.currentDay);
  if (!topic) {
    throw new Error(`No syllabus entry found for day ${counter.currentDay}.`);
  }

  return {
    status: "ready",
    today,
    day: topic.day,
    topic,
    revisionTargets: computeRevisionTargets(topic.day, counter.completedDays, topics),
    markdownPath: path.join(OUTPUT_MARKDOWN_DIR, `${topic.slug}.md`),
    htmlPath: path.join(OUTPUT_HTML_DIR, `${topic.slug}.html`),
    pdfPath: path.join(OUTPUT_PDF_DIR, `${topic.slug}.pdf`),
    sitePath: path.join(SITE_DAYS_DIR, `${topic.slug}.html`)
  };
}

export function formatPrepareResult(result: PrepareResult): string {
  if (result.status === "skip") {
    return JSON.stringify(result, null, 2);
  }

  return JSON.stringify(
    {
      ...result,
      promptGuide: {
        title: `Day ${formatDay(result.day)} — ${result.topic.title}`,
        difficulty: result.topic.difficulty,
        prerequisites: result.topic.prerequisites,
        interviewWhy: result.topic.interviewWhy,
        focus: result.topic.focus,
        requiredDiagrams: 2
      }
    },
    null,
    2
  );
}

