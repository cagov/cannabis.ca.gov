# cannabis.ca.gov

*This repo is under active development as we create a headless version of the cannabis WordPress site.*

### Project description
(Soon to be) production instance of [cannabis.ca.gov](https://cannabis.ca.gov) for the Department of Cannabis Control. Built to deliver plain-language, performant, accessible information.

### Technical overview of domains and services
* STATIC SITE: This git repo uses 11ty site page builder to render content. This is being synced with the 11ty-starter-kit project.
* DATA: WordPress content is delivered into `src/templates/wordpress` by a microservice, wordpress-to-github. 
    * This service currently runs on Azure's Function as a Service FaaS) in the [@cagov/services-wordpress-to-github-cannabis-ca-gov](https://github.com/@cagov/services-wordpress-to-github-cannabis-ca-gov) repo.
* UI: California design system components in `src/js` match the components in the WordPress editor.
* EDITOR (CMS): Wordpress editor lives at [https://api.cannabis.ca.gov](https://api.cannabis.ca.gov) which is a custom domain, that points to [https://live-cannabis-ca-gov.pantheonsite.io](https://live-cannabis-ca-gov.pantheonsite.io). This site provides the editor UI using the [California Design System Gutenberg blocks](https://github.com/cagov/ca-design-system-gutenberg-blocks) library and a custom theme. This is migrating from CAWeb publishing Flywheel system to Pantheon, and is an intermediary home for the editor.
    * A mirror of the code editor lives at [https://github.com/cagov/pantheon-mirror-cagov](https://github.com/cagov/pantheon-mirror-cagov).
* BUILDS: Are in `.github/workflows`. These are run by github actions to coordinate how the static site is pushed to Amazon S3 buckets.
* DOMAIN - Managed by Department of Consumer Affairs (DCA), the control agency for the Department of Cannabis Control.
* CONFIG - `odi-publishing` contains configuration files for site settings. We are avoiding hard coding content in the UI because we are making a reusable site template for agencies adopting the design system.
* PAGE FEEDBACK - @DOCS
* Dynamic [ODI PUBLISHING DIAGRAM](https://www.figma.com/file/oxejuAbLaxVW4itp00uv32/ODI-Publishing?node-id=0%3A1) in FigmaJam
* Server architecture
<img src="./ca.gov-web-application-architecture.png" />

## Development notes
* Check out the git repo.
* Make sure `npm` and `node` are installed locally.
* `npm install` - install the packages in `package.json`.
* `npm run dev` for local builds.
* `npm test` - run playwright tests.
* Check the [CHANGELOG](CHANGELOG.md), [ROADMAP](ROADMAP.md), and [_maintenance](_maintenance) folder for additional information.
* [BUILD](BUILD.md) - How the build configuration on this project works.
* [Wiki](https://github.com/cagov/cannabis.ca.gov/wiki) - Slightly out of date old docs.

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

## Project contacts
* Office of Digital Innovation is working with the Department of Cannabis Control and CDT to bring you this site.
* Submit an issue to the github repo or on the page feedback form on the cannabis site if you are experiencing an issue.
* *Slack*: Office of Digital Innovation (ODI) Slack:  `#cagov-cannabis-qa` `#cagov-cannabis-dev`, `#cagov-cannabis`

