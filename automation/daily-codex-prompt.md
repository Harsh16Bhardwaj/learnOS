# LearnOS Daily Publish Master Prompt

You are running the daily LearnOS automation inside this repository:

`C:\Users\Harsh Bhardwaj\Documents\Automation Learnings`

Your job is to generate exactly one Operating Systems interview-prep lesson, finalize the web/PDF/reference artifacts, send the learner email, and publish the repository changes.

## Non-Negotiable Outcome

At the end of a successful ready run:

- The daily Markdown lesson exists at the `markdownPath` returned by `prepare:day`.
- The daily HTML page exists under `site/days/`.
- The daily PDF exists under `outputs/pdf/`.
- The daily quick-reference JSON exists under `outputs/reference/`.
- Root `index.html` remains the GitHub Pages entrypoint and links all completed days by day number and title.
- SMTP email delivery has been attempted and the result has been reported.
- Git changes have been committed and pushed.

If any of those fail, report the exact blocker and do not pretend the run is complete.

## Required Runtime Environment

Before starting, assume the automation must have:

- Full filesystem write access to the repository, including `.git/`.
- Network access for SMTP delivery and `git push`.
- `.env` loaded with `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM`.
- Git credentials available for pushing to the configured remote.

On Windows, use `npm.cmd` if `npm` is blocked by PowerShell execution policy.

Recommended commands on Windows:

```powershell
npm.cmd run prepare:day
npm.cmd run finalize:day -- --markdown "<markdownPath>"
```

## Hard Constraints

- Do not use external model APIs or an in-repo LLM client.
- Do not scrape websites.
- Do not add citations.
- Do not add a database, dashboard, authentication, or catch-up mode.
- Generate one day only.
- Keep root `index.html` at repository root for GitHub Pages.
- Keep daily lesson pages under `site/days/` unless GitHub Pages configuration is explicitly changed.
- Do not manually increment `counter.json`; let `finalize:day` do it.
- Do not manually replace the site publish flow unless repairing a script failure.

## Daily Run Steps

1. Read `AGENTS.md` and this file first.
2. Check `git status --short`. If there are unexpected dirty changes, account for them before continuing.
3. Run `npm run prepare:day` or `npm.cmd run prepare:day`.
4. Parse the JSON output.
5. If `status` is `skip`, stop. Do not generate content, send mail, commit, or push.
6. If `status` is `ready`, use the returned `day`, `topic`, `promptGuide`, `revisionTargets`, and artifact paths.
7. Generate the daily Operating Systems lesson directly into the returned `markdownPath`.
8. Follow the exact article structure in `AGENTS.md`.
9. Include at least two Mermaid diagrams.
10. Keep the lesson tight, practical, interview-oriented, and conceptually strong.
11. Build the `# 5-Minute Revision Column` only from the returned `revisionTargets`.
12. Run `npm run finalize:day -- --markdown "<markdownPath>"` or the `npm.cmd` equivalent.
13. If finalize fails because the article is structurally incomplete, repair the Markdown and rerun finalize.
14. After finalize succeeds, inspect the final JSON result and report:
    - `email.attempted`
    - `email.delivered`
    - `email.message`
    - `git.committed`
    - `git.pushed`
    - `git.message`
15. If SMTP fails, keep the site fallback intact and report the mail blocker.
16. If git commit or push fails, report the git blocker and leave the generated artifacts in place.

## Quick Reference JSON Requirement

Each day must produce a compact AI-readable JSON overview under `outputs/reference/`.

The existing finalize script creates this from the Markdown. The daily article should therefore contain clean, extractable material for:

- day
- topic
- difficulty
- core summary
- key definitions
- mental model
- practical examples
- practical uses
- pitfalls
- misconceptions
- tricky questions
- interview-ready answers
- revision history

Write the article with clear section text so this JSON becomes useful for future revision.

## Revision Memory Rules

The revision section must use spaced repetition from prior days.

Use only the `revisionTargets` returned by `prepare:day`. Do not invent extra revision days.

For each revision target:

1. Prefer `outputs/reference/day-XX-*.reference.json` as the source because it is compact and easy to ingest.
2. If the reference JSON is missing or too weak, read `outputs/markdown/day-XX-*.md` for that day.
3. Compress the old topic into short interview-oriented recall notes.
4. Do not repeat the old article.
5. Do not let revision exceed a 5-minute read.

Revision cadence implemented by the automation:

- Every day: Day -1 when available.
- Every day: Day -3 when available.
- Days divisible by 5: include Day -5 when available.
- Days divisible by 12: include Day -12 when available.
- Days divisible by 25: include Day -25 when available.

Example:

```txt
Day 5: revise Day 4, Day 2, Day 0 skipped, so include only valid completed targets.
Day 12: revise Day 11, Day 9, Day 7 if divisible by 5 does not apply, and Day 0 skipped.
Day 25: revise Day 24, Day 22, Day 20, Day 13, Day 0 skipped.
Day 50: revise Day 49, Day 47, Day 45, Day 38, Day 25.
```

When revision would become too long, prioritize:

1. Most recent target.
2. Lowest `timesRevised`.
3. Most interview-heavy topic.
4. Most foundational topic.

## Content Quality Bar

The lesson should feel like a high-quality technical article, not a notes dump.

Optimize for:

- Interview explanations the learner can speak out loud.
- Practical system behavior from Linux, Windows, Android, browsers, servers, databases, cloud, containers, or filesystems where relevant.
- Clear "why this exists" intuition before formal definitions.
- Internal OS and hardware-level explanation when relevant.
- Common misconceptions and tricky edge cases.
- Follow-up questions and trick questions.
- Compact comparison tables.
- Debugging or observation commands where useful.

Keep the content focused. It should be deep enough for interview mastery, but not bloated.

## GitHub Pages Contract

Root `index.html` is the public homepage.

It must:

- Stay at repository root.
- Link to all completed lessons under `./site/days/`.
- Show each lesson by day number and title.
- Continue to work as a simple static GitHub Pages site.

Do not rename folders unless the GitHub Pages publishing source changes.

## Final Response Contract

In the final response, say:

- Whether the day was skipped or generated.
- Which day/topic was generated.
- Whether email was delivered.
- Whether git commit/push succeeded.
- The commit hash if pushed.
- Any exact blocker if something failed.
