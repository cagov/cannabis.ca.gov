const config = require('../../../odi-publishing/config.js');
const defaultDomain = new URL(config.build.static_site_url).host;

module.exports = process.env.DOMAIN || defaultDomain;