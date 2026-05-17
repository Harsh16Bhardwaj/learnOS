import path from "node:path";
import { Topic } from "./types.js";
import { ROOT_DIR, readText, slugify } from "./utils.js";

const DAY_BLOCK_PATTERN =
  /^## Day\s+(\d+)\s+-\s+(.+?)\r?\nDifficulty:\s+(.+?)\r?\nPrerequisites:\s+(.+?)\r?\nInterview Why:\s+(.+?)\r?\nFocus:\s+(.+?)(?=\r?\n## Day|\s*$)/gms;

export function parseSyllabus(): Topic[] {
  const syllabusPath = path.join(ROOT_DIR, "syllabus.md");
  const source = readText(syllabusPath);
  const topics: Topic[] = [];

  for (const match of source.matchAll(DAY_BLOCK_PATTERN)) {
    topics.push({
      day: Number(match[1]),
      title: match[2].trim(),
      difficulty: match[3].trim(),
      prerequisites: match[4].trim(),
      interviewWhy: match[5].trim(),
      focus: match[6]
        .split(";")
        .map((entry) => entry.trim())
        .filter(Boolean),
      slug: `day-${String(match[1]).padStart(2, "0")}-${slugify(match[2])}`
    });
  }

  if (topics.length === 0) {
    throw new Error("No syllabus topics could be parsed from syllabus.md.");
  }

  return topics.sort((left, right) => left.day - right.day);
}

