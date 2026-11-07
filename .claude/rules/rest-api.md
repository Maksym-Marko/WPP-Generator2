---
paths:
  - "includes/Features/API/AbstractClasses/**"
  - "includes/Features/API/Interfaces/**"
  - "includes/Features/API/init.php"
  - "includes/Features/API/Routes/*.php"
  - "includes/Features/API/Routes/TasksManager/**"
---

# REST API endpoints

Read this before adding or editing a REST route. The public Next.js routes under
`Routes/NextJS/` are covered by `.claude/rules/nextjs-headless.md` but follow the
same base class described here.

## Where to start

- Base class: `includes/Features/API/AbstractClasses/AbstractRestRouteHandler.php`
  (namespace `wpp-generator/v1`; default `methods` `POST`; default
  `permission_callback` = `checkPermissions()` → `current_user_can('manage_options')`;
  nonce action `wp_rest` via the `X-WP-Nonce` header).
- Registration: every route instance is listed in
  `includes/Features/API/init.php` and registered on `rest_api_init` (hooked from
  `Features\FeaturesSoul`).
- Examples: `Update/Get/DeletePostMetaImageRoute` (post-meta image, used by the
  meta-box uploader) and `TasksManager/GetTaskListRoute` + `UpdateTaskListRoute`
  (used by the React app, backed by `includes/Shared/TasksManager.php`).

## Pattern to follow

```php
class MyRoute extends AbstractRestRouteHandler {
    protected $route   = '/my-thing/(?P<id>\d+)';
    protected $methods = 'GET';
    public function handleRequest($request): WP_REST_Response { /* ... */ }
}
```
Then add `new MyRoute` to the `$routes` array in `init.php`.

- Consumed at `/wp-json/wpp-generator/v1/<route>`.
- Override `checkPermissions()` only when you intend a different gate. Returning
  `true` makes the route **fully public** — use it only for intentionally public
  reads (that is how the Next.js routes expose content).
- For writes, call `verifyNonce($request)` and the right `current_user_can`
  check. Restrict post-meta writes with `sanitizePluginMetaKey()` (only
  `_mxsfwn…` keys). Sanitize path params (`sanitize_title`, `absint`) and escape
  strings placed in the response.

## Verify

Hit the route: `curl /wp-json/wpp-generator/v1/<route>` for public reads; for
protected routes confirm it rejects without a valid `X-WP-Nonce`/capability and
succeeds with one. Check `debug.log` for notices.
