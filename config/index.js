const siteSettings = require("./config.json"); // Site config (renders in markup)

let staticContentPath = "./static-content-cannabis-main";

if (process.env.SITE_ENV === "staging") {
  staticContentPath = "./static-content-cannabis-staging";
}

// if (process.env.SITE_ENV === "localhost") {
  // staticContentPath = "./node_modules/static-content-cannabis-staging-debugging";
// }

const staticContentPaths = {
  staticContentPaths: {
    root: `${staticContentPath}`,
    media: `${staticContentPath}/media`,
    pages: `${staticContentPath}/pages`,
    posts: `${staticContentPath}/posts`,
    redirects: `${staticContentPath}/redirects`,
    menu: `${staticContentPath}/menu`,
    data: `${staticContentPath}/data`,
  },
};

const getConfig = () => {
  let config = Object.assign(
    {},
    siteSettings,
    staticContentPaths
  );

  const defaultDomain = config.build.host_name;
  const DOMAIN = process.env.DOMAIN || defaultDomain;
  config.build.host_name = DOMAIN; //"cannabis.ca.gov";

  if (process.env.SITE_ENV === "production") {
    config.build.canonical_site_url = "https://cannabis.ca.gov";
  }

  if (process.env.SITE_ENV === "headless") {
    config.build.canonical_site_url = "https://headless.cannabis.ca.gov";
  }

  if (process.env.SITE_ENV === "staging") {
    config.build.canonical_site_url = "https://staging.cannabis.ca.gov";
  }

  if (process.env.SITE_ENV === "localhost") {
    config.build.canonical_site_url = "http://localhost:8080";
  }

  return config;
};

module.exports = getConfig();
