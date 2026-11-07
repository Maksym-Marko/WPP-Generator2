---
paths:
  - "wpp-generator-next.php"
  - "index.php"
  - "install.php"
  - "uninstall.php"
  - "composer.json"
  - "includes/WppGenerator.php"
  - "includes/Activator.php"
  - "includes/Deactivator.php"
  - "includes/Uninstall.php"
  - "includes/Admin/AdminSoul.php"
  - "includes/Frontend/FrontendSoul.php"
  - "includes/Features/FeaturesSoul.php"
  - "includes/Shared/**"
---

# Plugin structure, bootstrap & lifecycle

Read this before touching the bootstrap chain, the activation/deactivation/
uninstall hooks, or when adding a new feature and wiring its admin/frontend
parts.

## Load order (verified)

1. `wpp-generator-next.php` — plugin header, `defined('ABSPATH') || exit;`,
   defines `MXSFWN_PLUGIN_VERSION` (currently `time()` — **set a static version
   before shipping**), `…_UNIQUE_STRING` (`mxsfwn`), `…_PATH/_URL/_BASE_NAME/
   _ABS_PATH`. Then, only if `PHP_VERSION_ID >= 80400`, requires
   `vendor/autoload.php`, `includes/Shared/functions.php`, `install.php`,
   `index.php`.
2. `index.php` — guards on `class_exists('WppGenerator')`, instantiates
   `MXSFWNWPPGNext\WppGenerator`, and loads the text domain on `plugins_loaded`.
3. `includes/WppGenerator.php` — constructs the three feature hubs ("souls"):
   `Admin\AdminSoul`, `Frontend\FrontendSoul`, `Features\FeaturesSoul`. These are
   the on/off switch surface for each layer.

## Lifecycle hooks

- `install.php` registers `Activator::init` / `Deactivator::init` against
  `MXSFWN_PLUGIN_BASE_NAME`.
- `includes/Activator.php` → `createTables()` runs the custom-table migration on
  activation (see `.claude/rules/database-tables.md`).
- `uninstall.php` runs `Uninstall::init()` (`includes/Uninstall.php`), currently
  only `delete_option('mxsfwn_rewrite_rules')`. Add cleanup for anything you
  create (options, tables) here.

## Adding a feature — where to register it

Pick the hub by layer, then follow the matching rule:

- Admin-only (menus, CPT, taxonomy, meta boxes, list tables) → register from
  `includes/Admin/AdminSoul.php`. See `.claude/rules/admin-pages.md`,
  `post-types-taxonomies.md`, `meta-boxes.md`, `list-tables.md`,
  `database-tables.md`.
- Frontend (assets, shortcodes) → `includes/Frontend/FrontendSoul.php`. See
  `.claude/rules/assets-enqueue.md`, `shortcodes.md`.
- Blocks & REST → `includes/Features/FeaturesSoul.php`. See
  `.claude/rules/gutenberg-blocks.md`, `rest-api.md`.

## PHP conventions

- One PSR-4 class per file under `includes/`, namespace root `MXSFWNWPPGNext\`
  (`composer.json`). Run `composer dump-autoload` after adding/moving a class.
- Start every directly-reachable PHP file with `defined('ABSPATH') || exit;`.
- Shared helpers live in `includes/Shared/functions.php`, prefixed `mxsfwn…`
  (`mxsfwnView`, `mxsfwnRequireFrontendComponent`, …). `TasksManager.php` is the
  shared store backing the Tasks REST routes and the React app.

## Naming

Keep the plugin's own identifiers consistent everywhere: PHP constants
`MXSFWN_PLUGIN_*`, namespace root `MXSFWNWPPGNext\`, lowercase prefix `mxsfwn`
(shared helpers, asset handles, block names/category), and text domain
`wpp-generator-next`. Don't introduce a second prefix.

## Verify

```bash
composer dump-autoload   # after adding/moving PHP classes
npm run build            # rebuild JS/CSS before testing
```
Activate the plugin in a local WordPress install: activation should run
the table migration without PHP notices in `debug.log`, and the plugin should
deactivate/reactivate cleanly.
