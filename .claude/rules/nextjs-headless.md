---
paths:
  - "next-js/**"
  - "includes/Features/API/Routes/NextJS/**"
---

# Next.js headless app & its WordPress integration

Read this before working on the bundled headless frontend (`next-js/`) or the
WordPress REST routes that feed it. The route base class and general REST
conventions are in `.claude/rules/rest-api.md`.

## Two sides

**WordPress side** — public REST routes under
`includes/Features/API/Routes/NextJS/` (registered in
`includes/Features/API/init.php`, namespace `wpp-generator/v1`). Each overrides
`checkPermissions()` to `return true` (intentionally public reads):

- `GetAllPagesRoute` → `GET /pages`
- `GetPageBySlugRoute` → `GET /pages/<slug>`
- `GetMenuItemsRoute` → `GET /menu-items/<id>`
- `GetStylesRoute` → global styles

`GetPageBySlugRoute` returns rendered Gutenberg content via
`apply_filters('the_content', …)`, so block markup renders in the headless app.

**Next.js side** — a standard App Router project in `next-js/` (its own
`package.json`; `next.config.mjs` is empty/default).

```bash
cd next-js
npm install
npm run dev        # http://localhost:3000   (also: build, start, lint)
```

## Environment (verified — `next-js/example.env`)

Copy `example.env` → `.env` and set:

- `REACT_APP_API_BASE_URL` — WordPress origin (e.g. `http://wpp-generator.local/`)
- `MAIN_MENU_ID` — menu id passed to `/menu-items/<id>`
- `HOME_PAGE_SLUG` — slug resolved on the home route (default `home`)

## How it consumes WordPress

- `app/services/API.js` builds `${REACT_APP_API_BASE_URL}/wp-json/wpp-generator/v1`
  and fetches with `credentials: 'same-origin'`.
- `pageService.js` → `/pages`, `/pages/<id>`; `menuService.js` → `/menu-items/<id>`;
  `globalStyleService.js` → styles.
- Routing: `app/page.js` (home), `app/[id]/page.jsx` (page by slug),
  `app/blog/…`; navigation is driven by `MAIN_MENU_ID`; Gutenberg content from
  `page.content` is injected as HTML.

## Verify

Run WordPress + `npm run dev`, then confirm the home page, a page-by-slug, and
the menu load from the REST routes, and that block content renders. If a route
changes, re-check it with `curl /wp-json/wpp-generator/v1/pages`.
