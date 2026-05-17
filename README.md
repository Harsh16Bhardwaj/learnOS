# LearnOS Codex Automation

This repository is a Codex-native daily Operating Systems interview-prep automation.

## What it does

- Reads `syllabus.md` and `counter.json`
- Uses a Codex automation prompt as the content generator
- Finalizes the generated Markdown into:
  - `outputs/markdown/`
  - `outputs/html/`
  - `outputs/pdf/`
  - `site/days/`
- Updates `site/index.html` so the Read button always points to the latest lesson
- Attempts SMTP delivery
- Advances `counter.json` after content and site artifacts are generated
- Commits and pushes the repo state at the end of the daily run

## Environment

Populate `.env` from `.env.example` if you want SMTP delivery.

Required SMTP variables:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

## Scripts

- `npm run prepare:day`
- `npm run finalize:day -- --markdown <absolute-or-relative-path>`
- `npm run render:home`
- `npm run typecheck`

## Daily automation contract

The Codex automation should:

1. Run `npm run prepare:day`
2. Read the emitted JSON context
3. If the run is not skipped, generate the Markdown lesson into the provided path
4. Run `npm run finalize:day -- --markdown <path>`

The repository code does not call any model API. Codex itself is the content generator.

