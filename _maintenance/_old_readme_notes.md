

Three branches in this repository deploy to 3 different AWS environments
- The development branch is written to by the development branch of the <a href="https://github.com/cagov/services-wordpress-to-github-cannabis-ca-gov">cannabis publishing service</a> and deploys to development.cannabis.ca.gov which is a CloudFront distribution backed by an S3 bucket.
- The staging branch is written to by the staging branch of the <a href="https://github.com/cagov/services-wordpress-to-github-cannabis-ca-gov">cannabis publishing service</a> and deploys to staging.cannabis.ca.gov which is a CloudFront distribution backed by an S3 bucket.
- The main branch is written to by the main branch of the <a href="https://github.com/cagov/services-wordpress-to-github-cannabis-ca-gov">cannabis publishing service</a> and deploys to headless.cannabis.ca.gov which is a CloudFront distribution backed by an S3 bucket.

#### Some files used only in WordPress:

This repo contains files used by the WordPress site like:

- src/css/colorscheme-cannabisv1.0.7.min.css
- manual-cawebv1.0.1.css


The whole src/js/wordpress directory for the bundle of components used in WordPress authoring and public site

The following command is used to generate the bundle files used by the production WordPress monolith sites;

```
npm run wordpress-bundle
```

This generates a hashed filename in the src/js/wordpress/generated directory.


The npm script in this package.json references multiple commands which point to specific rollup config files which reference the modules included.

When content in this repository is modified it gets deployed to headles.cannabis.ca.gov so the new hashed filename can be referenced in the WordPress monolith custom JS textarea we modify in the theme config in the wordpress admin. Since we are using hashed filenames we can revert easily to the prior filename.
