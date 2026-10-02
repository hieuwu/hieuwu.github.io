# hieuwu.github.io

Personal portfolio for **Hieu Vu**, Senior Software Engineer, Android & Kotlin Multiplatform.

React + Vite + TypeScript, styled in [Material 3 Expressive](https://m3.material.io/) with
Tailwind CSS, animated with Motion.

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

The site follows **Material 3 Expressive**: tonal colour roles, an oversized shape
scale, shape morphing, spring motion and Google Sans Flex.

- `src/styles/theme-m3.css` holds every token: M3 colour roles seeded from
  **Classic Blue `#0F4C81`** (light and dark via `light-dark()`), the shape scale up
  to 48px, elevation, and CSS `linear()` approximations of the M3 springs.
- `tailwind.config.js` maps utilities onto those roles, so classes read like the
  spec: `bg-primary-container text-on-primary-container`, `bg-surface-low`,
  `rounded-2xl`, `ease-spring`.
- `src/styles/index.css` defines the M3 components as classes: `.btn` (+
  `btn-filled` / `btn-tonal` / `btn-outlined` / `btn-text`, sizes `btn-sm`…`btn-xl`;
  buttons square up when pressed), `.icon-btn`, `.chip`, `.card`.
- `src/components/ui/shapes.ts` is the shape library (cookie, flower, clover,
  sunny, burst, squircle) as `clip-path: polygon()` strings sampled at the same
  angles, so any two shapes morph into each other. `<Shape name hover>` morphs on
  hover in pure CSS; `<MorphLoop>` cycles shapes like the M3 loading indicator.

Light is the default theme; the toggle stores `dark` in `localStorage` and flips
`data-theme` on `<html>`. Astryx is still used for its CSS reset only.

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
