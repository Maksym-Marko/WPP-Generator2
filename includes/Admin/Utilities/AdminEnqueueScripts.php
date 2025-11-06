<?php

/**
 * The AdminEnqueueScripts class.
 *
 * This class is used to register 
 * styles and scripts for admin area.
 */

namespace MXSFWNWPPGNext\Admin\Utilities;

class AdminEnqueueScripts
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

        add_action('admin_enqueue_scripts', [$this, 'scripts']);
    }

    /**
     * Enqueue styles and scripts for 
     * the admin panel.
     * 
     * @return void
     */
    public function scripts(): void
    {

        // dependencies
        $dependenciesHandler = "{$this->uniqueString}-dependencies";
        wp_enqueue_script(
            $dependenciesHandler,
            $this->pluginUrl . 'build/dependencies/vendors/index.js',
            [],
            $this->version,
            true
        );

        $metaBoxImageUploadHandler = "{$this->uniqueString}-meta-box-image-upload";
        wp_enqueue_script(
            $metaBoxImageUploadHandler,
            $this->pluginUrl . 'build/admin/meta-box-image-upload/index.js',
            [$dependenciesHandler, 'jquery'],
            $this->version,
            true
        );

        // Localizer
        wp_localize_script(
            $metaBoxImageUploadHandler,
            "{$this->uniqueString}AdminLocalize",
            [
                'nonce'   => wp_create_nonce('wp_rest'),
            ]
        );

        // MetaBox style
        wp_enqueue_style(
            "{$this->uniqueString}-meta-box-style",
            $this->pluginUrl . 'build/admin/meta-box-image-upload/index.css',
            [],
            $this->version,
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
