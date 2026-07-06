import nodemailer from "nodemailer";
import { AppConfig, Topic } from "./types.js";
import { formatDay } from "./utils.js";

const MAX_EMAIL_ATTEMPTS = 3;
const EMAIL_RETRY_DELAYS_MS = [5000, 15000];

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "SMTP delivery failed.";
}

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
  const recipients = [
    args.config.learnerEmail,
    process.env.MAIL1,
    process.env.MAIL2,
    process.env.MAIL3
  ].filter((value): value is string => Boolean(value && value.trim()));
  const uniqueRecipients = Array.from(new Set(recipients.map((value) => value.trim())));

  if (!host || !port || !user || !pass || !from) {
    return {
      attempted: false,
      delivered: false,
      message: "SMTP credentials are not configured. Email delivery skipped."
    };
  }

  if (uniqueRecipients.length === 0) {
    return {
      attempted: false,
      delivered: false,
      message: "No email recipients are configured."
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

  const mailOptions = {
    from,
    to: uniqueRecipients,
    subject,
    html,
    attachments: [
      {
        filename: `day-${formatDay(args.day)}-${args.topic.title}.pdf`.replace(/\s+/g, "-"),
        path: args.pdfPath
      }
    ]
  };

  let lastError = "SMTP delivery failed.";

  for (let attempt = 1; attempt <= MAX_EMAIL_ATTEMPTS; attempt += 1) {
    try {
      await transporter.sendMail(mailOptions);

      return {
        attempted: true,
        delivered: true,
        message:
          attempt === 1
            ? `SMTP delivery succeeded for ${uniqueRecipients.length} recipient(s).`
            : `SMTP delivery succeeded for ${uniqueRecipients.length} recipient(s) on attempt ${attempt}.`
      };
    } catch (error) {
      lastError = errorMessage(error);
      if (attempt < MAX_EMAIL_ATTEMPTS) {
        await wait(EMAIL_RETRY_DELAYS_MS[attempt - 1] ?? 15000);
      }
    }
  }

  return {
    attempted: true,
    delivered: false,
    message: `SMTP delivery failed after ${MAX_EMAIL_ATTEMPTS} attempts. Last error: ${lastError}`
  };
}
