const main = require('./odi-publishing.json'); // Default settings.

// const staging = require('./odi-publishing.json'); // Default settings.
const localhost = require('./odi-publishing.localhost.json'); // Default settings.

const getConfig = () => {
    if (process.env.NODE_ENV === "development") {
        return localhost;
    }
    return main;
};

module.exports = getConfig();