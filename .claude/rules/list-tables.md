---
paths:
  - "includes/Admin/Utilities/Tables/**"
  - "includes/Admin/controllers/ai-robots-table/**"
  - "includes/Admin/views/ai-robots-table/**"
  - "src/admin/ai-robot-edit/**"
---

# WP_List_Table screens (AI robots example)

Read this before changing the admin list-table UI or its CRUD/bulk actions. The
table schema and seeding are separate — see `.claude/rules/database-tables.md`;
the menu wiring is in `.claude/rules/admin-pages.md`.

## Where to start

- `Admin\Utilities\Tables\RobotsTable` — the `WP_List_Table` subclass (columns,
  sortable, pagination, row actions, bulk actions, display).
- `Admin\Utilities\Tables\RobotsDataManager` — all reads/writes for the table.
- Pages and mutation actions are registered in `includes/Admin/routes.php` under
  the `ai-robots-table/*` controllers; list/edit/add views live in
  `includes/Admin/views/ai-robots-table/`.
- The robot edit screen's CSS source is `src/admin/ai-robot-edit/`, built by the
  native-js pipeline and enqueued in `AdminEnqueueScripts.php` gated on
  `page=ai-robot-edit` (see `.claude/rules/frontend-build.md`,
  `assets-enqueue.md`).

## Pattern to follow

- Mutations (`action-ai-robot-store/update/trash-restore-delete/bulk`) run early
  on `admin_init` so they can redirect with a header and `exit`. Each must:
  verify a nonce (`check_admin_referer` / `wp_verify_nonce`), re-check
  `current_user_can('manage_options')` (done in `routes.php`), sanitize input,
  and use `$wpdb->prepare()` via `RobotsDataManager`.
- Redirect with `wp_safe_redirect(wp_validate_redirect($url, $fallback)); exit;`.
- **Escape every column value on output** (`esc_html`, `esc_url`,
  `esc_attr`) — treat the shipped example as a structure reference and audit its
  escaping, not a security baseline.

## Verify

Open **AI robots** in the admin menu; exercise add / edit / trash / restore /
delete / bulk actions and confirm each redirects correctly, respects the nonce,
and leaves no PHP notices in `debug.log`.
