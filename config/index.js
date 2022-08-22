const siteSettings = require("./site-settings.json"); // Site config (renders in markup)
const buildSettings = require("./build-settings.json"); // Build settings (connects to files)
const translationSettings = require("./translations.json"); // Custom UI strings, by language (currently just "en")

const staticContentPath = "./node_modules/static-content-cannabis";

const staticContentPaths = {
  staticContentPaths: {
    root: `${staticContentPath}`,
    media: `${staticContentPath}/media`,
    pages: `${staticContentPath}/pages`,
    posts: `${staticContentPath}/posts`,
    redirects: `${staticContentPath}/redirects`,
    menu: `${staticContentPath}/menu`,
    data: `${staticContentPath}/data`
  },
};

const getConfig = () => {
  let config = Object.assign(
    {},
    siteSettings,
    buildSettings,
    translationSettings,
    staticContentPaths
  );

  // if (process.env.SITE_ENV === "development") {
  //     config = development;
  // }

  if (process.env.SITE_ENV === "localhost") {
    config.og_meta.site_url = "http://localhost:8080";
    config.og_meta.site_url = "http://localhost:8080";

    config.build.replace_urls = [
      "http://cannabis.ca.gov/",
      "https://cannabis.ca.gov/",
      "https://dev-cannabis-ca-gov.pantheonsite.io",
    ];
    config.build.static_site_url = "http://localhost:8080";
    config.build.canonical_url = "http://localhost:8080";
    config.build.s3_bucket_url = "http://localhost:8080";
  }

  return config;
};

module.exports = getConfig();
