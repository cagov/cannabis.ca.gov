const main = require('./odi-publishing.json'); // Default settings.
const test = require('./odi-publishing.test.json'); // Default settings.
// const staging = require('./odi-publishing.staging.json'); // Default settings.
const localhost = require('./odi-publishing.localhost.json'); // Default settings.

const getConfig = () => {
    if (process.env.NODE_ENV === "development") {
        return localhost;
    }
    if (process.env.NODE_ENV === "test") {
        return test;
    }
    return main;
};

module.exports = getConfig();