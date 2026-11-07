---
paths:
  - "includes/Admin/Utilities/AdminEnqueueScripts.php"
  - "includes/Frontend/Utilities/WPEnqueueScripts.php"
---

# Asset enqueueing & script localization

Read this before enqueuing or localizing a script/style. This rule covers *how
assets are registered with WordPress*; how the bundles are **built** lives in
`.claude/rules/frontend-build.md`. Never point an enqueue at a `src/` file —
always at the compiled `build/` output.

## Where to start

- Admin: `includes/Admin/Utilities/AdminEnqueueScripts.php` (hooks
  `admin_enqueue_scripts`), invoked from `Admin\AdminSoul`.
- Frontend: `includes/Frontend/Utilities/WPEnqueueScripts.php` (hooks
  `wp_enqueue_scripts`), invoked from `Frontend\FrontendSoul`.

## Conventions (verified)

- Handles are prefixed with `MXSFWN_PLUGIN_UNIQUE_STRING` (`mxsfwn`) and versioned
  with `MXSFWN_PLUGIN_VERSION`. URLs come from `MXSFWN_PLUGIN_URL`.
- Shared vendor bundle `mxsfwn-dependencies` → `build/dependencies/vendors/
  index.js`; declare it as a dependency of feature bundles.
- **Page-gate admin assets** on `$_GET['page']` (see the `ai-robot-edit` block)
  so you don't load a bundle on every admin screen. Gate frontend bundles to the
  pages that need them — the React app is currently enqueued on *all* frontend
  pages (`WPEnqueueScripts::scripts()`); narrow it when you can.
- **Localization**: `wp_localize_script($handle, 'mxsfwnReactJsLocalizer' / 
  'mxsfwnAdminLocalize', [...])` exposes `nonce` (`wp_create_nonce('wp_rest')`)
  and, on the frontend, `ajaxURL`. The nonce is the `X-WP-Nonce` used by the REST
  layer (`.claude/rules/rest-api.md`).
- **i18n for JS**: `wp_set_script_translations($handle, 'wpp-generator-next',
  MXSFWN_PLUGIN_ABS_PATH . 'languages')`; depend on `wp-i18n`.
- `WPEnqueueScripts::dequeueApiFetch()` preloads a 401 for `/wp/v2/users/me` for
  logged-out users to avoid a stray request — keep that behavior if you touch it.

## Verify

Load the relevant admin/frontend page, confirm (DevTools → Network) the handle
loads only where intended, the localized object is present on `window`, and the
version query-arg busts cache after a rebuild.
