# CHANGELOG for cannabis.ca.gov

# 2.0.0 - _-__-____
* Move off of hybrid production release.
* Add streamlined content package changes.

# 1.1.3 - 3-29-2022
* Updated Design system components
* Re-sync all content with upstream production content
* Cannabis legal access data visualization
* Clean up

# 1.1.2 - 12-22-2021
* Connect to api.cannabis.ca.gov
* Components synced up with design system
* Cypress removed (we are using playwright now, old docs moved to `_maintenance`

# 1.0.1+ - 10-11-2021
* Set up clean repo structure
* Deep cleanup refactor. Add @DOCS, @TODO, @ISSUE tags
* Check moved sitemap
* Add unit test for content functions using Playwright + Mocha unit tests (should works with CI)
* Fix post events (launch on drought.ca.gov first)
* Fix page events (launch on drought.ca.gov first)
* Set up events (launch on drought.ca.gov first)
* User and check GA config settings in config file.
* Schedule README writing sessions.
* All the components currently in `src/components` need to be refined and promoted back to the cagov/design-system repo. Then we can delete these folders from this repository. The npm packages can then be installed to provide the features.
* The build system dependencies should also be externalized so 11ty and all its dependencies can be accessed via npx locally and in github action steps for builds in our pipelines. Planning to port this clean up to a boilerplate site that this repo can refer to for system changes.

## 1.0.1
1.0.0 is a feature identical release, but big code updates across multiple platforms.

# 1.0.0
From [Office of Digital Innovation](https://digital.ca.gov), October 8, 2021
Board: @DOCS
* Add `translations.json` pulling out hard coded strings so they can be translated. @TRANSLATE
* Add @ISSUE tags on hard coded strings, they need to be connected to the `translations.json` content.
* Add `config.json` and `odi-publishing.json` config files.
* Re-organize static site folder architecture based on clean git repo goals.
* Sync several pipeline and development systems with other systems that we call `odi-publishing`.
* Add @DOCS tags for places that need quick explanations for total clarity.
* Add folder for `patterns` - for posts, events, campaigns and more feature rich interfaces. The patterns will be versioned.
* Add github repo documentation resources in `_docs`.
* Connect Social Media organic graph support.
* Add project maintenance files in, you guessed it, `_maintenance`.
* GitHub project boards.
* `.eleventy.js` build file simplified.
* Support for pre-rendered
* Add "Tech Debt Tuesdays" to give team extra focus time to unblock engineering puzzles that accumulate and slow us down. Seems to have helped.
* Figma files re-organized for distributed collaboration. 
* Preparing to write a lot of docs.

# 1.0.0-rc
From [Office of Digital Innovation](https://digital.ca.gov), October 1, 2021
* Prepare cannabis.ca.gov static generated site ("headless") for initial launch. 
* Data comes from former WordPress monolith site (🏔).
* Github issues: https://github.com/cagov/cannabis.ca.gov
* Add cypress tests
* Start meeting about testing frameworks.
* Create ODI Engineering Codeshare Fridays and start team presentations about testing and publishing systems. 

# 0.0.1
From [Office of Digital Innovation](https://digital.ca.gov) & [CAWeb publishing](https://caweb.cdt.ca.gov/), July 2021 @DOCS
* Launch initial cannabis.ca.gov (🍃) for the [Department of Cannabis Control](https://cannabis.ca.gov) website on [CAWeb](https://caweb.cdt.ca.gov/) publishing [Flywheel](https://getflywheel.com/) instance.
* @DOCS Can we include a reference link here about the project.
* Write a WordPress [plugin](https://github.com/ca-design-system-gutenberg-blocks) to act as a bridge between current monolith sites and a decoupled architecture. (<@DOCS>) 
* ODI uses the built-in WordPress REST API to develop fast loading, light, performant, accessible site. This site is similar in structure to how ODI built the [covid19](https://covid19.ca.gov) (created by the team who developed and maintained this site from March 2020 until the present). 
* This leveraged the work of the Alpha team @DOCS:@abquirarte-(do you have a link?)
