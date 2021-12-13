const main = require('./odi-publishing.json'); // Default settings.
const localhost = require('./odi-publishing.localhost.json'); // Default settings.

const getConfig = () => {
    if (process.env.NODE_ENV === "development") {
        return localhost;
    }
    if (process.env.DOMAIN === "main-test-pantheon.drought.ca.gov.s3-website-us-west-1.amazonaws.com") {
        return main_test_pantheon;
    }
    return main;
};

module.exports = getConfig();