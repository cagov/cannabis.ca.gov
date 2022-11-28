import { test, expect } from "@playwright/test";
import { findAll } from "domutils";
import { readFile } from "fs/promises";
try {
  const redirects = JSON.parse(
    await readFile("./pages/_content/redirects/redirects.json")
  );

  const redirectData = redirects.redirects;

  class Entry {
    constructor(slug) {
      this.page = `${slug}/`;
    }
  }

  test.describe.serial("redirectPathChecks", () => {
   redirectData.map((redirect) => {
      let requestPath = "https://cannabis.ca.gov" + redirect.url;
      let requestTarget = "https://cannabis.ca.gov" + redirect.action_data.url;
      test("Check redirect for: " + requestPath + " " + redirect.id, async ({ page }) => {
        const entry = new Entry(requestPath);
        await page.goto(requestPath);
        expect(page.url()).toBe(requestTarget);
      });
    });
  });
} catch (error) {
  console.error(error);
}
