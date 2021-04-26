<?php
/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package california-design-system
 */

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function news_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = dirname( __FILE__ );

	$index_js = 'news/index.js';
	wp_register_script(
		'news-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'news/editor.css';
	wp_register_style(
		'news-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'news/style.css';
	wp_register_style(
		'news-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

  $frontend_js = 'news/frontend.js';
  wp_enqueue_script(
    'california-design-system-news-frontend',
    plugins_url($frontend_js, __FILE__),
    array( "wp-editor"),
    true
  );

	register_block_type( 'california-design-system/news', array(
		'editor_script' => 'news-block-editor',
		'editor_style'  => 'news-block-editor',
		'style'         => 'news-block',
	) );
}
add_action( 'init', 'news_block_init' );
