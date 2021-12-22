## Testing roadmap

We are evaluating the three tools below:

### Mocha unit tests through playwright.
@DOCS @TODO

### Cypress unit tests
* https://dev.to/dgreene1/wow-cypress-can-run-unit-tests-15l5
* https://docs.cypress.io/examples/examples/recipes#Unit-Testing
* @TODO Finish this config: looks promising - https://medium.com/swlh/automated-testing-with-cypress-17bf74bfd97d

### Integration(End to end) tests with playwright

The playwright headless tests are triggered with ```npm test```. These run in the git action e2e.yml. The git action runs setup scripts and starts a web dev server to return files in docs/ after the build runs.

To run playwright tests locally
- ```npm test:playwright``` to run the playwright tests headlessly
or
- ```npm test:playwright:headed``` to run the playwright tests headed so you can see what it is doing. More debugging tips and tools on playwright on the <a href="https://playwright.dev/docs/debug">playwright debugging page</a>
- Before running tests you need to have run a build at least once. The tests are not yet tied to a watch or rebuild process. If you have already done ```npm run dev``` or ```npm run build``` then you will have generated the static site and can run the test command without a server running.
More info on playwright at <a href="https://playwright.dev/">playwright.dev</a>

When writing new playwright tests or to get used to the tool initially try out the codegen tool passing the target url as the final argument:

```
npx playwright codegen https://cannabis.ca.gov
```

Benefits:
- Works nicely in a git action
- Runs reliably
- Helpful debugging tools
- Successfully integrated full page accessibility checks with headless axe package
- The codegen tool is helpful
- Supports 3 browser engines so we can test Chrome, Firefox and Safari

### Integration(End to end) tests with cypress


The cypress headless tests are triggered with ```npm test```. These run in the git action e2e-cypress.yml. The git action runs setup scripts and starts a web dev server to return files in docs/ after the build runs.

To run cypress tests locally
- ```npm test:cypress``` to start a dev server and launch the cypress test runner tool
- Before running tests you need to have run a build at least once. The tests are not yet tied to a watch or rebuild process. If you have already done ```npm run dev``` or ```npm run build``` then you will have generated the static site and can run the test command without a server running.

More info on <a href="https://www.cypress.io/">cypress</a>

Benefits:
- Works nicely in a git action
- Runs reliably
- Helpful debugging tools
- Supports 2 browser engines so we can test Chrome and Firefox
