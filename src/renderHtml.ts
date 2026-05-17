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
  const articleHtml = markdown.render(args.markdownSource);
  const revisionSummary =
    args.revisionTargets.length === 0
      ? "<span>Fresh track start. No older revision items yet.</span>"
      : args.revisionTargets
          .map(
            (target) =>
              `<span>Day ${formatDay(target.day)} · ${quoteHtml(target.title)} · ${quoteHtml(target.reason)}</span>`
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
        --bg: #07111d;
        --bg-soft: #0c1829;
        --panel: rgba(11, 22, 37, 0.9);
        --panel-strong: rgba(14, 26, 44, 0.96);
        --border: rgba(148, 163, 184, 0.16);
        --text: #e5edf6;
        --muted: #9fb0c3;
        --accent: #79e4f1;
        --accent-strong: #bcf8ff;
        --shadow: 0 28px 64px rgba(2, 6, 23, 0.5);
      }

      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body {
        margin: 0;
        background:
          radial-gradient(circle at top, rgba(121, 228, 241, 0.12), transparent 30%),
          linear-gradient(180deg, #08111d 0%, #04080f 100%);
        color: var(--text);
        font-family: "Segoe UI", "SF Pro Display", "Helvetica Neue", sans-serif;
      }

      .page {
        width: min(1120px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 28px 0 72px;
      }

      .hero,
      .article {
        border: 1px solid var(--border);
        border-radius: 28px;
        background: var(--panel);
        box-shadow: var(--shadow);
        backdrop-filter: blur(22px);
      }

      .hero {
        padding: 34px;
        margin-bottom: 22px;
      }

      .hero-top {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 24px;
        flex-wrap: wrap;
      }

      .eyebrow {
        margin: 0 0 16px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.22em;
        color: var(--accent);
      }

      h1 {
        margin: 0;
        font-size: clamp(2.1rem, 5vw, 3.8rem);
        line-height: 1;
        font-weight: 650;
      }

      .subtitle {
        max-width: 720px;
        margin: 18px 0 0;
        color: var(--muted);
        line-height: 1.8;
      }

      .meta-grid {
        display: grid;
        gap: 14px;
        min-width: 260px;
      }

      .meta-card {
        padding: 16px 18px;
        background: var(--panel-strong);
        border: 1px solid rgba(148, 163, 184, 0.12);
        border-radius: 18px;
      }

      .meta-card .label {
        display: block;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-size: 0.78rem;
      }

      .meta-card strong {
        display: block;
        margin-top: 8px;
        font-size: 1rem;
      }

      .revision-strip {
        margin-top: 22px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .revision-strip span {
        display: inline-flex;
        padding: 10px 14px;
        border-radius: 999px;
        background: rgba(121, 228, 241, 0.08);
        border: 1px solid rgba(121, 228, 241, 0.2);
        color: var(--accent-strong);
        font-size: 0.92rem;
      }

      .article {
        padding: 30px;
      }

      .article h1,
      .article h2,
      .article h3,
      .article h4 {
        line-height: 1.2;
      }

      .article h2 {
        margin-top: 42px;
        padding-top: 18px;
        border-top: 1px solid rgba(148, 163, 184, 0.12);
        font-size: 1.7rem;
      }

      .article h3 {
        margin-top: 28px;
        font-size: 1.2rem;
      }

      .article p,
      .article li {
        color: var(--text);
        line-height: 1.82;
      }

      .article ul,
      .article ol {
        padding-left: 1.25rem;
      }

      .article blockquote {
        margin: 20px 0;
        padding: 16px 18px;
        border-left: 3px solid var(--accent);
        background: rgba(121, 228, 241, 0.06);
        border-radius: 0 18px 18px 0;
        color: #d8eef6;
      }

      .article pre,
      .article code {
        font-family: "Cascadia Code", "SFMono-Regular", Consolas, monospace;
      }

      .article pre {
        overflow-x: auto;
        padding: 18px;
        border-radius: 18px;
        background: #030811;
        border: 1px solid rgba(148, 163, 184, 0.12);
      }

      .article code {
        padding: 0.15rem 0.35rem;
        border-radius: 8px;
        background: rgba(15, 23, 42, 0.82);
      }

      .diagram-card {
        margin: 22px 0;
        padding: 18px;
        background: rgba(2, 8, 23, 0.7);
        border-radius: 22px;
        border: 1px solid rgba(148, 163, 184, 0.12);
        overflow-x: auto;
      }

      .mermaid {
        display: flex;
        justify-content: center;
      }

      .table-wrap {
        overflow-x: auto;
        margin: 22px 0;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 12px 14px;
        border: 1px solid rgba(148, 163, 184, 0.14);
        text-align: left;
      }

      th {
        background: rgba(121, 228, 241, 0.08);
      }

      a {
        color: var(--accent-strong);
      }

      @media (max-width: 860px) {
        .page {
          width: min(100vw - 18px, 1120px);
        }

        .hero,
        .article {
          padding: 22px;
          border-radius: 22px;
        }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <section class="hero">
        <div class="hero-top">
          <div>
            <p class="eyebrow">${quoteHtml(args.config.site.title)}</p>
            <h1>Day ${formatDay(args.day)} · ${quoteHtml(args.topic.title)}</h1>
            <p class="subtitle">${quoteHtml(args.config.site.subtitle)}</p>
          </div>
          <div class="meta-grid">
            <div class="meta-card">
              <span class="label">Difficulty</span>
              <strong>${quoteHtml(args.topic.difficulty)}</strong>
            </div>
            <div class="meta-card">
              <span class="label">Generated</span>
              <strong>${quoteHtml(args.today)}</strong>
            </div>
            <div class="meta-card">
              <span class="label">Prerequisites</span>
              <strong>${quoteHtml(args.topic.prerequisites)}</strong>
            </div>
          </div>
        </div>
        <div class="revision-strip">${revisionSummary}</div>
      </section>
      <article class="article">${articleHtml}</article>
    </main>
    <script type="module">
      import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
      mermaid.initialize({
        startOnLoad: true,
        theme: "dark",
        securityLevel: "loose",
        themeVariables: {
          background: "#08111f",
          mainBkg: "#0c1829",
          primaryColor: "#102238",
          primaryTextColor: "#e5edf6",
          primaryBorderColor: "#79e4f1",
          lineColor: "#bcf8ff",
          secondaryColor: "#102238",
          tertiaryColor: "#0a1524"
        }
      });
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
}): string {
  const published = Boolean(args.topic);
  const heading = published ? `Day ${formatDay(args.currentDay)} · ${args.topic?.title}` : "No lesson published yet";
  const copy = published
    ? `The latest lesson is ready in the fallback site. If mail delivery misses, the current reading page stays accessible here without losing the day.`
    : `The automation shell is ready. Once the first daily lesson is generated, this page will point directly to the newest reading page.`;
  const generatedLine = published && args.today ? `Published on ${args.today}` : "Waiting for the first publish cycle";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${quoteHtml(args.config.site.title)}</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #08111f;
        --panel: rgba(12, 22, 38, 0.84);
        --panel-strong: rgba(18, 30, 50, 0.96);
        --border: rgba(148, 163, 184, 0.16);
        --text: #e5edf6;
        --muted: #99a8ba;
        --accent: #6ee7f2;
        --accent-strong: #9be7ff;
        --shadow: 0 20px 60px rgba(2, 6, 23, 0.45);
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: "Segoe UI", "SF Pro Display", "Helvetica Neue", sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top, rgba(110, 231, 242, 0.13), transparent 28%),
          linear-gradient(180deg, #09111d 0%, #050a12 100%);
      }

      .shell {
        width: min(1040px, calc(100vw - 48px));
        margin: 0 auto;
        padding: 64px 0 72px;
      }

      .hero,
      .panel {
        background: var(--panel);
        backdrop-filter: blur(22px);
        border: 1px solid var(--border);
        border-radius: 28px;
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
        border-radius: 999px;
        color: #031019;
        background: linear-gradient(135deg, var(--accent), var(--accent-strong));
        text-decoration: none;
        font-weight: 700;
      }
      .mini {
        display: grid;
        gap: 14px;
      }
      .mini-card {
        padding: 18px;
        border-radius: 18px;
        background: var(--panel-strong);
        border: 1px solid rgba(148, 163, 184, 0.1);
      }
      .mini-card strong {
        display: block;
        margin-top: 8px;
        font-size: 1.08rem;
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
    </main>
  </body>
</html>`;
}
