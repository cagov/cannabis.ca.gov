import { test, expect } from "@playwright/test";
import { findAll } from "domutils";

import redirects from "./redirects.js";

class Entry {
  constructor(slug) {
    this.page = `${slug}/`;
  }
}
const redirectData = redirects.data.redirects;
test.describe.serial("redirectPathChecks", () => {
 redirectData.map((redirect) => {    
    let requestPath = "https://cannabis.ca.gov" + redirect.url;
    let requestTarget = "https://cannabis.ca.gov" + redirect.action_data.url;
    test("Check redirect for: " + requestPath, async ({ page }) => {
      const entry = new Entry(requestPath);
      await page.goto(requestPath);
      expect(page.url()).toBe(requestTarget);
    });
  });
});
