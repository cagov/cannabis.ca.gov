// @ts-check
import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

let testLocation = "http://localhost:8080";

let pageUrls = ["/"];

pageUrls.forEach((pageUrl) => {
  test("a11y page tests " + pageUrl, async ({ page }) => {
    let errorCount = 0;
    // this check gets tripped if there is any js error on the page
    page.on("pageerror", (msg) => {
      errorCount++;
      console.log(msg);
    });

    await page.goto(testLocation + pageUrl);

    await injectAxe(page);

    // @ts-ignore
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });

    await expect(errorCount).toEqual(0);
  });
});
