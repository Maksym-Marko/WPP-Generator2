---
paths:
  - "includes/Admin/Utilities/PostTypeGenerator.php"
  - "includes/Admin/Utilities/TaxonomyGenerator.php"
  - "includes/Admin/Entities/PostType.php"
  - "includes/Admin/Entities/Taxonomy.php"
---

# Custom post types & taxonomies

Read this before registering or editing a CPT or taxonomy.

## Where to start

Both are registered from `includes/Admin/AdminSoul.php`:

- `PostTypeGenerator::registerFrameworkPostType()` — CPT example.
- `TaxonomyGenerator::registerLanguageTaxonomy()` — taxonomy example.

The generators build their args through the `Admin\Entities\PostType` and
`Admin\Entities\Taxonomy` value objects.

## Pattern to follow

- Add a new method on the matching generator (one per post type / taxonomy),
  mirroring the existing `registerFrameworkPostType` / `registerLanguageTaxonomy`
  shape, and call it from `AdminSoul`.
- Keep all user-facing labels wrapped in `__()/_e()` with the `wpp-generator-next`
  text domain.
- Register on the `init` hook (the generators already do this). Flush rewrite
  rules only on activation, never on every request.

## Verify

Activate, confirm the post type / taxonomy appears in the admin menu and in
`GET /wp-json/wp/v2/types`, and that no PHP notices appear in `debug.log`.
