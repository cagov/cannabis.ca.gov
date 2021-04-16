<?php

/**
 * Plugin Name: CA Gov card grid
 * Plugin URI: https://github.com/cagov/gutenberg-blocks
 * Description: This is a plugin using nested and inner blocks in the Gutenberg editor. Layout and styles use the California State government design system.
 * Version: 1.1.0
 * Author: California Office of Digital Innovation
 *
 * @package cagov-gutenberg-blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 */
function gutenberg_examples_06_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'gutenberg-examples-06',
		plugins_url( 'block.js', __FILE__ ),
		[ 'wp-blocks', 'wp-element', 'wp-block-editor' ],
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ),
		true
	);

	wp_register_style(
		'cagov-card-grid',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type(
		'cagov/card-grid',
		[
			'style' => 'cagov-card-grid',
			'editor_script' => 'gutenberg-examples-06',
		]
	);

}
add_action( 'init', 'gutenberg_examples_06_register_block' );
