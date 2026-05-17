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
    await page.waitForTimeout(1500);
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

