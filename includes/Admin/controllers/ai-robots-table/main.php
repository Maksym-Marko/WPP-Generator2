<?php

/**
 * CONTROLLER.
 * 
 * Generate a table with ai robots.
 * 
 * VIEW: \includes\Admin\views\ai-robots-table\main.view.php
 */

defined('ABSPATH') || exit;

use MXSFWNWPPGNext\Admin\Utilities\Tables\RobotsDataManager;

$instance = new RobotsDataManager();

$table = $instance->getTableName();

$isTable = $instance->getWPDB()->get_var(
    $instance->getWPDB()->prepare(
        'SHOW TABLES LIKE %s',
        $instance->getWPDB()->esc_like($table)
    )
);

mxsfwnView('ai-robots-table/main', [
    'message' => 'The table is not available!',
    'tableInstance' => new RobotsDataManager(),
    'isTable' => $isTable,
    'uniqueString' => MXSFWN_PLUGIN_UNIQUE_STRING
]);
