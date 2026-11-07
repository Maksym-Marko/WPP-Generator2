---
paths:
  - "includes/Activate/**"
---

# Custom database tables & migrations

Read this before creating or altering a custom `$wpdb` table or its seed data.
The list-table UI that displays this data has its own rule —
`.claude/rules/list-tables.md`.

## Where to start

Schema work runs on activation, from `includes/Activator.php` →
`AIRobotsDataTableMigration` (`includes/Activate/`):

- `CreateDataTableManager` / `CreateDataTable` — a small fluent schema builder
  (`->varchar(...)->longText(...)->datetime(...)->createTable()`). It creates
  `{$wpdb->prefix}ai_robots`.
- `AIRobotsDataTableMigration::create()` defines columns; `->seed()` inserts demo
  rows from `includes/Activate/seeder/ai-robots.php`, guarded by `tableExists()`
  and `tableIsEmpty()`.

## Pattern to follow

- Add a new migration class in `includes/Activate/` mirroring
  `AIRobotsDataTableMigration`, and call it from `Activator::createTables()`.
- Make creation idempotent (the builder uses `dbDelta`-style create; keep the
  `tableExists()`/`tableIsEmpty()` guards on seeding).
- Every dynamic query goes through `$wpdb->prepare()`. For column / table /
  `ORDER BY` names (which `prepare` cannot bind) **whitelist** against a known
  list — never interpolate request values into SQL.
- Add matching teardown (drop table / delete option) to `includes/Uninstall.php`.

## Verify

Deactivate + reactivate the plugin, then confirm the table exists and is seeded:
`wp db query "SHOW TABLES LIKE '%ai_robots'"` (or via phpMyAdmin), with no
`debug.log` errors.
