---
paths:
  - "src/frontend/react-js/**"
---

# Bundled React app (frontend shortcode)

Read this before changing the in-page React app. It is a separate concern from
the Next.js headless app (`.claude/rules/nextjs-headless.md`) — this one is a
WordPress-embedded SPA mounted by a shortcode.

## Where to start

Source: `src/frontend/react-js/` (entry `index.js`). Stack: React 18 +
`react-router-dom` + Redux Toolkit + axios. Layout:

- `pages/` (`Home`, `Bin`, `NotFound`), `router/`, `components/`
  (`DefaultLayout`, `Navigation`, `FlashMessages`, `SaveTasks`, …).
- `store/` with `slices/taskList` and `slices/notify`.
- `services/API.js` + `services/TaskList.js` — call the plugin REST routes.
- Styles: `assets/css/main.scss` (imported from `index.js` → emitted to
  `build/frontend/react-js/index.css`).

## How it reaches the page

- Mounted via the `[react_js_app_short_code]` shortcode
  (`.claude/rules/shortcodes.md`); the mount markup is
  `includes/Frontend/components/shortcode-react-js-app.php`.
- The bundle + CSS + Font Awesome + Tailwind are enqueued in
  `WPEnqueueScripts.php` (`.claude/rules/assets-enqueue.md`); the localized
  `mxsfwnReactJsLocalizer` provides the REST `nonce` and `ajaxURL`.
- Data comes from the TasksManager REST routes (`.claude/rules/rest-api.md`),
  backed by `includes/Shared/TasksManager.php`.

## Build & verify

Edit source under `src/frontend/react-js/`, then
`npm run native-js:build` (or `npm run start`) — see
`.claude/rules/frontend-build.md`. Put `[react_js_app_short_code]` on a page and
confirm the app mounts, routes, and reads/writes tasks via REST with no console
errors.
