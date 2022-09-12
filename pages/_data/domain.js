const config = require('../../config');
const defaultDomain = config.build.static_site_url;
/**
 * Make a DOMAIN variable available to templates.
 */
module.exports = process.env.DOMAIN || defaultDomain;