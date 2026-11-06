<?php

/**
 * Here you can register new menu items.
 */

defined('ABSPATH') || exit;

use MXSFWNWPPGNext\Admin\Router;

$router = new Router();

$mainMenuSlug = 'wppg-next';

/**
 * PAGE.
 * 
 * Add Main Menu Item.
 * 
 * /wp-admin/admin.php?page=wppg-next
 * */
$router->get('main')->properties([
    'menuSlug' => $mainMenuSlug
]);

/**
 * PAGE.
 * 
 * Add Sub Menu Item.
 * 
 * /wp-admin/admin.php?page=wppg-next-sub
 * */
$router->get('sub-menu')
    ->menuAction('addSubmenuPage')
    ->properties([
        'parentSlug' => $mainMenuSlug,
        'pageTitle'  => 'WPPG Next. Sub Menu',
        'menuTitle'  => 'Sub Menu',
        'menuSlug'   => 'wppg-next-sub'
    ]);

/**
 * PAGE.
 * 
 * Add Hidden Menu Item.
 * 
 * /wp-admin/admin.php?page=wppg-next-hidden
 * */
$router->get('hidden-menu')
    ->menuAction('addSubmenuPage')
    ->properties([
        'pageTitle'  => 'WPPG Next. Hidden Menu',
        'menuTitle'  => 'Hidden Menu',
        'menuSlug'   => 'wppg-next-hidden'
    ]);

/**
 * PAGE.
 * 
 * Add Option Menu Item.
 * 
 * /wp-admin/options-general.php?page=wppg-next-settings
 * */
$optionSlug = 'settings-menu';
$router->get($optionSlug)
    ->menuAction('addOptionsPage')
    ->properties([
        'pageTitle'  => 'WPPG Next. Settings Menu',
        'menuTitle'  => 'WPPG Next',
        'menuSlug'   => 'wppg-next-settings'
    ]);

/**
 * Add link to the Options page on the plugins page.
 * */
$router->get($optionSlug)
    ->menuAction('addOptionLink')
    ->properties([
        'menuTitle'  => 'WPPG Next',
        'menuSlug'   => 'wppg-next-settings'
    ]);

/**
 * PAGE.
 * 
 * Custom table examples.
 * 
 * Robots table. Main page.
*/
$router->get('ai-robots-table/main')->properties([
    'menuSlug' => 'ai-robots',
    'pageTitle'  => 'AI robots',
    'menuTitle'  => 'AI robots',
]);

/**
 * PAGE.
 * 
 * Single robot page.
 * 
 * /wp-admin/admin.php?page=ai-robot-edit
 * */
$router->get('ai-robots-table/single')
    ->menuAction('addSubmenuPage')
    ->properties([
        'pageTitle'  => 'Single robot',
        'menuTitle'  => 'Single robot',
        'menuSlug'   => 'ai-robot-edit'
    ]);

/**
 * PAGE.
 * 
 * Add a robot page.
 * 
 * /wp-admin/admin.php?page=add-ai-robot
 * */
$router->get('ai-robots-table/add-robot')
->menuAction('addSubmenuPage')
->properties([
    'pageTitle'  => 'Add robot',
    'menuTitle'  => 'Add robot',
    'menuSlug'   => 'add-ai-robot'
]);

/**
 * ACTION.
 * 
 * Edit action for robots.
 * 
 * /wp-admin/admin.php?page=action-ai-robot-update
 * */
$router->get('ai-robots-table/action-ai-robot-update')
    ->menuAction('addSubmenuPage')
    ->properties([
        'pageTitle'  => 'Edit robot',
        'menuTitle'  => 'Edit robot',
        'menuSlug'   => 'action-ai-robot-update'
    ]);

/**
 * ACTION.
 * 
 * Store action for robots.
 * 
 * /wp-admin/admin.php?page=action-ai-robot-store
 * */
$router->get('ai-robots-table/action-ai-robot-store')
    ->menuAction('addSubmenuPage')
    ->properties([
        'pageTitle'  => 'Store robot',
        'menuTitle'  => 'Store robot',
        'menuSlug'   => 'action-ai-robot-store'
    ]);

/**
 * ACTION.
 * 
 * Actions for robots:
 *   Trash
 *   Restore
 *   Delete
 * 
 * /wp-admin/admin.php?page=action-ai-robot-trash-restore-delete
 * */
$router->get('ai-robots-table/action-ai-robot-trash-restore-delete')
    ->menuAction('addSubmenuPage')
    ->properties([
        'pageTitle'  => 'Single robot',
        'menuTitle'  => 'Single robot',
        'menuSlug'   => 'action-ai-robot-trash-restore-delete'
    ]);

/**
 * ACTION.
 * 
 * Bulk actions for robots.
 * 
 * /wp-admin/admin.php?page=action-ai-robot-bulk
 * */
$router->get('ai-robots-table/action-ai-robot-bulk')
    ->menuAction('addSubmenuPage')
    ->properties([
        'pageTitle'  => 'Bulk actions for robots',
        'menuTitle'  => 'Bulk actions for robots',
        'menuSlug'   => 'action-ai-robot-bulk'
    ]);

// Render all the pages.
$router->route();

/**
 * Process custom-table mutation actions early — on admin_init, before any
 * admin output — so the controllers can issue a safe, header-based redirect
 * and terminate. The matching admin pages stay registered above so the request
 * resolves; we re-check the same capability here because admin_init runs before
 * WordPress enforces the page capability.
 */
add_action('admin_init', function () {

    if (!is_admin()) return;

    $actionControllers = [
        'action-ai-robot-store'                => 'ai-robots-table/action-ai-robot-store',
        'action-ai-robot-update'               => 'ai-robots-table/action-ai-robot-update',
        'action-ai-robot-trash-restore-delete' => 'ai-robots-table/action-ai-robot-trash-restore-delete',
        'action-ai-robot-bulk'                 => 'ai-robots-table/action-ai-robot-bulk',
    ];

    $page = isset($_REQUEST['page']) && is_string($_REQUEST['page'])
        ? sanitize_key(wp_unslash($_REQUEST['page']))
        : '';

    if (!isset($actionControllers[$page])) return;

    // Match the capability these admin pages are registered with.
    if (!current_user_can('manage_options')) return;

    require_once MXSFWN_PLUGIN_ABS_PATH . 'includes/Admin/controllers/' . $actionControllers[$page] . '.php';
});
