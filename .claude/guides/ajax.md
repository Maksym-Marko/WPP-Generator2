# AJAX (admin-ajax) — manual guide

This guide is **manual-only** (it lives outside `.claude/rules/` so it does not
auto-load). Open it when a task calls for a classic `admin-ajax.php` endpoint.

## Status in this template (verified)

There is **no server-side AJAX handler** in this codebase — no
`add_action('wp_ajax_…')` / `wp_ajax_nopriv_…` anywhere. The only AJAX-related
wiring is that `includes/Frontend/Utilities/WPEnqueueScripts.php` localizes
`ajaxURL => admin_url('admin-ajax.php')` (plus a `wp_rest` nonce) onto
`mxsfwnReactJsLocalizer`, but nothing consumes it server-side.

**For new request/response work, prefer the REST layer that this template
already implements** — `.claude/rules/rest-api.md`. It gives you a base class,
namespacing, nonce verification, and permission callbacks. Only reach for
admin-ajax if you specifically need it (e.g. integrating with code that expects
an `action` on `admin-ajax.php`).

## If you must add an admin-ajax endpoint

No example exists to copy, so follow the standard WordPress pattern and wire it
through the appropriate soul (`Admin\AdminSoul` for admin-only,
`Frontend\FrontendSoul` for logged-out-capable):

```php
add_action('wp_ajax_mxsfwn_do_thing',        [$this, 'handleThing']); // logged in
add_action('wp_ajax_nopriv_mxsfwn_do_thing', [$this, 'handleThing']); // logged out (only if intended)

public function handleThing(): void
{
    check_ajax_referer('wp_rest', 'nonce');        // reuse the localized nonce, or its own action
    if (!current_user_can('manage_options')) {
        wp_send_json_error(['message' => 'forbidden'], 403);
    }
    // validate + sanitize $_POST, do the work, then:
    wp_send_json_success($payload);                 // or wp_send_json_error(...)
}
```

- Prefix the `action` name with `mxsfwn` to avoid collisions.
- From JS, POST to the localized `mxsfwnReactJsLocalizer.ajaxURL` with the
  `action` and `nonce` fields.
- Same security rules as everywhere: nonce + capability + input sanitization +
  output escaping (`.claude/rules/rest-api.md` and the root `CLAUDE.md` security
  section).

## Verify

With the handler added, POST to `admin-ajax.php?action=mxsfwn_do_thing` (with a
valid nonce) and confirm the JSON response, the nonce/capability rejection path,
and no `debug.log` notices.
