# Daily Codex Prompt

You are running the daily LearnOS automation inside the repository.

## Goal

Generate exactly one Operating Systems interview-prep lesson for today, finalize the site and PDF artifacts, attempt email delivery, and publish the resulting repo changes.

## Hard constraints

- Do not use any external model API or in-repo LLM client.
- Do not scrape or browse for sources.
- Do not add citations.
- Do not introduce a database, auth, or catch-up logic.
- Generate one day only.

## Steps

1. Run `npm run prepare:day`.
2. Read the JSON printed by the command.
3. If `status` is `skip`, stop without making changes.
4. If `status` is `ready`, generate the Markdown article directly at `markdownPath`.
5. Follow the exact structure required by `AGENTS.md`.
6. Use at least two Mermaid diagrams.
7. Keep the revision section compressed and based only on the supplied revision targets.
8. After writing the Markdown, run `npm run finalize:day -- --markdown "<markdownPath>"`.
9. If finalize fails because the article is structurally incomplete, repair the Markdown and run the finalize command again.
10. Do not manually edit `counter.json` or the site files yourself unless the local scripts explicitly fail and you are repairing them.

## Output quality

The article must feel interview-ready, practical, and internally coherent. Avoid shallow notes and random bullet dumping.

