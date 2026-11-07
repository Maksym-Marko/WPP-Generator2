---
paths:
  - "src/gutenberg/highlight-extending/**"
---

# Extending existing blocks with metadata

Read this before adding attributes, inspector controls, or wrapper classes to an
existing (core) block. Authoring a brand-new block is a different workflow —
`.claude/rules/gutenberg-blocks.md`.

## Where to start

Example: `src/gutenberg/highlight-extending/` — a `block.json` + `index.js` with
**no `save.js`** (it mutates an existing block instead of registering a new one).
It is built and enqueued by the same pipeline/registrar as the other blocks
(`includes/Features/Gutenberg/CustomBlocks.php`; build with
`npm run gutenberg-js:build`).

## Pattern to follow (verified in the example)

The extension registers JS filters only, gated to a target block
(`core/paragraph`):

- `blocks.registerBlockType` — add a new attribute (e.g. `extendedSettings`).
- `editor.BlockEdit` (via `createHigherOrderComponent`) — add `InspectorControls`
  / `PanelBody` / `SelectControl` for the new attribute.
- `editor.BlockListBlock` — reflect the choice in the editor preview.
- `blocks.getSaveContent.extraProps` — add the class to the saved frontend
  markup.

Filter namespaces use the `mxsfwn/…` prefix (e.g.
`mxsfwn/extending/add-attributes`) and labels use `metadata.textdomain` — keep
the prefix/text domain intact (the converter rewrites them).

## Build & verify

`npm run gutenberg-js:build`. In the editor, select the target core block,
confirm the new control appears, pick a value, and verify the class is present
both in the editor preview and in the saved frontend HTML. Re-opening the saved
post must not trigger block recovery.
