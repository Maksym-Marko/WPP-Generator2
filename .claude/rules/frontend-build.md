---
paths:
  - "webpack.custom.config.js"
  - "webpack.gutenberg.config.js"
  - "postcss.config.js"
  - "tailwind.config.js"
  - "package.json"
  - "assets/css/**"
---

# Frontend build pipelines & Tailwind

Read this before editing any CSS/JS build config, adding a bundle, or working on
Tailwind. **Never hand-edit `build/`** — it is compiled output and is
overwritten on the next build. Edit sources in `src/` / `assets/` and recompile.

## Three pipelines (verified in `package.json`)

| Source (edit) | Config to read first | Command | Output (enqueue this) |
|---|---|---|---|
| `assets/css/style.css` + Tailwind classes in `src/**` | `postcss.config.js`, `tailwind.config.js` | `npm run tailwind-css:build` | `build/css/style.css` |
| `src/admin/<feature>/`, `src/frontend/<feature>/` | **`webpack.custom.config.js`** | `npm run native-js:build` | `build/admin/*`, `build/frontend/*`, `build/dependencies/vendors/*` |
| `src/gutenberg/<name>/` | `webpack.gutenberg.config.js` | `npm run gutenberg-js:build` | `build/blocks/*` |

`npm run start` runs all three in watch mode; `npm run build` does a production
build of all three. (The `scriptsFor*Compelling` blocks in `package.json` are
inactive alternates — ignore them.)

## native-js auto-discovery (important)

`webpack.custom.config.js` creates **one entry per subdirectory** of `src/admin/`
and `src/frontend/` (excluding `gutenberg`); each subfolder needs an `index.js`.
SCSS becomes `build/<area>/<feature>/index.css` **only if imported from that
`index.js`** (`MiniCssExtractPlugin`). Aliases: `@admin`, `@frontend`,
`@reactJs`. Shared vendor code is split into `build/dependencies/vendors/`.

To add page-specific CSS/JS: create `src/<area>/<feature>/index.js` (copy
`src/admin/meta-box-image-upload/`), import its SCSS, build, then enqueue the
compiled file in the right enqueuer gated on `$_GET['page']` — see
`.claude/rules/assets-enqueue.md`.

## Tailwind caveat

`tailwind.config.js` `content` scans only `src/**`, **not** `includes/**`. Utility
classes written in `includes/` views are **not** generated — write real CSS rules
(via a `src/` entry) or add the view path to `content`.

## Related

Gutenberg block authoring: `.claude/rules/gutenberg-blocks.md`. The React app
bundle: `.claude/rules/react-app.md`.

## Lint / test

No active `lint`/`format`/`test` npm scripts and no PHPUnit config. Lint on
demand: `npx wp-scripts lint-js`, `npx wp-scripts lint-style`,
`npx wp-scripts format`.
