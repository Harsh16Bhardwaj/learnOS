import nodemailer from "nodemailer";
import { AppConfig, Topic } from "./types.js";
import { formatDay } from "./utils.js";

export async function sendEmail(args: {
  config: AppConfig;
  topic: Topic;
  day: number;
  today: string;
  pdfPath: string;
  siteHref: string;
}): Promise<{ attempted: boolean; delivered: boolean; message: string }> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const secure = process.env.SMTP_SECURE;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;

  if (!host || !port || !user || !pass || !from) {
    return {
      attempted: false,
      delivered: false,
      message: "SMTP credentials are not configured. Email delivery skipped."
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: secure === "true",
    auth: { user, pass }
  });

  const subject = args.config.mail.subjectTemplate
    .replace("{{day}}", formatDay(args.day))
    .replace("{{topic}}", args.topic.title);

  const html = `<div style="font-family:Segoe UI,Helvetica Neue,sans-serif;line-height:1.7;color:#111827">
    <p>Today's OS topic: <strong>${args.topic.title}</strong></p>
    <p>Attached is your 40-minute deep-dive PDF.</p>
    <ul>
      <li>Core theory</li>
      <li>Practical system relevance</li>
      <li>Diagrams</li>
      <li>Interview questions</li>
      <li>Follow-ups</li>
      <li>Trick questions</li>
      <li>5-minute revision column</li>
    </ul>
    <p>Suggested use:</p>
    <ol>
      <li>Read the main article once.</li>
      <li>Revise the final summary at night.</li>
      <li>Try answering the interview questions out loud.</li>
    </ol>
    <p>Fallback page: ${args.siteHref}</p>
    <p>Generated on ${args.today}.</p>
  </div>`;

  try {
    await transporter.sendMail({
      from,
      to: args.config.learnerEmail,
      subject,
      html,
      attachments: [
        {
          filename: `day-${formatDay(args.day)}-${args.topic.title}.pdf`.replace(/\s+/g, "-"),
          path: args.pdfPath
        }
      ]
    });

    return {
      attempted: true,
      delivered: true,
      message: "SMTP delivery succeeded."
    };
  } catch (error) {
    return {
      attempted: true,
      delivered: false,
      message: error instanceof Error ? error.message : "SMTP delivery failed."
    };
  }
}

