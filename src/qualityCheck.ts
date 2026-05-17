const REQUIRED_SECTIONS = [
  /^#\s+Day\s+\d+/m,
  /^##\s+Interview Definition$/m,
  /^##\s+Mental Model$/m,
  /^##\s+Layer 1: What happens at a high level\?$/m,
  /^##\s+Layer 2: What happens inside the OS\?$/m,
  /^##\s+Step-by-Step Flow$/m,
  /^##\s+Practical System Relevance$/m,
  /^##\s+Common Misconceptions$/m,
  /^##\s+Tricky Interview Corners$/m,
  /^##\s+How to Explain This in an Interview$/m,
  /^##\s+Interview Questions$/m,
  /^##\s+Follow-Up Questions$/m,
  /^##\s+Trick Questions$/m,
  /^##\s+Mini Quiz$/m,
  /^#\s+5-Minute Revision Column$/m,
  /^##\s+Final Takeaway$/m,
  /^##\s+What You Should Be Able To Answer Now$/m
];

export function validateArticle(markdown: string): void {
  const missing = REQUIRED_SECTIONS.filter((pattern) => !pattern.test(markdown));
  const mermaidBlocks = markdown.match(/```mermaid[\s\S]*?```/g) ?? [];

  if (missing.length > 0) {
    throw new Error(`Article failed quality checks. Missing ${missing.length} required section(s).`);
  }

  if (mermaidBlocks.length < 2) {
    throw new Error("Article failed quality checks. At least 2 Mermaid diagrams are required.");
  }
}

