
### https://cannabis.ca.gov WordPress "monolith" support.

#### Some files used only in WordPress
This repo contains files used by the WordPress site like:

- `src/css/colorscheme-cannabisv1.0.8.min.css`
- _monolith/`?`: manual-cawebv1.0.1.css @BUG (is this gone now?)
- The whole `src/js/wordpress` directory for the bundle of components used in WordPress authoring and public site.

### Create a bundle
The following command is used to generate the bundle files used by the production WordPress monolith sites;

```
npm run wordpress-bundle
```

This generates a hashed filename in the `src/js/wordpress/` generated directory.

The npm script in this `package.json` references multiple commands which point to specific rollup config files which reference the modules included.

When content in this repository is modified it gets deployed to [headless.cannabis.ca.gov](https://headless.cannabis.ca.gov),  the new hashed filename can be referenced in the WordPress monolith custom JS textarea that we modify in the theme config in the WordPress admin. Since we are using hashed filenames we can revert easily to the prior filename.
