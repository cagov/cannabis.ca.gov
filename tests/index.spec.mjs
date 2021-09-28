import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y, getViolations, reportViolations } from 'axe-playwright'
/*
The playwright codegen mode is good. Give it a try by running this command supplying your target url as the final argument

npx playwright codegen http://localhost:8000

Then clicking around and doing what you want your tests to cover. Playwright will generate useful test code and you may only need to modify selectors to make them less brittle
*/

let testLocation = 'http://localhost:8000/'

test('about page tests', async ({ page }) => {

  // Go to http://localhost:8000/
  await page.goto(testLocation);
  // Click text=About us
  await page.click('text=About us');
  // Click text=About DCC
  await page.click('text=About DCC');
  expect(page.url()).toBe(testLocation+'about-us/about-dcc/');

  const title = page.locator('h1  >> nth=0');
  await expect(title).toContainText('About');
  await injectAxe(page)
  await checkA11y(page)

  // retrieve GA window object
  const dataLayerOnLoad = await page.evaluate(() => {
    return window.dataLayer;
  });

  // Click first content navigation link
  await page.click('cagov-content-navigation a');

  // the content navigation link should have added an event to GA dataLayer
  const dataLayerAfterAnchorClick = await page.evaluate(() => {
    return window.dataLayer;
  });
  expect(dataLayerOnLoad.length).toBe(dataLayerAfterAnchorClick.length - 1);

  // verify page feedback form is in initial state with textarea hidden
  const inVisibleFeedback = await page.locator('cagov-feedback .feedback-form-add');
  expect(inVisibleFeedback).toBeHidden();

  // Click the yes page was helpful response button in page feedback at the bottom of the page
  await page.click('cagov-feedback .js-feedback-yes');

  // verify feedback area is now visible
  const visibleFeedback = await page.isVisible('cagov-feedback .feedback-form-add');
  expect(visibleFeedback).toBeTruthy();
});