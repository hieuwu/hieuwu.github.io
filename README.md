# hieuwu.github.io

Personal portfolio for **Hieu Vu**, Senior Software Engineer, Android & Kotlin Multiplatform.

React + Vite + TypeScript, styled with [Astryx](https://astryx.atmeta.com/) design tokens
and Tailwind CSS, animated with Motion.

## Running it

```bash
npm install
npm run dev
```

| Script                   | What it does                                       |
| ------------------------ | -------------------------------------------------- |
| `npm run dev`            | Dev server on :5173                                |
| `npm run build`          | Typecheck, then build to `dist/`                   |
| `npm run preview`        | Serve the production build locally                 |
| `npm run typecheck`      | Types only                                         |
| `npm run optimize:shots` | Regenerate WebP derivatives of the app screenshots |

## Editing the content

Everything user-facing lives in `src/content/`. The components read from there, so
you shouldn't need to touch JSX to update the site.

| File             | Holds                                                             |
| ---------------- | ----------------------------------------------------------------- |
| `site.ts`        | Name, role, specialty, bio, social links, nav items                |
| `skills.ts`      | Skill groups; `featured` entries get the accent treatment          |
| `projects.ts`    | App showcases: copy, bullets, brand colour, screenshots            |
| `openSource.ts`  | Repos and merged contributions                                     |
| `blog.ts`        | Article list                                                       |
| `experience.ts`  | Roles, newest first; `products` is the only required detail        |
| `collaborate.ts` | "Work with me" offers and CTAs                                     |

### Adding app screenshots

Originals live in `screenshots/` (**not** deployed); the site serves WebP derivatives
from `public/assets/showcases/`. Vite copies `public/` verbatim, so keeping the 27 MB
of raw captures out of it is what keeps `dist/` at ~3 MB.

1. Drop the captures in `screenshots/<project>/<ios|android>/`.
2. Run `npm run optimize:shots`. It writes
   `public/assets/showcases/<project>/<ios|android>/<name>.webp` and prints each
   output's path and pixel dimensions.
3. Reference that path in `projects.ts` along with the printed `w` and `h`. Those two
   are required: the floating phone pair has no intrinsic width without them, so the
   images would never come into view to load.

### Experience entries

Each role needs a company, a period and a `products` list. `title`, `summary`,
`points` and `stack` are optional and render only when present, so a role can stay
as just the products it covered.

## Design system

The site uses Astryx as its token layer rather than its component library:

- `@astryxdesign/core/reset.css` for the reset (Tailwind Preflight is disabled)
- `@astryxdesign/theme-neutral/theme.css` for the base semantic tokens
- `src/styles/theme-ocean.css`, a **custom Astryx theme**: the same token names
  repointed at this palette, plus a marketing-scale type ramp
- `tailwind.config.js`, which maps every Tailwind utility onto an Astryx custom
  property, so `bg-card`, `text-secondary`, `rounded-container` etc. follow the theme

Light and dark resolve through CSS `light-dark()` + `color-scheme`; the toggle only
flips `data-theme` on `<html>`.

**Palette**: deep twilight `#03045e`, bright teal blue `#0077b6`, turquoise surf
`#00b4d8`, frosted blue `#90e0ef`, light cyan `#caf0f8`. Dark mode sits on
navy-tinted near-blacks; light mode on cyan-tinted paper.

**Layout** takes its rhythm from [wise.com](https://wise.com): oversized extra-bold
headings, and one or two sections rendered as solid full-bleed colour blocks
(`<Section tone="deep">`) instead of every section looking the same.

Decoration is three flat layers, no gradient fills and no grid overlays: soft
colour fields (blurred solid discs), thin outline rings, and oversized faded brand
marks. `.shape` and `.watermark` in `src/styles/index.css` are the two helpers;
watermark strength is `--watermark-opacity`, set per colour scheme in the theme
(it can't go through `light-dark()`, which only resolves to colours).

Each project showcase overrides the accent with colours taken from that app's own
theme file, so a card looks like the product it advertises.

Brand marks in `src/components/ui/brandMarks.ts` are extracted from
[simple-icons](https://simpleicons.org/); the logos are trademarks of their owners.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds and publishes
`dist/` to GitHub Pages.

> **One-time setup:** in the repository's _Settings → Pages_, set **Source** to
> **GitHub Actions**. The old site served files straight from the branch root; the
> build output now lives in `dist/`, so branch-based serving won't work.

The previous Bootstrap site is kept in `_archive-old-site/` for reference.
