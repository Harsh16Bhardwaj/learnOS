import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

export const ROOT_DIR = process.cwd();
export const OUTPUT_MARKDOWN_DIR = path.join(ROOT_DIR, "outputs", "markdown");
export const OUTPUT_HTML_DIR = path.join(ROOT_DIR, "outputs", "html");
export const OUTPUT_PDF_DIR = path.join(ROOT_DIR, "outputs", "pdf");
export const OUTPUT_REFERENCE_DIR = path.join(ROOT_DIR, "outputs", "reference");
export const SITE_DIR = path.join(ROOT_DIR, "site");
export const SITE_DAYS_DIR = path.join(SITE_DIR, "days");

export function ensureDir(target: string): void {
  fs.mkdirSync(target, { recursive: true });
}

export function readText(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

export function writeText(filePath: string, value: string): void {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, value, "utf8");
}

export function readJson<T>(filePath: string): T {
  return JSON.parse(readText(filePath)) as T;
}

export function writeJson(filePath: string, value: unknown): void {
  writeText(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function formatDay(day: number): string {
  return String(day).padStart(2, "0");
}

export function isoToday(timeZone: string): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return formatter.format(new Date());
}

export function parseArgs(argv: string[]): Record<string, string | boolean> {
  const args: Record<string, string | boolean> = {};
  for (let index = 0; index < argv.length; index += 1) {
    const entry = argv[index];
    if (!entry.startsWith("--")) {
      continue;
    }
    const key = entry.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }
    args[key] = next;
    index += 1;
  }
  return args;
}

export function quoteHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function runGit(args: string[]): string {
  return execFileSync("git", args, {
    cwd: ROOT_DIR,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
}
