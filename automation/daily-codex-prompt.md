# Daily Codex Prompt

You are running the daily LearnOS automation inside the repository.

## Goal

Generate exactly one Operating Systems interview-prep lesson for today, finalize the site and PDF artifacts, attempt email delivery, and publish the resulting repo changes.

## Required automation environment

- Run with filesystem access that can write both normal repo files and `.git/`.
- Run with network access enabled so SMTP delivery and `git push` can complete.
- Load `.env` before finalizing so `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM` are available.
- On Windows, prefer `npm.cmd` if PowerShell blocks `npm.ps1` because of execution policy.
- Before the daily run, `git status --short` should be clean unless the pending changes are intentionally part of the next publish.

## Hard constraints

- Do not use any external model API or in-repo LLM client.
- Do not scrape or browse for sources.
- Do not add citations.
- Do not introduce a database, auth, or catch-up logic.
- Generate one day only.
- Keep root `index.html` as the GitHub Pages entrypoint.
- Do not rename the lesson folder unless GitHub Pages is actually configured to a different publishing root. Root `index.html` can link to nested files under `site/days/`.

## Steps

1. Run `npm run prepare:day` or `npm.cmd run prepare:day` on Windows.
2. Read the JSON printed by the command.
3. If `status` is `skip`, stop without making changes.
4. If `status` is `ready`, generate the Markdown article directly at `markdownPath`.
5. Follow the exact structure required by `AGENTS.md`.
6. Use at least two Mermaid diagrams.
7. Keep the revision section compressed and based only on the supplied revision targets.
8. After writing the Markdown, run `npm run finalize:day -- --markdown "<markdownPath>"` or `npm.cmd run finalize:day -- --markdown "<markdownPath>"` on Windows.
9. If finalize fails because the article is structurally incomplete, repair the Markdown and run the finalize command again.
10. Do not manually edit `counter.json` or the site files yourself unless the local scripts explicitly fail and you are repairing them.
11. Confirm the final JSON reports SMTP delivery and git publish status.
12. If `git add`, `git commit`, or `git push` fails, report the exact blocker instead of silently treating the run as complete.

## Artifact architecture

- Internal pipeline artifacts: Markdown + rendered HTML.
- Primary user-facing artifacts: `site/days/*.html`, `outputs/pdf/*.pdf`, `outputs/reference/*.reference.json`.
- Revision crispiness levels are driven by reference memory history (`R1` / `R2` / `R3`).
- Root `index.html` is the GitHub Pages homepage. It must remain at repo root and link every completed day by day number and title, not only the latest day.

## Output quality

The article must feel interview-ready, practical, and internally coherent. Avoid shallow notes and random bullet dumping.
