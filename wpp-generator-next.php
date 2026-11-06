<?php

/**
 * Plugin Name:       This Plugin Name
 * Plugin URI:        https://markomaksym.com.ua/wp-plugin-skeleton-generator/
 * Description:       Brief description
 * Version:           1.0
 * Requires at least: 6.9
 * Requires PHP:      8.4
 * Author:            This Plugin Author
 * Author URI:        https://github.com/Maksym-Marko
 * Text Domain:       wpp-generator-next
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Requires Plugins:
 */

defined('ABSPATH') || exit;

/**
 * Define MXSFWN_PLUGIN_VERSION
 * 
 * The version of all CSS and JavaScript files
 * in the plugin. Change for caching purpose.
 */
if (!defined('MXSFWN_PLUGIN_VERSION')) {

    define('MXSFWN_PLUGIN_VERSION', time()); // Must be replaced before production on for example '1.0'
}

/**
 * Define MXSFWN_PLUGIN_UNIQUE_STRING
 * 
 * Unique string - mxsfwn.
 * This string will be used to avoid plugin conflicts.
 */
if (!defined('MXSFWN_PLUGIN_UNIQUE_STRING')) {

    define('MXSFWN_PLUGIN_UNIQUE_STRING', 'mxsfwn');
}

/**
 * Define MXSFWN_PLUGIN_PATH
 * 
 * D:\xampp\htdocs\my-domain.com\wp-content\plugins\wpp-generator-next\wpp-generator-next.php
 */
if (!defined('MXSFWN_PLUGIN_PATH')) {

    define('MXSFWN_PLUGIN_PATH', __FILE__);
}

/**
 * Define MXSFWN_PLUGIN_URL
 * 
 * Return http://my-domain.com/wp-content/plugins/wpp-generator-next/
 */
if (!defined('MXSFWN_PLUGIN_URL')) {

    define('MXSFWN_PLUGIN_URL', plugins_url('/', __FILE__));
}

/**
 * Define MXSFWN_PLUGIN_BASE_NAME
 * 
 * Return wpp-generator-next/wpp-generator-next.php
 */
if (!defined('MXSFWN_PLUGIN_BASE_NAME')) {

    define('MXSFWN_PLUGIN_BASE_NAME', plugin_basename(__FILE__));
}

/**
 * Define MXSFWN_PLUGIN_ABS_PATH
 * 
 * D:\xampp\htdocs\my-domain.com\wp-content\plugins\wpp-generator-next/
 */
if (!defined('MXSFWN_PLUGIN_ABS_PATH')) {

    define('MXSFWN_PLUGIN_ABS_PATH', dirname(MXSFWN_PLUGIN_PATH) . '/');
}

/**
 * Run plugin if PHP >= 8.4
 */
if (PHP_VERSION_ID >= 80400) {

    /**
     * Autoload.
     */
    require MXSFWN_PLUGIN_ABS_PATH . 'vendor/autoload.php';

    /**
     * Helper functions.
     */
    require_once MXSFWN_PLUGIN_ABS_PATH . 'includes/Shared/functions.php';

    /**
     * activation|deactivation.
     */
    require_once MXSFWN_PLUGIN_ABS_PATH . 'install.php';

    /**
     * Run plugin parts.
     */
    require_once MXSFWN_PLUGIN_ABS_PATH . 'index.php';
}
