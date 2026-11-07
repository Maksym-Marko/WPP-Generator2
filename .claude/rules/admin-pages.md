---
paths:
  - "includes/Admin/routes.php"
  - "includes/Admin/Router.php"
  - "includes/Admin/Entities/AdminMenu.php"
  - "includes/Admin/controllers/*.php"
  - "includes/Admin/views/*.view.php"
---

# Admin menus, pages & routing

Read this before adding or changing an admin menu, submenu, options page, or the
controller/view behind it. The custom-table (AI robots) screens use the same
router but have their own rule — see `.claude/rules/list-tables.md`.

## Where to start

`includes/Admin/routes.php` is the single registration point. It builds a
`includes/Admin/Router.php` instance and calls `$router->route()` at the end
(already wired). The router is instantiated from `Admin\AdminSoul`.

## Pattern to follow

```php
$router->get('my-controller')                 // file in includes/Admin/controllers/
    ->menuAction('addSubmenuPage')             // addMenuPage|addSubmenuPage|addOptionsPage|addOptionLink
    ->properties([
        'parentSlug' => 'wppg-next',
        'pageTitle'  => 'My Page',
        'menuTitle'  => 'My Page',
        'menuSlug'   => 'my-page',
        'capability' => 'manage_options',      // AdminMenu default; tighten/loosen deliberately
    ]);
```

- **Controller**: `includes/Admin/controllers/my-controller.php` runs on page
  load. Render a view with `mxsfwnView('my-view', ['foo' => $bar])`.
- **View**: `includes/Admin/views/my-view.view.php`.
- Copy an existing example: `main` (top-level), `sub-menu` (submenu),
  `settings-menu` (`addOptionsPage` + `addOptionLink`), `hidden-menu`.
- Default capability is `manage_options` (`Admin/Entities/AdminMenu.php`). WP
  enforces it at the menu level, but **re-check `current_user_can()` inside the
  controller for every state-changing action** — `routes.php` already does this
  on `admin_init` for the robot mutation controllers because `admin_init` fires
  before WP enforces the page capability.
- **Page-specific assets**: enqueue in `AdminEnqueueScripts.php` gated on
  `$_GET['page']` — see `.claude/rules/assets-enqueue.md`.
- Real settings storage: use the WordPress Settings API (`register_setting`,
  nonce'd `options.php` forms), not an ad-hoc handler.

## Verify

Activate in local WordPress, open the new page from the admin menu, confirm the
capability gate and that the view renders with no PHP notices in `debug.log`.
