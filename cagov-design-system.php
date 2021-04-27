<?php
/**
 * Plugin Name: ca.gov Design System - Gutenberg Blocks
 * Plugin URI: TBD
 * Description: TBD
 * Author: 
 * Author URI: 
 * Version: 1.0.0
 * License: TBD
 * License URI: TBD
 * Text Domain: cagov-design-system
 * @package cagov-design-system
 */
if (!defined('ABSPATH')) {
    exit;
}
// Constants
define('CAGOV_DESIGN_SYSTEM_VERSION', '1.0.0');
define('CAGOV_DESIGN_SYSTEM_BLOCKS_DIR_PATH', plugin_dir_path(__FILE__));
define('CAGOV_DESIGN_SYSTEM_ADMIN_URL', plugin_dir_url(__FILE__));
define('CAGOV_DESIGN_SYSTEM_FILE', __FILE__);

if( ! class_exists('CAGOVDesignSystem') ) {
    require_once CAGOV_DESIGN_SYSTEM_BLOCKS_DIR_PATH . '/includes/class-cagov-design-system.php';
}

CAGOVDesignSystem::get_instance();
