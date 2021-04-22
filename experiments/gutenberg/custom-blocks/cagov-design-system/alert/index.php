<?php

/**
 * Plugin Name: CA Gov Alert
 * Plugin URI: https://github.com/cagov/gutenberg-blocks
 * Description: This is a plugin to build a alert block in the Gutenberg editor. Layout and styles use the California State government design system.
 * Version: 1.1.0
 * Author: California Office of Digital Innovation
 *
 * @package cagov-gutenberg-blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
 */
add_action( 'init', 'gutenberg_examples_02_load_textdomain' );

function gutenberg_examples_02_load_textdomain() {
	load_plugin_textdomain( 'gutenberg-examples', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function gutenberg_examples_02_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'gutenberg-examples-02',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	wp_register_style(
		'cagov-alert',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'cagov/alert', array(
		'style' => 'cagov-alert',
		'editor_script' => 'gutenberg-examples-02',
	) );

}
add_action( 'init', 'gutenberg_examples_02_register_block' );
