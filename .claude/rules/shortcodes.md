---
paths:
  - "includes/Frontend/Utilities/ShortCodeGenerator.php"
  - "includes/Frontend/components/**"
---

# Shortcodes

Read this before adding or editing a shortcode.

## Where to start

`includes/Frontend/Utilities/ShortCodeGenerator.php` (constructed from
`Frontend\FrontendSoul`) registers shortcodes. The shipped example
`[react_js_app_short_code]` buffers a frontend component and returns it:

```php
add_shortcode('react_js_app_short_code', function () {
    ob_start();
    mxsfwnRequireFrontendComponent('shortcode-react-js-app');
    return ob_get_clean();
});
```

## Pattern to follow

- Add a method to `ShortCodeGenerator` and call it from the constructor; one
  method per shortcode.
- Markup templates go in `includes/Frontend/components/` and are pulled in with
  `mxsfwnRequireFrontendComponent('name')` (resolves
  `includes/Frontend/components/name.php`).
- A shortcode callback must **return** its output (buffer with `ob_start()` /
  `ob_get_clean()`), never echo.
- Sanitize attributes with `shortcode_atts()` + per-field sanitizers, and escape
  everything you print.
- The React-app shortcode only outputs the mount point; the bundle itself is
  enqueued in `WPEnqueueScripts.php` (see `.claude/rules/assets-enqueue.md` and
  `react-app.md`).

## Verify

Place the shortcode on a page and confirm it renders (and, for the React
shortcode, that the app mounts) with no `debug.log` or console errors.
