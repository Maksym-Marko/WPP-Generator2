---
paths:
  - "includes/Admin/Utilities/MetaBoxGenerator.php"
  - "includes/Admin/Entities/MetaBox.php"
  - "includes/Admin/views/meta-boxes/**"
  - "src/admin/meta-box-image-upload/**"
---

# Meta boxes

Read this before adding or editing a post meta box or its field UI.

## Where to start

- `MetaBoxGenerator::addPageMetaBoxes()` (invoked from `Admin\AdminSoul`)
  registers the example meta boxes.
- `Admin\Entities\MetaBox` builds each box; `MetaBox::setPostMetaKey()` namespaces
  keys as `_mxsfwn…` (the REST layer only accepts keys in that namespace — see
  `sanitizePluginMetaKey()`).
- Typed field views live in `includes/Admin/views/meta-boxes/` (`text`,
  `textarea`, `checkbox`, `email`, `float`, `int`, `radio`, `select`, `url`,
  `image`, `404`).

## Pattern to follow

- For a plain field, add a box via `MetaBoxGenerator` pointing at one of the
  existing typed views; copy the closest view for a new field type.
- **Image field**: the `image` view is driven by the React uploader in
  `src/admin/meta-box-image-upload/` (built by the native-js pipeline, enqueued
  in `AdminEnqueueScripts.php`). It talks to the post-meta-image REST routes
  (`Update/Get/DeletePostMetaImageRoute`) — see `.claude/rules/rest-api.md`. If
  you change the uploader JS, rebuild (`.claude/rules/frontend-build.md`).
- **Saving**: verify a nonce and `current_user_can('edit_post', $postId)` before
  writing; sanitize on input and escape the value in the view on output
  (`esc_attr`, `esc_textarea`, `esc_url`). Do not trust input sanitization to
  make output safe.

## Verify

Edit a post, confirm the box renders and the value round-trips (save → reload),
and that the image uploader reads/writes via the REST route with no console or
`debug.log` errors.
