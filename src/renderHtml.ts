import MarkdownIt from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";
import { AppConfig, RevisionTarget, Topic } from "./types.js";
import { formatDay, quoteHtml } from "./utils.js";

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true
});

const defaultFence = markdown.renderer.rules.fence?.bind(markdown.renderer.rules);

markdown.renderer.rules.fence = (
  tokens: Token[],
  index: number,
  options: unknown,
  env: unknown,
  self: unknown
) => {
  const token = tokens[index];
  const info = token.info.trim();
  if (info === "mermaid") {
    return `<div class="diagram-card"><div class="mermaid">${quoteHtml(token.content)}</div></div>`;
  }
  return (
    defaultFence?.(tokens, index, options as never, env as never, self as never) ??
    `<pre><code>${quoteHtml(token.content)}</code></pre>`
  );
};

markdown.renderer.rules.table_open = () => '<div class="table-wrap"><table>';
markdown.renderer.rules.table_close = () => "</table></div>";

export function renderArticleHtml(args: {
  config: AppConfig;
  topic: Topic;
  markdownSource: string;
  day: number;
  today: string;
  revisionTargets: RevisionTarget[];
}): string {
  let articleHtml = markdown.render(args.markdownSource);
  articleHtml = articleHtml.replace(/^<h1[^>]*>[\s\S]*?<\/h1>\s*/i, "");

  const revisionSummary =
    args.revisionTargets.length === 0
      ? "<span>Fresh track start. No older revision items yet.</span>"
      : args.revisionTargets
          .map(
            (target) =>
              `<span>Day ${formatDay(target.day)} - ${quoteHtml(target.title)} - ${target.revisionLevel} - ${quoteHtml(target.reason)}</span>`
          )
          .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Day ${formatDay(args.day)} - ${quoteHtml(args.topic.title)}</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #070707;
        --surface: #101010;
        --surface-soft: #151515;
        --border: #262626;
        --text: #d8d8d8;
        --muted: #8f8f8f;
        --faint: #5f5f5f;
        --cyan: #67e8f9;
        --amber: #f4c95d;
        --violet: #b79cff;
        --green: #8ee6a3;
      }

      @page {
        size: A4;
        margin: 18mm 17mm 20mm 17mm;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family: "JetBrains Mono", "IBM Plex Mono", "Roboto Mono", monospace;
        font-size: 9.8px;
        line-height: 1.62;
      }

      .page {
        width: min(980px, calc(100vw - 24px));
        margin: 0 auto;
        padding: 12px 0 20px;
      }

      .hero {
        margin-bottom: 14px;
        border-bottom: 1px solid var(--border);
        padding-bottom: 12px;
      }

      .eyebrow {
        margin: 0 0 8px;
        font-size: 8px;
        text-transform: uppercase;
        letter-spacing: 0.16em;
        color: var(--faint);
      }

      h1 {
        margin: 0;
        font-size: 24px;
        line-height: 1.18;
        letter-spacing: -0.04em;
        color: #f2f2f2;
        break-after: avoid;
      }

      .meta-line {
        margin-top: 8px;
        font-size: 8.8px;
        color: var(--muted);
      }

      .subtitle {
        max-width: 760px;
        margin: 8px 0 0;
        color: var(--muted);
        line-height: 1.55;
      }

      .revision-strip {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .revision-strip span {
        display: inline-flex;
        padding: 4px 8px;
        border-radius: 999px;
        background: rgba(142, 230, 163, 0.08);
        border: 1px solid rgba(142, 230, 163, 0.22);
        color: var(--green);
        font-size: 8px;
      }

      .article h2,
      .article h3,
      .article h4 {
        line-height: 1.3;
        break-after: avoid;
      }

      .article h2 {
        margin-top: 24px;
        margin-bottom: 8px;
        border-bottom: 1px solid var(--border);
        padding-bottom: 5px;
        font-size: 15px;
        color: #f2f2f2;
      }

      .section-opener {
        margin-top: 30px;
        margin-bottom: 14px;
        padding: 12px 14px;
        background: var(--surface);
        border-left: 3px solid var(--cyan);
        border-radius: 8px;
        break-inside: avoid;
      }

      .section-kicker {
        font-size: 8px;
        color: var(--cyan);
        letter-spacing: 0.16em;
        text-transform: uppercase;
        margin-bottom: 5px;
      }

      .section-summary {
        font-size: 9.2px;
        color: #9ca3af;
        line-height: 1.55;
      }

      .article h3 {
        margin-top: 16px;
        margin-bottom: 6px;
        font-size: 12px;
        color: var(--cyan);
      }

      .article p,
      .article li {
        color: var(--text);
      }

      p {
        orphans: 3;
        widows: 3;
      }

      .article ul,
      .article ol {
        padding-left: 1.15rem;
      }

      .article blockquote {
        margin: 12px 0;
        padding: 10px 12px;
        border-left: 3px solid var(--amber);
        background: rgba(244, 201, 93, 0.06);
        border-radius: 8px;
        color: #ddd4bd;
        break-inside: avoid;
      }

      .article pre,
      .article code {
        font-family: "JetBrains Mono", "IBM Plex Mono", monospace;
      }

      .article pre {
        background: #030303;
        border: 1px solid #242424;
        border-radius: 8px;
        padding: 12px;
        font-size: 8.8px;
        line-height: 1.55;
        overflow-wrap: break-word;
        white-space: pre-wrap;
        break-inside: avoid;
      }

      .article code {
        color: var(--cyan);
        background: transparent;
        padding: 0;
      }

      .diagram-card {
        margin: 14px 0;
        padding: 14px;
        background: var(--surface);
        border-radius: 10px;
        border: 1px solid var(--border);
        overflow-x: auto;
        break-inside: avoid;
      }

      .mermaid {
        display: flex;
        justify-content: center;
      }

      .table-wrap {
        overflow-x: auto;
        margin: 14px 0;
        break-inside: avoid;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 8.8px;
      }

      th,
      td {
        padding: 7px;
        border-bottom: 1px solid #202020;
        text-align: left;
      }

      th {
        color: var(--cyan);
        font-weight: 600;
        border-bottom: 1px solid #333;
      }

      td {
        color: #cfcfcf;
      }

      a {
        color: var(--cyan);
      }

      .definition-block,
      .revision-block,
      .takeaway-block {
        background: var(--surface);
        border-radius: 8px;
        padding: 12px 14px;
        margin: 12px 0;
        break-inside: avoid;
      }

      .definition-block {
        border-left: 3px solid var(--violet);
      }

      .revision-block {
        background: rgba(142, 230, 163, 0.06);
        border: 1px solid rgba(142, 230, 163, 0.22);
      }

      .takeaway-block {
        border-left: 3px solid var(--green);
      }

      .trap-item {
        background: rgba(244, 201, 93, 0.06);
        border-left: 3px solid var(--amber);
        border-radius: 8px;
        padding: 10px 13px;
        margin: 8px 0;
        break-inside: avoid;
      }
    </style>
  </head>
  <body>
    <main class="page">
      <section class="hero">
        <p class="eyebrow">${quoteHtml(args.config.site.title)} / DAY ${formatDay(args.day)}</p>
        <h1>${quoteHtml(args.topic.title)}</h1>
        <p class="meta-line">40 min read - 5 min revision - ${quoteHtml(args.topic.difficulty)} - Prerequisites: ${quoteHtml(args.topic.prerequisites)}</p>
        <p class="subtitle">${quoteHtml(args.topic.interviewWhy)}</p>
        <div class="revision-strip">${revisionSummary}</div>
      </section>
      <article class="article">${articleHtml}</article>
    </main>
    <script>
      (() => {
        const article = document.querySelector(".article");
        if (!article) return;
        const chapterMap = {
          "Opening Intuition": ["01", "Opening Intuition", "Why this concept exists in real systems before formal definition."],
          "Interview Definition": ["02", "Interview Definition", "A clean interview-ready explanation with precise language."],
          "Mental Model": ["03", "Mental Model", "A compact analogy that maps theory to practical recall."],
          "Layer 1: What happens at a high level?": ["04", "Core Theory", "What the OS manages and how abstraction/resource management fit together."],
          "Layer 2: What happens inside the OS?": ["05", "System Internals", "Kernel boundaries, data structures, and service flow inside the OS."],
          "Step-by-Step Flow": ["06", "Step-by-Step Flow", "Concrete execution sequence you can narrate in interviews."],
          "Practical System Relevance": ["07", "Practical Examples", "How the concept appears in Linux, Windows, Android, servers, and cloud."],
          "Common Misconceptions": ["08", "Common Misconceptions", "High-frequency mistakes and what to say instead."],
          "Tricky Interview Corners": ["09", "Tricky Interview Corners", "Edge cases and deeper follow-up traps interviewers probe."],
          "Interview Questions": ["10", "Interview Questions", "Layered practice questions from basic to advanced."],
          "5-Minute Revision Column": ["11", "5-Minute Revision Column", "Compressed spaced-repetition recall from prior targets."],
          "Final Takeaway": ["12", "Final Takeaway", "The final memory model and what you should be able to answer now."]
        };

        const wrapAfterHeading = (title, className) => {
          const heading = Array.from(article.querySelectorAll("h2")).find((el) => el.textContent?.trim() === title);
          if (!heading) return;
          const wrap = document.createElement("div");
          wrap.className = className;
          let node = heading.nextElementSibling;
          while (node && node.tagName !== "H2") {
            const next = node.nextElementSibling;
            wrap.appendChild(node);
            node = next;
          }
          heading.insertAdjacentElement("afterend", wrap);
        };

        wrapAfterHeading("Interview Definition", "definition-block");
        wrapAfterHeading("5-Minute Revision Column", "revision-block");
        wrapAfterHeading("Final Takeaway", "takeaway-block");
        wrapAfterHeading("What You Should Be Able To Answer Now", "takeaway-block");

        article.querySelectorAll("h2").forEach((heading) => {
          const text = heading.textContent?.trim() ?? "";
          const chapter = chapterMap[text];
          if (!chapter) return;
          const opener = document.createElement("div");
          opener.className = "section-opener";
          opener.innerHTML = "<div class=\\"section-kicker\\">SECTION " + chapter[0] + " / " + chapter[1].toUpperCase() + "</div><div class=\\"section-summary\\">" + chapter[2] + "</div>";
          heading.insertAdjacentElement("beforebegin", opener);
        });

        const misconceptions = Array.from(article.querySelectorAll("h2")).find(
          (el) => el.textContent?.trim() === "Common Misconceptions"
        );
        if (misconceptions) {
          let node = misconceptions.nextElementSibling;
          while (node && node.tagName !== "H2") {
            if (node.tagName === "OL") {
              node.querySelectorAll("li").forEach((li) => li.classList.add("trap-item"));
            }
            node = node.nextElementSibling;
          }
        }
      })();
    </script>
  </body>
</html>`;
}

export function renderHomePage(args: {
  config: AppConfig;
  topic: Topic | null;
  today: string | null;
  currentDay: number;
  readHref: string;
  lessons: Topic[];
}): string {
  const published = Boolean(args.topic);
  const heading = published ? `Day ${formatDay(args.currentDay)} - ${args.topic?.title}` : "No lesson published yet";
  const copy = published
    ? `The latest lesson is ready in the fallback site. If mail delivery misses, the current reading page stays accessible here without losing the day.`
    : `The automation shell is ready. Once the first daily lesson is generated, this page will point directly to the newest reading page.`;
  const generatedLine = published && args.today ? `Published on ${args.today}` : "Waiting for the first publish cycle";
  const lessonLinks =
    args.lessons.length === 0
      ? `<p class="empty">No lessons have been published yet.</p>`
      : args.lessons
          .map(
            (lesson) => `<a class="lesson-link" href="./site/days/${quoteHtml(lesson.slug)}.html">
              <span class="lesson-day">Day ${formatDay(lesson.day)}</span>
              <span class="lesson-title">${quoteHtml(lesson.title)}</span>
              <span class="lesson-meta">${quoteHtml(lesson.difficulty)}</span>
            </a>`
          )
          .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${quoteHtml(args.config.site.title)}</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #090909;
        --panel: #121212;
        --panel-strong: #171717;
        --border: rgba(229, 231, 235, 0.14);
        --text: #e5edf6;
        --muted: #a3a3a3;
        --accent: #67e8f9;
        --accent-strong: #f4c95d;
        --shadow: 0 20px 60px rgba(0, 0, 0, 0.36);
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Segoe UI", "SF Pro Display", "Helvetica Neue", sans-serif;
        color: var(--text);
        background: linear-gradient(180deg, #101010 0%, #060606 100%);
      }

      .shell {
        width: min(1080px, calc(100vw - 48px));
        margin: 0 auto;
        padding: 64px 0 72px;
      }

      .hero,
      .panel {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 8px;
        box-shadow: var(--shadow);
      }

      .hero { padding: 40px; }
      .eyebrow {
        margin: 0 0 18px;
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.24em;
        font-size: 12px;
      }
      h1 {
        margin: 0;
        font-size: clamp(2.5rem, 7vw, 4.8rem);
        line-height: 0.96;
        font-weight: 650;
      }
      .lede {
        margin: 22px 0 0;
        max-width: 720px;
        color: var(--muted);
        font-size: 1.04rem;
        line-height: 1.8;
      }
      .grid {
        display: grid;
        grid-template-columns: 1.3fr 0.9fr;
        gap: 20px;
        margin-top: 22px;
      }
      .panel { padding: 28px; }
      .label {
        color: var(--muted);
        font-size: 0.82rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .topic {
        margin: 14px 0 8px;
        font-size: 2rem;
      }
      .meta {
        color: var(--muted);
        line-height: 1.8;
      }
      .cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-top: 24px;
        padding: 14px 22px;
        border-radius: 6px;
        color: #031019;
        background: var(--accent);
        text-decoration: none;
        font-weight: 700;
      }
      .mini {
        display: grid;
        gap: 14px;
      }
      .mini-card {
        padding: 18px;
        border-radius: 8px;
        background: var(--panel-strong);
        border: 1px solid rgba(148, 163, 184, 0.1);
      }
      .mini-card strong {
        display: block;
        margin-top: 8px;
        font-size: 1.08rem;
      }
      .archive {
        margin-top: 22px;
      }
      .archive-head {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 12px;
      }
      .archive h2 {
        margin: 0;
        font-size: 1.35rem;
      }
      .count {
        color: var(--muted);
        font-size: 0.92rem;
      }
      .lesson-list {
        display: grid;
        gap: 10px;
      }
      .lesson-link {
        display: grid;
        grid-template-columns: 96px 1fr auto;
        gap: 16px;
        align-items: center;
        padding: 16px 18px;
        border: 1px solid rgba(148, 163, 184, 0.14);
        border-radius: 8px;
        background: var(--panel-strong);
        color: var(--text);
        text-decoration: none;
      }
      .lesson-link:hover {
        border-color: rgba(103, 232, 249, 0.42);
      }
      .lesson-day,
      .lesson-meta {
        color: var(--muted);
        font-size: 0.86rem;
      }
      .lesson-title {
        font-weight: 700;
      }
      .empty {
        margin: 0;
        color: var(--muted);
      }
      @media (max-width: 860px) {
        .shell {
          width: min(100vw - 24px, 1040px);
          padding: 32px 0 48px;
        }
        .hero,
        .panel {
          padding: 24px;
          border-radius: 22px;
        }
        .grid {
          grid-template-columns: 1fr;
        }
        .lesson-link {
          grid-template-columns: 1fr;
          gap: 6px;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <p class="eyebrow">${quoteHtml(args.config.site.title)}</p>
        <h1>Daily OS Prep, kept live.</h1>
        <p class="lede">${quoteHtml(args.config.site.subtitle)}</p>
      </section>
      <section class="grid">
        <article class="panel">
          <div class="label">Current Reading</div>
          <h2 class="topic">${quoteHtml(heading)}</h2>
          <div class="meta">${quoteHtml(copy)}<br />${quoteHtml(generatedLine)}</div>
          <a class="cta" href="${quoteHtml(args.readHref)}">Read</a>
        </article>
        <aside class="panel mini">
          <div class="mini-card">
            <div class="label">Cadence</div>
            <strong>Daily at ${quoteHtml(args.config.scheduleTime)} ${quoteHtml(args.config.timezone)}</strong>
          </div>
          <div class="mini-card">
            <div class="label">Artifacts</div>
            <strong>Markdown, HTML, PDF</strong>
          </div>
          <div class="mini-card">
            <div class="label">Fallback</div>
            <strong>Site stays readable even if SMTP fails</strong>
          </div>
        </aside>
      </section>
      <section class="panel archive">
        <div class="archive-head">
          <h2>Published Lessons</h2>
          <span class="count">${args.lessons.length} / 40 days</span>
        </div>
        <div class="lesson-list">${lessonLinks}</div>
      </section>
    </main>
  </body>
</html>`;
}
