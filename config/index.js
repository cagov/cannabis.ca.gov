const siteSettings = require("./config.json"); // Site config (renders in markup)

let staticContentPath = "./node_modules/static-content-cannabis";

if (process.env.SITE_ENV === "staging") {
  staticContentPath = "./node_modules/static-content-cannabis-staging";
}

// let staticContentPathDebugging = "./node_modules/static-content-cannabis-debugging";


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

  if (process.env.SITE_ENV === "staging") {
    config.site_url = "https://staging.cannabis.ca.gov";
    
    config.build.replace_urls = [
      "http://cannabis.ca.gov/",
      "https://cannabis.ca.gov/",
      "https://staging.cannabis.ca.gov/",
      "https://live-cannabis-ca-gov.pantheonsite.io/",
      "https://test-cannabis-ca-gov.pantheonsite.io/",
      "https://dev-cannabis-ca-gov.pantheonsite.io/",
      "https://api.cannabis.ca.gov/",
      "https://dev-cannabis-ca-gov.pantheonsite.io/",
      "https://dev-cagov-dcc.pantheonsite.io/"
    ];
    config.build.static_site_url = "https://staging.cannabis.ca.gov";
    config.build.canonical_url = "https://staging.cannabis.ca.gov";
    config.build.s3_bucket_url = "https://staging.cannabis.ca.gov";
  }

  if (process.env.SITE_ENV === "localhost") {
    config.site_url = "http://localhost:8080";
    
    config.build.replace_urls = [
      "http://cannabis.ca.gov/",
      "https://cannabis.ca.gov/",
      "https://staging.cannabis.ca.gov/",
      "https://live-cannabis-ca-gov.pantheonsite.io/",
      "https://test-cannabis-ca-gov.pantheonsite.io/",
      "https://dev-cannabis-ca-gov.pantheonsite.io/",
      "https://api.cannabis.ca.gov/",
      "https://dev-cannabis-ca-gov.pantheonsite.io/",
      "https://dev-cagov-dcc.pantheonsite.io/"
    ];
    config.build.static_site_url = "http://localhost:8080";
    config.build.canonical_url = "http://localhost:8080";
    config.build.s3_bucket_url = "http://localhost:8080";
  }

  return config;
};

module.exports = getConfig();
