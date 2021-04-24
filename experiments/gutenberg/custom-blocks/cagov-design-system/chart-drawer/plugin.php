<?php
/**
 * Plugin Name: chart-drawer — covid19.ca.gov block
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: chart-drawer — is a Gutenberg plugin created via create-guten-block.
 * Author: State of California Office of Digital Innovation
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
