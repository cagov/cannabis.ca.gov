const config = require('../../../config');

/**
 * Make config value available to templating system
 */
module.exports = process.env.config || config;