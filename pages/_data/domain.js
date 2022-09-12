const config = require('../../config');
const defaultDomain = new URL(config.build.static_site_url).host;

/**
 * Make a DOMAIN variable available to templates.
 */
module.exports = process.env.DOMAIN || defaultDomain;