---
paths:
  - "readme.txt"
  - "screenshots/**"
  - "license.txt"
---

# WordPress.org release assets

Read this before editing the plugin's directory listing, banners, icons,
screenshots, or license.

## Where things live

- **`readme.txt`** — the WordPress.org manifest (title, `Contributors:`, `Tags:`,
  `Requires at least`, `Requires PHP`, `Tested up to`, `Stable tag`, `License`,
  short/long description, `== Installation ==`, `== Screenshots ==`,
  `== Changelog ==`). Follow the WordPress.org readme spec; validate with the
  official readme validator before release.
- **`screenshots/`** — `banner-1544x500.jpg`, `banner-772x250.jpg`,
  `icon-128x128.jpg`, `icon-256x256.jpg`, `screenshot-1.jpg`, `screenshot-2.jpg`.
  Keep the exact `banner-*`, `icon-*`, `screenshot-N` naming and dimensions
  WordPress.org expects. (On .org these normally live in the SVN `assets/`
  folder, not inside the plugin zip.)
- **`license.txt`** — full GPLv2 text; the header `License`/`License URI` in
  `wpp-generator-next.php` and `readme.txt` must stay consistent with it.

## Placeholder caution

`readme.txt` carries converter tokens verbatim — `This Plugin Name`,
`_markomaksym_` (in `Contributors:`), `Brief description`, `Long description`.
**Do not alter these strings**; they are rewritten per generated plugin (see the
token table in the root `CLAUDE.md`). Edit surrounding structure only.

## Verify

Confirm screenshot numbers in `== Screenshots ==` match the files, the version /
`Stable tag` / changelog agree with the plugin header, and the readme passes the
WordPress.org validator.
