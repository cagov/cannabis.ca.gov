const config = require("../../config");

const defaultDomain = config.build.canonical_site_url;
/**
 * Make a DOMAIN variable available to templates.
 */
module.exports = process.env.DOMAIN || defaultDomain;
