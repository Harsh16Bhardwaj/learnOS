import "dotenv/config";
import path from "node:path";
import { sendEmail } from "../src/sendEmail.js";
import { readConfig, readCounter } from "../src/selectTopic.js";
import { parseSyllabus } from "../src/parseSyllabus.js";

async function main(): Promise<void> {
  const config = readConfig();
  const counter = readCounter();
  const topics = parseSyllabus();

  const latestDay = counter.completedDays[counter.completedDays.length - 1];
  if (!latestDay) {
    throw new Error("No completed day found in counter.");
  }

  const topic = topics.find((item) => item.day === latestDay);
  if (!topic) {
    throw new Error(`No topic found for day ${latestDay}.`);
  }

  const pdfPath = path.resolve(`outputs/pdf/${topic.slug}.pdf`);
  const siteHref = config.siteUrl
    ? `${config.siteUrl.replace(/\/$/, "")}/site/days/${topic.slug}.html`
    : `./site/days/${topic.slug}.html`;

  const result = await sendEmail({
    config,
    topic,
    day: latestDay,
    today: counter.lastGeneratedDate ?? new Date().toISOString().slice(0, 10),
    pdfPath,
    siteHref
  });

  console.log(JSON.stringify({ day: latestDay, topic: topic.title, email: result }, null, 2));
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
