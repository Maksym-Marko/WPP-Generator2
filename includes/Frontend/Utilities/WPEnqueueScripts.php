<?php

/**
 * The WPEnqueueScripts class.
 *
 * This class is used to register 
 * styles and scripts for the frontend area.
 */

namespace MXSFWNWPPGNext\Frontend\Utilities;

class WPEnqueueScripts
{

    /**
     * Unique string to avoid conflicts.
     * 
     * @var string
     */
    protected $uniqueString = MXSFWN_PLUGIN_UNIQUE_STRING;

    /**
     * The file version. Helps to cope with caching.
     * 
     * @var string
     */
    protected $version      = MXSFWN_PLUGIN_VERSION;

    /**
     * URL to the plugin folder.
     * 
     * @var string
     */
    protected $pluginUrl    = MXSFWN_PLUGIN_URL;

    /**
     * Enqueue all the scripts
     * 
     * @return void
     */
    public function enqueue(): void
    {

        add_action("wp_enqueue_scripts", [$this, 'scripts']);

        add_action('wp_enqueue_scripts', [$this, 'dequeueApiFetch'], 100);
    }

    /**
     * Prevents unnecessary API calls for non-logged-in users by preloading a null response
     * for the WordPress user endpoint.
     * 
     * This function adds inline JavaScript that creates a preloading middleware for the
     * wp.apiFetch utility. When a non-logged-in user accesses the site, instead of making
     * an actual API request to '/wp/v2/users/me', the middleware returns a preloaded
     * null response with a 401 status code. This prevents unnecessary HTTP requests and
     * eliminates console errors related to unauthorized user data access.
     * 
     * The function only runs for non-logged-in users to maintain normal functionality
     * for authenticated users.
     * 
     * @return void
     */
    public function dequeueApiFetch(): void
    {
        if (!is_user_logged_in()) {

            wp_add_inline_script(
                'wp-api-fetch',
                sprintf(
                    'wp.apiFetch.use( wp.apiFetch.createPreloadingMiddleware( %s ) );',
                    wp_json_encode([
                        '/wp/v2/users/me?context=edit' => [
                            'body' => null,
                            'headers' => ['status' => 401]
                        ]
                    ])
                ),
                'after'
            );
        }
    }

    /**
     * Enqueue styles and scripts for 
     * the frontend panel.
     * 
     * @return void
     */
    public function scripts(): void
    {

        // dependencies
        wp_enqueue_script(
            "{$this->uniqueString}-dependencies",
            $this->pluginUrl . 'build/dependencies/vendors/index.js',
            ['react'],
            $this->version,
            true
        );

        // ReactJs
        $reactJsHandler = "{$this->uniqueString}-react-js-scripts";
        wp_enqueue_script(
            $reactJsHandler,
            $this->pluginUrl . 'build/frontend/react-js/index.js',
            ["{$this->uniqueString}-dependencies", 'wp-i18n'],
            $this->version,
            true
        );

        // Translate JS strings
        wp_set_script_translations($reactJsHandler, 'wpp-generator-next', MXSFWN_PLUGIN_ABS_PATH . 'languages');

        // Localizer
        wp_localize_script(
            $reactJsHandler,
            "{$this->uniqueString}ReactJsLocalizer",
            [
                'ajaxURL'   => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('wp_rest'),
            ]
        );

        // Add Font Awesome
        $fontAwesomeHandle = "{$this->uniqueString}-font-awesome";
        wp_enqueue_style(
            $fontAwesomeHandle,
            $this->pluginUrl . 'assets/packages/font-awesome-4.6.3/css/font-awesome.min.css',
            [],
            $this->version
        );

        // ReactJs style
        wp_enqueue_style(
            "{$this->uniqueString}-react-js-style",
            $this->pluginUrl . 'build/frontend/react-js/index.css',
            [$fontAwesomeHandle],
            $this->version
        );

        // Tailwind CSS
        wp_enqueue_style(
            "{$this->uniqueString}-tailwind-css",
            $this->pluginUrl . 'build/css/style.css',
            [],
            $this->version
        );
    }
}
