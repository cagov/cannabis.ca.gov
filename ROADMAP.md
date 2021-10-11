# 10-11-2021
* - [ ] Set up clean repo structure
* - [ ] Deep cleanup refactor. Add @DOCS, @TODO, @ISSUE tags
* - [ ] Check moved sitemap
* - [ ] Add unit test for content functions using Playwright + Mocha unit tests (should works with CI)
* - [ ] Fix post events (launch on drought.ca.gov first)
* - [ ] Fix page events (launch on drought.ca.gov first)
* - [ ] Set up events (launch on drought.ca.gov first)
* - [ ] User and check GA config settings in config file.
* - [ ] Schedule README writing sessions.
* - [ ] All the components currently in `src/components` need to be refined and promoted back to the cagov/design-system repo. Then we can delete these folders from this repository. The npm packages can then be installed to provide the features.
* - [ ] The build system dependencies should also be externalized so 11ty and all its dependencies can be accessed via npx locally and in github action steps for builds in our pipelines. Planning to port this clean up to a boilerplate site that this repo can refer to for system changes.

## 1.0.1
1.0.0 is a feature identical release, but big code updates across multiple platforms.

## Docs needs
- `.eleventy.js`
- `rollup.config.js`
- `_data/content.js`

## Questions
* Update `src/redirects/wordpress-export-redirects.json` Is this written to from wordpress-to-github?