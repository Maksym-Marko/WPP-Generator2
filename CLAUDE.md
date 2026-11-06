# CLAUDE.md — WPPG-NEXT base template

This file is for Claude (and developers) **maintaining this repository itself**.
If you are working inside a *generated* plugin, read `example.CLAUDE.md` instead.

## What this repository is

This is the **reusable WordPress plugin starter template** consumed by the
**WPPG-NEXT converter** (https://wppg-next.markomaksym.com.ua/). The converter
takes this code as its source, swaps a fixed set of placeholder tokens for a
user's plugin name / prefix / author details, and emits a ready-to-use plugin
zip. Everything here is meant to be reused as starter features — **preserve the
features**; do not delete working examples (custom table, REST, Gutenberg
blocks, React app, meta boxes, Next.js headless endpoints) when maintaining.

The converter lives (locally) one directory up at
`../wpp-generator-next-wrapper/`. Its source of truth is `raw-wppg-code/`
(a checkout of this repo); the admin "Regenerate Plugin input" button runs it.

## ⚠️ Placeholder protection rule (read before any rename)

The converter does **blind, case-sensitive `str_replace` on file contents and on
file/dir paths**. Any occurrence of these exact tokens — even inside a larger
identifier — is replaced. They must keep their **exact spelling, casing,
punctuation, and location**. Before changing, moving, renaming, or removing any
occurrence, **stop and ask the user**, showing the exact value, file, proposed
change, and converter impact. Continue unrelated work while waiting.

Verified replacement map (converter stage 1 =
`../wpp-generator-next-wrapper/includes/admin/classes/MxGeneratePluginInput.php`;
stage 2 = `.../includes/frontend/classes/MxGeneratePluginStructure.php`):

| Exact token in this repo | Becomes (final plugin) | Where it appears |
|---|---|---|
| `MXSFWN` | unique prefix, UPPERCASE | PHP constants (`MXSFWN_PLUGIN_*`), namespace root `MXSFWNWPPGNext`, composer PSR-4 |
| `mxsfwn` | unique prefix, lowercase | `MXSFWN_PLUGIN_UNIQUE_STRING` value, block names (`mxsfwn/…`), block category, handles, composer name |
| `This Plugin Name` | plugin display name | `wpp-generator-next.php` header, `readme.txt` title |
| `This Plugin Author` | author name | `wpp-generator-next.php` header |
| `wpp-generator-next` | text domain / main file / folder slug | text domain everywhere, `wpp-generator-next.php` filename, paths, `block.json` `textdomain` |
| `_markomaksym_` | contributors | `readme.txt` `Contributors:` line (underscores, not asterisks) |
| `Brief description` | short description | plugin header, `readme.txt` |
| `Long description` | long description | plugin header, `readme.txt` |
| `https://markomaksym.com.ua/wp-plugin-skeleton-generator/` | Plugin URI | plugin header |
| `https://github.com/Maksym-Marko` | Author URI | plugin header |

Notes verified in converter code:
- The main filename `wpp-generator-next.php` is renamed to `<text-domain>.php`; any
  `wpp-generator-next` segment in a path becomes the plugin folder slug.
- Excluded from generation: `.git`, `.gitignore`, `package-lock.json`,
  `composer.lock`. Only files whose name contains a known extension
  (`.php .js .jsx .json .css .scss .txt .md .vue .mjs .config .po .mo .pot
  .gitignore .env` + image/font types + `.cursorrules`) are processed; files
  with no matching extension are **not copied** into generated plugins.
- Because replacement is substring-based, do **not** introduce new strings that
  contain `mxsfwn`/`MXSFWN`/`wpp-generator-next` as a coincidental substring
  unless you intend them to be rewritten.

## Entry points & bootstrap (verified)

- `wpp-generator-next.php:1` — main plugin file. Declares the header, guards with
  `defined('ABSPATH') || exit`, defines constants (`MXSFWN_PLUGIN_VERSION` =
  `time()` — **set to a static version before shipping**, `…_UNIQUE_STRING` =
  `mxsfwn`, `…_PATH/_URL/_BASE_NAME/_ABS_PATH`), then, only if `PHP >= 8.4`,
  requires `vendor/autoload.php`, `includes/Shared/functions.php`, `install.php`,
  and `index.php`.
- `index.php:1` — instantiates `MXSFWNWPPGNext\WppGenerator` and loads the text
  domain on `plugins_loaded`.
- `install.php:1` — registers activation (`Activator::init`) and deactivation
  (`Deactivator::init`) hooks against `MXSFWN_PLUGIN_BASE_NAME`.
- `uninstall.php:1` — runs `Uninstall::init()` (currently just
  `delete_option('mxsfwn_rewrite_rules')`).
- Autoloading: Composer PSR-4 `MXSFWNWPPGNext\` → `includes/`
  (`composer.json:6`, `vendor/composer/autoload_psr4.php`).

## How the starter features are wired ("souls")

`WppGenerator` (`includes/WppGenerator.php`) constructs three feature hubs; each
is the on/off switch surface for a layer:

- **`Admin\AdminSoul`** (`includes/Admin/AdminSoul.php`): admin page routing
  (`includes/Admin/routes.php` → `Admin\Router` → `Admin\Entities\AdminMenu`),
  admin asset enqueue (`Admin\Utilities\AdminEnqueueScripts`), CPT registration
  (`PostTypeGenerator::registerFrameworkPostType`), taxonomy
  (`TaxonomyGenerator::registerLanguageTaxonomy`), meta boxes
  (`MetaBoxGenerator::addPageMetaBoxes`).
- **`Frontend\FrontendSoul`** (`includes/Frontend/FrontendSoul.php`): frontend
  asset enqueue (`WPEnqueueScripts`) and shortcodes (`ShortCodeGenerator`, which
  registers `[react_js_app_short_code]`).
- **`Features\FeaturesSoul`** (`includes/Features/FeaturesSoul.php`): Gutenberg
  blocks (`Features\Gutenberg\CustomBlocks`) and REST routes
  (`includes/Features/API/init.php`, hooked on `rest_api_init`).

Supporting subsystems:
- **Admin routing**: fluent `Router->get('controller')->menuAction(...)
  ->properties([...])`; controllers live in `includes/Admin/controllers/`,
  rendered through `mxsfwnView()` from `includes/Admin/views/<name>.view.php`.
  Default page capability is `manage_options` (`AdminMenu::$properties`).
- **Custom DB table example**: `Activate\AIRobotsDataTableMigration` (+
  `CreateDataTable`/`CreateDataTableManager`, seeder in
  `includes/Activate/seeder/`) creates `{$wpdb->prefix}ai_robots` on activation;
  `Admin\Utilities\Tables\RobotsTable` (WP_List_Table display) +
  `RobotsDataManager` (writes) back the "AI robots" admin screens.
- **REST**: extend `Features\API\AbstractClasses\AbstractRestRouteHandler`
  (namespace `wpp-generator/v1`, default `permission_callback` =
  `manage_options`, nonce `wp_rest` via `X-WP-Nonce`); register the instance in
  `includes/Features/API/init.php`. Public Next.js/headless routes under
  `Routes/NextJS/` override `checkPermissions()` to return `true`.
- **Gutenberg**: `CustomBlocks::registerBlocks()` globs `src/gutenberg/*/block.json`
  and calls `register_block_type_from_metadata()`; adds a `mxsfwn-wppgnext` block
  category. Dynamic blocks use a `render.php` (e.g. `src/gutenberg/ssr-simple/`).

## Setup / build / lint / test commands (verified against this checkout)

Tooling present locally: PHP 8.4.3, Composer 2.10.3, npm 11.4.2.

```bash
composer install            # install PHP deps (none required today) + autoloader
composer dump-autoload       # regenerate PSR-4 autoloader after adding classes
npm install                  # install JS toolchain
npm run start                # parallel watch: tailwind + gutenberg + native JS
npm run build                # production build of all three bundles
```

Granular scripts (from `package.json` `scripts`):
`tailwind-css:dev` / `tailwind-css:build` (postcss → `build/css/style.css`),
`gutenberg-js:watch` / `gutenberg-js:build` (wp-scripts, `webpack.gutenberg.config.js`
→ `build/blocks/`), `native-js:watch` / `native-js:build` (webpack,
`webpack.custom.config.js` → `build/admin/*`, `build/frontend/*`,
`build/dependencies/vendors/*`). `webpack.custom.config.js` auto-discovers entries
from each subdir of `src/admin/` and `src/frontend/` (excluding `gutenberg`).

- **Lint/format**: there is **no active `npm run lint`/`format`** — those entries
  live only in the inactive `scriptsForGutenbergCompelling` block. Run directly if
  needed: `npx wp-scripts lint-js`, `npx wp-scripts lint-style`,
  `npx wp-scripts format`.
- **Tests**: **no test script exists** in `package.json`; there is no PHPUnit
  config. Do not claim a test suite without adding one.
- `node generate-structure.js` regenerates `plugin-structure.md` (docs only).

## Validating a template change

In the **base checkout**:
1. `composer dump-autoload` (if you added/moved PHP classes) and `npm run build`.
2. Confirm no placeholder token was altered:
   `grep -rn "MXSFWN\|mxsfwn\|wpp-generator-next\|This Plugin Name\|This Plugin Author\|_markomaksym_" --include=*.php --include=*.json --include=*.txt .`
   — the counts/locations should match your intent.
3. Activate the plugin in a local WordPress (this repo lives under a working WP
   install at `app/public`): check activation runs the table migration, the
   "WPPG Next" / "AI robots" admin menus appear, blocks show under the
   "WPPG Next" category, and the REST routes answer under
   `/wp-json/wpp-generator/v1/…`. **Requires a local WordPress install.**

In a **freshly generated plugin** (requires converter access): run the
converter's "Regenerate Plugin input" (see `../wpp-generator-next-wrapper/
HOW-DOES-IT-WORK.txt`), generate a plugin with a sample name/prefix, then confirm
the prefix/namespace/text-domain/filename were all rewritten consistently and the
generated plugin activates cleanly. **Requires converter + local WordPress.**

## Maintenance conventions

- Keep `defined('ABSPATH') || exit;` at the top of every directly-reachable PHP
  file. Prefer PSR-4 classes over new `require`s. Match the existing spacing and
  docblock style.
- Do not reorganize folders or rename files casually — paths containing
  `wpp-generator-next` are load-bearing for the converter. Ask before creating
  new top-level files/folders.
- When adding placeholder-bearing strings, reuse the existing tokens exactly so
  the converter rewrites them; never invent a second prefix.
- Security: validate/sanitize input, escape on output (context-specific), use
  `$wpdb->prepare()` for every dynamic query, nonces + capability checks on every
  write. Treat the existing examples as structure references and check their
  escaping yourself — several current examples under-escape (see the review notes
  that accompany this work).
