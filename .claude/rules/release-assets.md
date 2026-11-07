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

## Keep metadata consistent

The plugin name, author, Contributors, and short/long description appear in both
`readme.txt` and the header of `wpp-generator-next.php` — keep them in sync when
you change one. Likewise the `License`/`License URI` in the header, `readme.txt`,
and `license.txt` must all agree.

## Verify

Confirm screenshot numbers in `== Screenshots ==` match the files, the version /
`Stable tag` / changelog agree with the plugin header, and the readme passes the
WordPress.org validator.
