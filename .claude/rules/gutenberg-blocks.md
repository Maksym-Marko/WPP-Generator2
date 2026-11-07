---
paths:
  - "src/gutenberg/index.js"
  - "src/gutenberg/counter-item/**"
  - "src/gutenberg/image-cards/**"
  - "src/gutenberg/image-cards-item/**"
  - "src/gutenberg/review-box/**"
  - "src/gutenberg/slider/**"
  - "src/gutenberg/ssr-simple/**"
  - "includes/Features/Gutenberg/**"
---

# Creating & maintaining custom Gutenberg blocks

Read this before adding or editing a custom block. **Extending an existing
(core) block** with metadata/filters is a different workflow —
`.claude/rules/gutenberg-extend-blocks.md`.

## Where to start

- Source: one folder per block in `src/gutenberg/<name>/` with `block.json`,
  `index.js`, `edit.js`, `save.js`, optional `style.css` / `editor.css`.
- Each block is pulled into the build by an import in `src/gutenberg/index.js`.
- PHP registrar: `includes/Features/Gutenberg/CustomBlocks.php` (constructed from
  `Features\FeaturesSoul`) globs `src/gutenberg/*/block.json` on `init` and calls
  `register_block_type_from_metadata()`. It also adds the `mxsfwn-wppgnext` block
  category and enqueues `build/blocks/blocks.js` + `style-blocks.css` in the
  editor.

## block.json conventions (keep the prefix)

- `"name": "mxsfwn/<slug>"`, `"category": "mxsfwn-wppgnext"`,
  `"textdomain": "wpp-generator-next"`. These prefixes are rewritten by the
  converter — do not change their spelling.

## Patterns by block type (copy the closest example)

- **Static block** (editor `edit.js` + serialized `save.js`): `counter-item`.
- **Nested / parent-child blocks** (`InnerBlocks`, `parent`/`allowedBlocks`):
  `image-cards` (parent) + `image-cards-item` (child); `review-box`.
- **Frontend interactivity** (`viewScript` / `view.js`): `slider`.
- **Dynamic / server-side rendered**: `ssr-simple` — add
  `"render": "file:./render.php"` to `block.json` and render in `render.php`
  (`$attributes` is in scope). Wrap output with
  `get_block_wrapper_attributes()` and **escape every attribute you print**
  (`esc_html`, `esc_attr`, `esc_url`).

## Build & verify

`npm run gutenberg-js:build` (or `npm run start`) → `build/blocks/*` — see
`.claude/rules/frontend-build.md`. In the editor, confirm the block appears under
the **WPPG Next** category, saves/loads without a validation (block recovery)
error, and renders correctly on the frontend (for SSR, confirm `render.php`
output). Check `debug.log`.
