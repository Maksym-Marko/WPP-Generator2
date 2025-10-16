<?php

/**
 * The FeaturesSoul class.
 *
 * This class collects
 * the plugin's features.
 */

namespace MXSFWNWPPGNext\Features;

use MXSFWNWPPGNext\Features\Gutenberg\CustomBlocks;

class FeaturesSoul
{

    /**
     * List of features.
     */
    public function __construct()
    {

        $this->registerGutenbergBlocks();

        $this->registerApiRoutes();
    }

    /**
     * Register all types of Gutenberg blocks.
     * 
     * @return void      Register gutenberg blocks.
     */
    public function registerGutenbergBlocks(): void
    {

        new CustomBlocks;
    }

    /**
     * REST API. Routes register.
     * 
     * @return void      Register routes.
     */
    public function registerApiRoutes(): void
    {

        require_once MXSFWN_PLUGIN_ABS_PATH . 'includes/Features/API/init.php';
    }
}
