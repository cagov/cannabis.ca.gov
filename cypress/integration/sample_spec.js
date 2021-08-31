describe('My First Test', () => {
  it('clicks the link "type"', () => {
    cy.visit('http://localhost:8000/')

    cy.contains('About us').click()
    cy.contains('About DCC').click()

    // h1 is present and contains text About
    cy.get('h1').should('contain.text', 'About');

    // Click first content navigation link
    cy.get('cagov-content-navigation a').first().click();

    // verify page feedback form is in initial state with textarea hidden
    cy.get('cagov-feedback .feedback-form-add').should('not.be.visible')

    // Click the yes page was helpful response button in page feedback at the bottom of the page
    cy.get('cagov-feedback .js-feedback-yes').click();

    // verify feedback area is now visible
   cy.get('cagov-feedback .feedback-form-add').should('be.visible')
  })
})

/*
  // retrieve GA window object
  const dataLayerOnLoad = await page.evaluate(() => {
    return window.dataLayer;
  });


  // the content navigation link should have added an event to GA dataLayer
  const dataLayerAfterAnchorClick = await page.evaluate(() => {
    return window.dataLayer;
  });
  expect(dataLayerOnLoad.length).toBe(dataLayerAfterAnchorClick.length - 1);

*/