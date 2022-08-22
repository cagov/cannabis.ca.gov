# Maintenance

Interactive production environment: 
* CDT’s CAWeb Publishing Flywheel hosting environment, the interactive is uploaded through CAWeb theme (current version 1.6.2, WP 5.9). 

Assets uploaded to WordPress include:

- [cannabis-local-ordinances.css](./../../_monolith/css/cannabis-local-ordinances.css) file - a manually compiled file.
    - Tracker box CSS
    - IE overrides
- A named and numbered JavaScript bundle of all of the interactive and supporting web components. 
    - Number should match settings in `package.json`.
- SVG and CSV files uploaded through WordPress media interface. 
    * The ca-design-system-gutenberg-blocks plugin includes [code](https://github.com/cagov/ca-design-system-gutenberg-blocks/blob/main/includes/publishing/headless_mime_types.php) that allows editors authorized to upload files to upload SVG, CSV and JSON files.
    - If Excel (.xls) files are needed this support will need to be enabled and updated in the plugin with a hotfix.
        - We are moving to a new arrangement of WordPress plugins. Going forward, all changes to Flywheel should happen in [cagov/cannabis-ca-gov-wordpress-flywheel-plugin](https://github.com/cagov/cannabis-ca-gov-wordpress-flywheel-plugin)
        - To update: do updates and test on Pantheon
        - When complete, bundle as a release to [cagov/cannabis-ca-gov-wordpress-flywheel-plugin](https://github.com/cagov/cannabis-ca-gov-wordpress-flywheel-plugin)
        - Contact CAWeb Publishing to update via FTP.
        - After this, CAWeb Publishing team can update via WP Plugin's Github [update scripts](https://github.com/cagov/cannabis-ca-gov-wordpress-flywheel-plugin/blob/main/core/class-ca-design-system-gutenberg-blocks-plugin-update.php) interface. If this fails, request FTP update.

## Building a bundle

- Check out [`@cagov/cannabis.ca.gov`](https://github.com/cagov/cannabis.ca.gov) repo
- Run `npm install`; node version v14.17.0.
- Go to the [root](https://github.com/cagov/cannabis.ca.gov/tree/main/src/js/charts/cannabis-local-ordinances) of the data viz project:
    `cd src/js/charts/cannabis-local-ordinances`
- Update `package.json`, bump version number and update the bundle number in `scripts` > `build:bundle`
    - Make sure you run `npm install` at root and also at root of `src/js/combobox-places` -
        - please run `npm run build:all` from combobox-places.
    - run `npm run build:bundle`
    - This will run a build and then add the file into `static/assets`.
    - Please keep changes neatly versioned.
- For CSS changes
    - Make changes in `_monolith/cannabis-local-ordinances.css`
- **Manually test** the changes in the WordPress staging environment on Pantheon
    - Log in to: api.cannabis.ca.gov
        - Request access from [Office of Digital Innovation](https://digital.ca.gob) Engineering team.
    - Upload files in theme settings at [https://api.cannabis.ca.gov/wp-admin/admin.php?page=caweb_options](https://api.cannabis.ca.gov/wp-admin/admin.php?page=caweb_options) under JS and CSS (as needed).    
    - Ensure that the theme version enabled matches production (currently CAWeb 1.6.2, [cannabis.ca.gov](http://cannabis.ca.gov) website. Contact CAWeb publishing if you have any questions.
    - Note that the Divi dependency was patched and disconnected for [Pantheon staging environment](https://github.com/cagov/pantheon-mirror-cannabis-ca-gov/pull/new/caweb_publishing_clone). 
        - Files in this clone need to be publishing to `master` branch and pushed into Pantheon git environment in order to actually deploy code to server. 
    - Ensure that the Gutenberg blocks & other ODI or Design System publishing features are set to whatever code matches the production environment.
        - Currently ca-design-system-gutenberg-blocks 1.1.6 ([latest release](https://github.com/cagov/ca-design-system-gutenberg-blocks/releases))
        - Please note that we are actively working on the next generation of WordPress plugins for the Design System, but testing on environment that closely matches production will give the best results with the most error detection in WordPress’s constantly changing code ecosystem.
    - Ensure that the markup on the test page matches the expectations of the web component. 
        - These markup changes will need to be manually introduced on production at the same time as the bundle is updated.
    - Since we are developing web components, that may share the same name, new versions of the component may require alternate methods.
        - For this project, swapping out the bundle for the web component will work.
        - If more complex needs (or development)
            - consider versioning the web components
            - consider using plugin cannabis-ca-gov-wordpress
                - this code will need to be updated in pantheon
                - the plugin will need to be enabled
        - 
    - Note: the self-service CAWeb uploader will make the file available to any page.
        - If page specific JavaScript is required, an alternative method is to *use a plugin*.
            - See ___ as an example.
            - This method requires direct updates from CAWeb publishing and is not self-service.
    - Important: Be sure that your introduction of JavaScript directly onto the production site does not break the rest of the site.

