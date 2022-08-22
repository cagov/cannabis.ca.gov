const production = require('./odi-publishing.json'); // Default settings. Default settings.
// const test = require('./odi-publishing.test.json'); // Temporarily disabling these
// const staging = require('./odi-publishing.staging.json');
// const development = require('./odi-publishing.development.json');

const getConfig = () => {
    let config = production;

    // if (process.env.SITE_ENV === "development") {
    //     config = development;
    // }
    // if (process.env.SITE_ENV === "staging") {
    //     config = staging;
    // }
    // if (process.env.SITE_ENV === "test") {
    //     config = test;
    // }
    // if (process.env.SITE_ENV === "production") {
    //     config = production;
    // }

    if (process.env.SITE_ENV === "localhost") {
        config.og_meta.site_url = 'http://localhost:8080';
        config.og_meta.site_url = 'http://localhost:8080';

        config.build.replace_urls = [
            "http://cannabis.ca.gov/",
            "https://cannabis.ca.gov/",
            "https://dev-cannabis-ca-gov.pantheonsite.io"
        ];
        config.build.static_site_url = "http://localhost:8080";
        config.build.canonical_url = "http://localhost:8080";
        config.build.s3_bucket_url = "http://localhost:8080";
    }

    return config;
};

module.exports = getConfig();