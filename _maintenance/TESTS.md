
## Tests

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

## npm scripts

The scripts in the package.json are arranged alphabetically. 

They are mostly related to running a local version of the cannabis site.

The command to start your own dev server which you would run right after ```npm install``` is:

```
npm run dev
```

This dev command will trigger CSS and JS bundling, watch processes for files and the 11ty build, then serve the site until the process is terminated.

Many tasks the build server performs can be triggered individually if desired but that probably isn't necessary in normal development workflow:

- Run the js and css builds followed by 11ty:
```
  "build": "npm-run-all -s js:bundle sass:build build:regen",
```

- Run the 11ty build, without too much console noise, do not start server:
```
  "build:regen": "npx @11ty/eleventy --quiet",
```

- Run the 11ty build and serve content until process is terminated:
```
  "start": "npx @11ty/eleventy --quiet --serve",
```

- Build, JS and CSS, watch for changes:
```
  "js:watch": "chokidar 'src/**/*.js' -c 'npm run js:bundle && npm run build:regen'",
  "js:bundle": "rollup --config rollup.config.js",
  "sass:compile": "sass src/css/sass/:dist/",
  "sass:build": "npm run sass:compile",
  "sass:watch": "chokidar 'src/**/*.scss' -c 'npm run sass:build && npm run build:regen'",
```

Several script commands are used to control our end to end testing tools

- End to end tests with playwright:
```
  "test": "npx playwright test",
  "test:headed": "npx playwright test --headed",
  "test:setup": "npx playwright install-deps chromium && npx playwright install",
```

- Start a plain server that serves already generated HTML files form the directory 11ty builds to:
```
  "test:server": "npx web-dev-server --root-dir docs/",
```

There is one command that will be run only during deployment to an AWS environment by our github actions. This will create all the desired redirects in our bucket based on the file managed in and exported from WordPress:

    "deploy:redirects": "node src/redirects/assign.js",

There are a couple scripts in here which generate client side bundles of specific design system components that are currently called from inside WordPress Gutenberg blocks with script tags using version specific urls.

    "wordpress-bundle:all": "rollup --config src/js/wordpress/rollup.config.js",
    "wordpress-bundle:accordion": "rollup --config src/js/wordpress/rollup.accordion.config.js",
    "wordpress-bundle": "npm run wordpress-bundle:accordion && npm run wordpress-bundle:all"