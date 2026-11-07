# Feature inventory — what this starter kit ships

This guide is **manual-only** (it lives outside `.claude/rules/` so it does not
auto-load). Open it when the user asks "what can WPPG do?", "what features are
included?", or wants an overview before picking where to work. Each group links
to the rule that covers the working code; open that rule before changing a
feature.

Everything below is a **working example** unless it is listed under *Extension
patterns*. Treat the examples as structure references and audit their escaping
before copying (see the security section in the root `CLAUDE.md`).

## Admin & data

- **Admin menus & page routing** — a fluent router (`includes/Admin/routes.php`)
  with top-level, submenu, options, and hidden-menu examples (`main`, `sub-menu`,
  `settings-menu`, `hidden-menu`). Controllers render `.view.php` views via
  `mxsfwnView()`. See [admin-pages](../rules/admin-pages.md).
- **Custom post type & taxonomy** — registered via `PostTypeGenerator` /
  `TaxonomyGenerator`. See
  [post-types-taxonomies](../rules/post-types-taxonomies.md).
- **Meta boxes** — typed field views under `includes/Admin/views/meta-boxes/`,
  including an **image uploader** backed by a REST route and the
  `src/admin/meta-box-image-upload/` bundle. See
  [meta-boxes](../rules/meta-boxes.md).
- **Custom database table + list-table UI** — the "AI robots" example: a
  `{$wpdb->prefix}ai_robots` table created by an activation migration
  (`includes/Activate/`), with a full `WP_List_Table` CRUD + bulk-actions admin
  screen. See [database-tables](../rules/database-tables.md) and
  [list-tables](../rules/list-tables.md).

## Frontend tooling

- **Shortcodes** — registered in
  `includes/Frontend/Utilities/ShortCodeGenerator.php`, including
  `[react_js_app_short_code]` which mounts the React app. See
  [shortcodes](../rules/shortcodes.md).
- **Asset enqueueing & localization** — admin bundles in
  `AdminEnqueueScripts.php`, frontend bundles (React app, Font Awesome, Tailwind)
  in `WPEnqueueScripts.php`; handles prefixed with `mxsfwn` and versioned by
  `MXSFWN_PLUGIN_VERSION`. See [assets-enqueue](../rules/assets-enqueue.md).
- **Build pipelines** — three pipelines (Tailwind/PostCSS, native-JS webpack with
  per-folder auto-discovery, and `@wordpress/scripts` for blocks), driven by
  `npm run start` (watch) / `npm run build`. See
  [frontend-build](../rules/frontend-build.md).
- **Bundled React SPA** — an in-page app (React 18 + react-router + Redux Toolkit
  + axios) in `src/frontend/react-js/`, mounted by the shortcode and talking to
  the TasksManager REST routes. See [react-app](../rules/react-app.md).

## Gutenberg

- **Custom blocks** — one folder per block in `src/gutenberg/`, auto-registered by
  `CustomBlocks.php`. Examples cover static (`counter-item`), nested parent/child
  (`image-cards` + `image-cards-item`, `review-box`), frontend-interactive
  (`slider`), and server-side-rendered (`ssr-simple`) blocks. See
  [gutenberg-blocks](../rules/gutenberg-blocks.md).
- **Extending an existing block** — `highlight-extending` adds attributes +
  inspector controls to `core/paragraph` via JS filters (no `save.js`). See
  [gutenberg-extend-blocks](../rules/gutenberg-extend-blocks.md).

## REST API

- A base class (`AbstractRestRouteHandler`, namespace `wpp-generator/v1`, nonce via
  `X-WP-Nonce`, capability gate in `checkPermissions()`), with routes registered in
  `includes/Features/API/init.php`. Working routes: the post-meta image
  get/update/delete routes (used by the meta-box uploader) and the TasksManager
  routes (used by the React app). Consumed at `/wp-json/wpp-generator/v1/…`. See
  [rest-api](../rules/rest-api.md).

## Next.js headless frontend

- A standalone App Router app in `next-js/` (its own `package.json`) that renders
  WordPress content through public REST routes under
  `includes/Features/API/Routes/NextJS/` — all pages, a page by slug (with
  rendered Gutenberg content), menu items, and global styles. See
  [nextjs-headless](../rules/nextjs-headless.md).

## Extension patterns (documented, not pre-built)

- **AJAX (`admin-ajax.php`)** — there is **no** server-side AJAX handler in this
  plugin (no `wp_ajax_*` actions). The only AJAX wiring is that
  `WPEnqueueScripts.php` localizes `ajaxURL` + a `wp_rest` nonce onto
  `mxsfwnReactJsLocalizer`; nothing consumes it server-side. Prefer the REST layer
  for new request/response work; if you specifically need admin-ajax, follow
  [the AJAX guide](ajax.md).
