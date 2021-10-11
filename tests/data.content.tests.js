// import { test, expect } from '@playwright/test';
// import { injectAxe, checkA11y, getViolations, reportViolations } from 'axe-playwright'


const assert = require('assert');
const { PlaywrightMocha } = require('playwright-mocha/dist/pm');

it('checks the title of the page', async () => {

  const page = PlaywrightMocha.page();

  await page.goto('https://www.headlesstesting.com/');
  const title = await page.title();
  assert.strictEqual(title, 'Headless Testing with Puppeteer and Playwright in the Cloud.');
})

// // var assert = require('assert');

// // Mocha unit test using Playwright.
// // Unit tests of important functions.

// // # Run mocha tests with Playwright
// /*
// @DOCS @TEST 
// We like `npx playwright-mocha` mode because (@DOCS @TODO.)
// // 
// ## Record a test

// Give Playwright a try.

// 1. Run: `npx playwright codegen http://localhost:8000` (supply your target url as the final argument)
// 2. Then, click around. Perform the actions you want your tests to cover. 
// 3. Playwright will generate useful test code.
// 4. You may need to modify selectors to make them less brittle.
// 5. Save to test file: `./tests/{test-name}.spec.mjs`
// */

// let testLocation = 'http://localhost:8000/'

// test('about page tests', async ({ page }) => {

// // Placeholder test, checking builds.
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// // });

// //   // Go to http://localhost:8000/
// //   await page.goto(testLocation);
// //   // Click text=About us
// //   await page.click('text=About us');
// //   // Click text=About DCC
// //   await page.click('text=About DCC');
// //   expect(page.url()).toBe(testLocation+'about-us/about-dcc/');

// //   const title = page.locator('h1  >> nth=0');
// //   await expect(title).toContainText('About');
// //   await injectAxe(page)
// //   await checkA11y(page)

// //   // retrieve GA window object
// //   const dataLayerOnLoad = await page.evaluate(() => {
// //     return window.dataLayer;
// //   });

// //   // Click first content navigation link
// //   await page.click('cagov-content-navigation a');

// //   // the content navigation link should have added an event to GA dataLayer
// //   const dataLayerAfterAnchorClick = await page.evaluate(() => {
// //     return window.dataLayer;
// //   });
// //   expect(dataLayerOnLoad.length).toBe(dataLayerAfterAnchorClick.length - 1);

// //   // verify page feedback form is in initial state with textarea hidden
// //   const inVisibleFeedback = await page.locator('cagov-feedback .feedback-form-add');
// //   expect(inVisibleFeedback).toBeHidden();

// //   // Click the yes page was helpful response button in page feedback at the bottom of the page
// //   await page.click('cagov-feedback .js-feedback-yes');

// //   // verify feedback area is now visible
// //   const visibleFeedback = await page.isVisible('cagov-feedback .feedback-form-add');
// //   expect(visibleFeedback).toBeTruthy();
// });