<?php

/**
 * The CustomBlocks class.
 *
 * Here you can make global settings of
 * Gutenberg blocks.
 * The main code is in src/gutenberg folder
 */

namespace MXSFWNWPPGNext\Features\Gutenberg;

class CustomBlocks
{

    public function __construct()
    {

        // Register blocks
        add_action('init', [$this, 'registerBlocks']);

        // Generate new categories
        add_filter('block_categories_all', [$this, 'blockCategories'], 10, 2);

        // Enqueue blocks
        add_action('enqueue_block_editor_assets', [$this, 'enqueueBlocks']);
    }

    /**
     * Generate new categories
     */
    public function registerBlocks(): void
    {

        $blocksDir = MXSFWN_PLUGIN_ABS_PATH . '/src/gutenberg';

        if (! is_dir($blocksDir)) return;

        foreach (glob($blocksDir . '/*/block.json') as $blocksJSON) {
            register_block_type_from_metadata(dirname($blocksJSON));
        }
    }

    /**
     * Generate new categories
     */
    public function blockCategories(array $categories): array
    {

        array_unshift($categories, [
            'slug'  => 'mxsfwn-wppgnext',
            'title' => __('WPPG Next', 'wpp-generator-next'),
        ]);

        return $categories;
    }

    /**
     * Enqueue blocks
     */
    public function enqueueBlocks(): void
    {

        // Blocks JS
        $blocksJSFile  = '/build/blocks/blocks.js';
        $blocksJSFilePath  = MXSFWN_PLUGIN_ABS_PATH . $blocksJSFile;

        if (file_exists($blocksJSFilePath)) {
            wp_enqueue_script(
                'mxsfwn-blocks-js',
                MXSFWN_PLUGIN_URL . $blocksJSFile,
                ['wp-blocks', 'wp-element', 'wp-editor'],
                filemtime($blocksJSFilePath),
                true
            );
        }

        // Blocks CSS
        $blocksCSSFile = '/build/blocks/style-blocks.css';
        $blocksCSSFilePath = MXSFWN_PLUGIN_ABS_PATH . $blocksCSSFile;

        if (file_exists($blocksCSSFilePath)) {
            wp_enqueue_style(
                'mxsfwn-blocks-css',
                MXSFWN_PLUGIN_URL . $blocksCSSFile,
                [],
                filemtime($blocksCSSFilePath)
            );
        }
    }
}
