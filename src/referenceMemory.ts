import fs from "node:fs";
import path from "node:path";
import { AppConfig, RevisionTarget, Topic } from "./types.js";
import { OUTPUT_REFERENCE_DIR, quoteHtml, readJson, writeJson } from "./utils.js";

export interface DayReference {
  day: number;
  topic: string;
  difficulty: string;
  core_summary: string[];
  key_definitions: Record<string, string>;
  mental_model: string;
  core_examples: Array<{ name: string; point: string }>;
  practical_uses: string[];
  pitfalls: string[];
  misconceptions: string[];
  tricky_questions: Array<{ question: string; answer: string }>;
  interview_ready_answer: {
    short: string;
    medium: string;
  };
  revision_history: {
    times_revised: number;
    last_revised_on_day: number | null;
    revision_strength: "R1" | "R2" | "R3";
  };
}

function getReferenceDir(config: AppConfig): string {
  const custom = config.artifacts?.referenceDir?.trim();
  if (!custom) {
    return OUTPUT_REFERENCE_DIR;
  }
  return path.isAbsolute(custom) ? custom : path.resolve(process.cwd(), custom);
}

export function getReferencePath(topic: Topic, config: AppConfig): string {
  return path.join(getReferenceDir(config), `${topic.slug}.reference.json`);
}

export function toRevisionLevel(timesRevised: number): "R1" | "R2" | "R3" {
  if (timesRevised <= 0) {
    return "R1";
  }
  if (timesRevised === 1) {
    return "R2";
  }
  return "R3";
}

export function readReference(topic: Topic, config: AppConfig): DayReference | null {
  const filePath = getReferencePath(topic, config);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return readJson<DayReference>(filePath);
}

function linesFromSection(markdownSource: string, heading: string): string[] {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdownSource.match(new RegExp(`##\\s+${escaped}\\n([\\s\\S]*?)(\\n##\\s+|\\n#\\s+|$)`, "i"));
  if (!match) {
    return [];
  }
  return match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function toPlain(line: string): string {
  return quoteHtml(
    line
      .replace(/^[-*]\s+/, "")
      .replace(/^\d+\.\s+/, "")
      .replace(/`/g, "")
      .replace(/\*\*/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
}

export function buildReferenceFromMarkdown(args: {
  topic: Topic;
  day: number;
  markdownSource: string;
}): DayReference {
  const core = linesFromSection(args.markdownSource, "Interview Definition")
    .filter((line) => !line.startsWith("```"))
    .slice(0, 4)
    .map(toPlain);
  const definitions = linesFromSection(args.markdownSource, "5-Minute Revision Column")
    .filter((line) => line.toLowerCase().includes("operating system:") || line.toLowerCase().includes("kernel:") || line.toLowerCase().includes("system call:"))
    .slice(0, 3)
    .reduce<Record<string, string>>((acc, line) => {
      const [left, ...rest] = toPlain(line).split(":");
      if (left && rest.length > 0) {
        acc[left.trim()] = rest.join(":").trim();
      }
      return acc;
    }, {});

  const mentalModelLines = linesFromSection(args.markdownSource, "Mental Model").slice(0, 3).map(toPlain);
  const practicalUses = linesFromSection(args.markdownSource, "Practical System Relevance")
    .filter((line) => line.startsWith("-"))
    .map(toPlain)
    .slice(0, 8);
  const misconceptions = linesFromSection(args.markdownSource, "Common Misconceptions")
    .filter((line) => /^\d+\./.test(line))
    .map(toPlain)
    .slice(0, 6);
  const tricky = linesFromSection(args.markdownSource, "Trick Questions")
    .filter((line) => /^\d+\.\s+Q:/.test(line))
    .map((line) => toPlain(line.replace(/^\d+\.\s+Q:\s*/i, "")))
    .slice(0, 5)
    .map((question) => ({ question, answer: "" }));
  const interviewSection = linesFromSection(args.markdownSource, "How to Explain This in an Interview").map(toPlain);

  return {
    day: args.day,
    topic: args.topic.title,
    difficulty: args.topic.difficulty,
    core_summary: core.length > 0 ? core : [args.topic.interviewWhy],
    key_definitions: definitions,
    mental_model: mentalModelLines.join(" "),
    core_examples: [
      {
        name: "Opening an application",
        point:
          "The OS loads executable code, creates a process, assigns memory, schedules CPU time, and services I/O."
      },
      {
        name: "Reading a file",
        point:
          "The app requests bytes while the OS handles permissions, metadata lookup, filesystem mapping, and device access."
      }
    ],
    practical_uses: practicalUses,
    pitfalls: misconceptions.slice(0, 4),
    misconceptions,
    tricky_questions: tricky,
    interview_ready_answer: {
      short: interviewSection[0] ?? "",
      medium: interviewSection[1] ?? ""
    },
    revision_history: {
      times_revised: 0,
      last_revised_on_day: null,
      revision_strength: "R1"
    }
  };
}

export function writeReference(reference: DayReference, topic: Topic, config: AppConfig): string {
  const filePath = getReferencePath(topic, config);
  writeJson(filePath, reference);
  return filePath;
}

export function bumpRevisionHistoryForTargets(args: {
  revisionTargets: RevisionTarget[];
  topics: Topic[];
  config: AppConfig;
  currentDay: number;
}): void {
  for (const target of args.revisionTargets) {
    const topic = args.topics.find((entry) => entry.day === target.day);
    if (!topic) {
      continue;
    }
    const current = readReference(topic, args.config);
    if (!current) {
      continue;
    }
    const nextCount = (current.revision_history?.times_revised ?? 0) + 1;
    current.revision_history = {
      times_revised: nextCount,
      last_revised_on_day: args.currentDay,
      revision_strength: toRevisionLevel(nextCount)
    };
    writeReference(current, topic, args.config);
  }
}
