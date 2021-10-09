# CHANGELOG for cannabis.ca.gov

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
