# cannabis.ca.gov

*This repo is under active development as we create a headless version of the cannabis WordPress site.*

## Project description
(Soon to be) production instance of [cannabis.ca.gov](https://cannabis.ca.gov) for the Department of Cannabis Control. 
* Built to deliver plain-language, performant, accessible information.

## Technical overview of domains and services

## System diagram
<img src="./system-diagram.png" width="100%" alt="Diagram of how the content publishing pipeline connects" />

### 1. Edit
* Content is created and edited in WordPress at api.cannabis.ca.gov

### 2. Sync WordPress REST API to GitHub
* After posts are edited, a syncing service pulls data from WordPress into a static content package, which is loaded into this static site builder.

### 3. Update static site
* Local builds: `npm run dev`
* Production builds: will run GitHub actions workflows, when content is updated, and on pull requests and pushes. 

The `./src/.eleventy.js` script generates a static build of the site which is
All Eleventy configuration settings are located at `./config`. We use multiple branches and production, stating, and other branches, and this configuration file is the source of truth for all settings.

* The content is copied from `node_modules/static-content-cannabis` into `./pages/_content` and used at runtime. 
* The `./pages/_content.11tydata.js` file is where any domains from the edit are replaces and made relative to the static/headless instance.
* CA Design System components are located at `./src/components`, and managed via `package.json`. Any custom components are also located in this folder.

### 4. Publish
The GitHub Actions workflows in @cagov/cannabis.ca.gov will update an AWS S3 bucket, clear the AWS CloudFront cache and update the deployment.
* [`main`](./.github/workflows/eleventy_build_main.yml), [`staging`](./.github/workflows/eleventy_build_staging.yml), [PR Previews](./.github/workflows/eleventy_build_pr.yml)

## Developer notes
* Check out the git repo.
* Make sure `npm` and `node` are installed locally. Current version: Node 16.x, npm 8.5.0.
* `npm install` - install the packages in `package.json` and development dependencies.
* `npm run dev` for local builds.
* `npm build` to generate static repo at `./docs` - you can run `http-server` or `serve` to view this site in a local web server.
* `npm run content:clean` and `npm run content:update` will get the latest content changes and reset content.
* You can work locally with the markup generated from https://api.cannabis.ca.gov editor. Please refer to https://github.com/cagov/static-content-cannabis for publishing system notes if something is wrong.
* [NOT YET RE-RELEASED]: `npm test` - run playwright tests.
* Check the [CHANGELOG](CHANGELOG.md), [ROADMAP](ROADMAP.md) for additional information.

### Updates
* Submit a pull request to the latest release branch: `release/2.x.x` etc.

## Design system components

This project leverages several components that are part of the <a href="https://designsystem.webstandards.ca.gov/">California design system</a>. These components are maintained in the <a href="https://github.com/cagov/design-system">design system repository</a>, published to npm, installed into this project and integrated in to the templates, css and javascript build steps as directed in those project readmes.

Components included are listed as production dependencies in this project's package.json and are all identifiable because they are published under the @cagov/ organization's prefix:

- @cagov/ds-accordion
- @cagov/ds-agency-footer
- @cagov/ds-back-to-top
- @cagov/ds-branding
- @cagov/ds-button-grid
- @cagov/ds-content-navigation
- @cagov/ds-dropdown-menu
- @cagov/ds-feature-card
- @cagov/ds-feedback
- @cagov/ds-link-icon
- @cagov/ds-pagination
- @cagov/ds-regulatory-outline
- @cagov/ds-skip-to-content
- @cagov/ds-statewide-footer
- @cagov/ds-statewide-header
- @cagov/ds-step-list
- @cagov/ds-table


### Design Tokens
Design tokens can be found in `./src/css`. 

---

## Team maintenance notes
Office of Digital Innovation (ODI), is working with the Department of Cannabis Control (DCC), Department of Consumer Affairs (DCA), and the California Department of Technology (CDT) to bring content strategy, user-centered design and performant web publishing on an open-source stack for DCC.

* Project docs: Coda and Google Drive
* Report an issue: https://github.com/cagov/cannabis.ca.gov
* Project board: Internal board is in Coda
* Public board: Would move to the GitHub board relative to this GitHub repository.
* Project maintainer & Lead Engineer: Chach Sikes (she/her) @chachasikes
* Engineering Management Lead: Zakiya Khabir @zakiyarules
* Slack channels: #odi-cannabis (ODI internal team channel), #cagov-cannabis (Multi-partner channel)
* Content guide: In Coda workspace

* (DEPRECATED): https://github.com/orgs/cagov/projects/6. 