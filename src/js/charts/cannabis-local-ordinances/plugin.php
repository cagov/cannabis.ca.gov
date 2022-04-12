<?php

/**
 * Plugin Name: Cannabis Legal Access
 * Plugin URI: TBD
 * Description: 
 * Version: 1.0.0
 * Author: California Office of Digital Innovation
 * @package cannabis-ca-gov
 */

defined('ABSPATH') || exit;

/**
 * Load all translations for our plugin from the MO file.
 */
add_action('init', 'cannabis_legal_access');


function cannabis_legal_access()
{
    // @TODO check post & add script only if page has needed element.
    add_action('wp_enqueue_scripts', 'cannabis_legal_access_scripts');
    add_filter('script_loader_tag', 'cannabis_legal_access_add_type_attribute', 10, 3);
}

function cannabis_legal_access_scripts()
{
    wp_enqueue_script(
        'cannabis-local-ordinances',
        plugins_url('build/bundle.js', __FILE__),
        array(),
        '1.0.0.5',
        true
    );

    // $critical_css = file_get_contents(plugins_url('build/index.css', __FILE__));
    // echo '<style>' . $critical_css . '</style>';


}

function cannabis_legal_access_add_type_attribute($tag, $handle, $src)
{
    // if not your script, do nothing and return original $tag

    if ('where-cannabis-business-is-legal-in-california' !== $handle) {
        return $tag;
    }
    // change the script tag by adding type="module" and return it.
    $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
    return $tag;
}

function cannabis_legal_access_enable_d3_asset_upload($upload_mimes)
{
    if (current_user_can('upload_files')) {
        $upload_mimes['svg'] = 'image/svg+xml';
        $upload_mimes['svgz'] = 'image/svg+xml';
        $upload_mimes['csv'] = 'text/csv';
        $upload_mimes['json'] = 'application/json';
    }

    return $upload_mimes;
}
add_filter('upload_mimes', 'cannabis_legal_access_enable_d3_asset_upload', 10, 1);
