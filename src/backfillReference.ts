import fs from "node:fs";
import path from "node:path";
import { parseSyllabus } from "./parseSyllabus.js";
import { buildReferenceFromMarkdown, writeReference } from "./referenceMemory.js";
import { readConfig, readCounter } from "./selectTopic.js";
import { ROOT_DIR } from "./utils.js";

function main(): void {
  const topics = parseSyllabus();
  const counter = readCounter();
  const config = readConfig();

  for (const day of counter.completedDays) {
    const topic = topics.find((entry) => entry.day === day);
    if (!topic) {
      continue;
    }
    const markdownPath = path.join(ROOT_DIR, "outputs", "markdown", `${topic.slug}.md`);
    if (!fs.existsSync(markdownPath)) {
      continue;
    }
    const markdownSource = fs.readFileSync(markdownPath, "utf8");
    const reference = buildReferenceFromMarkdown({
      topic,
      day,
      markdownSource
    });
    writeReference(reference, topic, config);
    console.log(`reference backfilled: ${topic.slug}`);
  }
}

main();
