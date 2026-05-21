import path from "node:path";
import { chromium } from "playwright";

export async function buildPdf(htmlPath: string, pdfPath: string): Promise<void> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: {
      width: 1440,
      height: 2200
    }
  });

  try {
    await page.goto(`file://${path.resolve(htmlPath)}`, { waitUntil: "networkidle" });
    let mermaidRendered = false;
    try {
      await page.addScriptTag({
        url: "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"
      });
      await page.evaluate(async () => {
      const mermaidApi = (window as unknown as { mermaid?: any }).mermaid;
      if (!mermaidApi) return;
      mermaidApi.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "dark",
        themeVariables: {
          background: "#101010",
          primaryColor: "#151515",
          primaryTextColor: "#d8d8d8",
          primaryBorderColor: "#67e8f9",
          lineColor: "#67e8f9",
          secondaryColor: "#151515",
          tertiaryColor: "#151515"
        }
      });
      await mermaidApi.run({
        querySelector: ".mermaid"
      });
      });
      await page.waitForSelector(".mermaid svg", { timeout: 10000 });
      mermaidRendered = true;
    } catch {
      await page.evaluate(() => {
        document.querySelectorAll<HTMLElement>(".mermaid").forEach((diagram) => {
          diagram.dataset.renderFallback = "true";
        });
      });
    }
    if (mermaidRendered) {
      await page.waitForTimeout(500);
    }
    await page.waitForTimeout(500);
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "16mm",
        right: "12mm",
        bottom: "16mm",
        left: "12mm"
      }
    });
  } finally {
    await browser.close();
  }
}
