# README template (DRAFT)

These files serve as guidance for setting up other California State government GitHub repositories.

## 1. Identify the project

### Project name

- [ ] Research the name (CA github repos, web)
- [ ] Is the name specific to the task?
- [ ] Is the name clear to other teams?
- [ ] Get feedback from teammates
- [ ] Use lowercase, dash-separated words without abbreviations
- [ ] Cost & flexibility: While a github project can be renamed, once code goes into production, or teams start to learn names and use the names in work, it becomes VERY DIFFICULT to implement the change, and may have disatrous effects. Taking 5-15 minutes to get a team gut check on a name can save confusion, energy, and also make a better shared project. We are indicating lead engineers, contacts and dependent projects in our Github repo to help with this.

Example: `github-repository-template`

### Project description

- [ ] What is it? (quick description for conversation) 
- [ ] Where does it appear? 
- [ ] What does it do? (purpose, intent, why did we build this) 
- [ ] What does it include? (features, data elements, etc) (Tips, if any)

Example: `These files serve as guidance for setting up California State government GitHub repositories, especially for [@cagov](https://github.com/cagov). We set this up to help our team members get started, and to improve our overall quality of public code. The repo includes starter templates for github repos and github project issue templates.`

## 2. Evaluate the project
- [ ] What does this project do, (or not)? (1-2 sentences)
- [ ] Short background - Why this government repo exists, link to POLICY.md, CHARTER.md or ORIGIN_STORY.md, LAND_ACKNOWLEDGEMENT.md if needed. (1-2 sentences)

Example: `The templates in this repository are based on guidance from Write the Docs, the Office of Digital Innovation ([ODI](https://digital.ca.gov)) engineering team's experience with open source programming and team building, ODI's content teams feedback on content design, and government innovators recommendations on creating public source code. The State of California has [Vision 2023](), which encourages us all to work together, and we are embracing this initiative.`

## 3. Use the project (once)
- [ ] Prerequisites or requirements (Brief)
- [ ] Dependencies, list any data, services, costs or other requirements needed to set this up.
- [ ] Brief installation notes, or link to installation guidance (INSTALLATION.md)
- [ ] If the project is very complex, link to docs or include system notes and overview in ARCHITECTURE.md
- [ ] Determine the correct license (@TODO we need to share how to decide this)

Example: `To create new GitHub repos with @cagov, you need to [@TODO]. To use this repo, simply refer to these templates when developing a new github repository, or clone and copy files into your project and adapt as needed. This information is shared under a [@TODO] license.`

## 4. Engage with the project
- [ ] Is this project still active, or recently updated? Major updates and changes should be summarized in CHANGELOG for versioned releases. 
- [ ] If active, how to get in touch?
- [ ] Is this project production code? If so, who depends on this and who to contact.
- [ ] Does the project have a ROADMAP? (If so, link to ROADMAP.md)
- [ ] Where is the project currently managed? If a community project, include CODE_OF_CONDUCT.md
- [ ] Where does the project live on the web?
- [ ] Who is working on this? Update CONTRIBUTORS.md
- [ ] If it is actively managed as an open source project, update CONTRIBUTING.md

Example: `This project started summer 2021 at the Office of Digital Innovation. Please see the CHANGELOG to track the evolution of the project. You can reach out to us at [@TODO]().If you have a feature or contribution, please submit an issue to this github repository.`


## Tips

### Writing
- Try to collaboratively create the project name, description and README with the whole team and people who are unfamiliar with the project. 
- You can do this in short sessions with 2-4 people at a time. 
- We do this to help build meaningful contextual information so that our Github repositories can be more usable and useful, and to grow over time.
- You do not need to create all of the documentation at once.
- After drafting your content, do a pass to remove, or define, jargon terms and abbreviations.
- Getting the basics right will help our shared public repositories to be understandable. 
- Including *name*, *description*, *project location* are the basics that really help.
- We have included additional templates because some of our projects are more complex and have more of a community impact that develops over time.

### Openness
We default to open for our code projects. This is an opportunity to be clear and comprehensible to the communities connecting with our work.

- [ ] Default to open
- [ ] Use checklist to make sure the repository includes necessary information
- [ ] Use private or internal github for experimental code stashes
- [ ] It is okay to link to URLs to shared documents on Google Docs, logins. Please remember these are public documents, and indicate that the audience of the GitHub is a particular team. Include who to ask for access.
- [ ] Make sure your shared links have the correct permission settings and that you know what the reversion mechanisms are if needed.

### Periodic reviews

- Going over documentation at least every quarter with an eye for changes, ambiguity, shifts will help keep our entire cagov repository up-to-date. Links break, projects shift, clarity is reached. 
- Marking this on the team calendar as a reminder will help. 
- Involving the whole team helps avoid assumptions, jargon, isolation and improves clarity, transparency, coordination.
- We update our systems before new people join us, as well, which gives us an opportunity to improve our systems overall.

### Issues
We have issue templates for your GitHub projects. There are some for basic GitHub tasks (features, tasks, bugs). We are developing a set of templates for proposals, holistic projects, and team review for our [CA Design System](https://github.com/cagov/design-system). As of summer 2021, our team is getting our GitHub issue workflows down and actively developing and iterating on our shared issue templates and GitHub tagging conventions.
