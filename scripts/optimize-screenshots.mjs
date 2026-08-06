/**
 * Screenshot optimiser.
 *
 * Device captures come out of the simulators at ~1500px wide and 1–2 MB each.
 * On the site they never render wider than ~240 CSS px, so this writes a WebP
 * derivative of every source at a sensible display size.
 *
 *   screenshots/<project>/<ios|android>/name.png     ← source, not deployed
 *   public/assets/showcases/<project>/<ios|android>/name.webp  ← served
 *
 * Keeping the originals outside public/ matters: Vite copies public/ verbatim,
 * so leaving them there put 27 MB of unused PNGs in every deploy.
 *
 *   npm run optimize:shots            # only what's missing or out of date
 *   npm run optimize:shots -- --force # rebuild everything
 *
 * It prints each output's dimensions, `projects.ts` needs those as `w`/`h`.
 */

import { readdir, stat, mkdir } from 'node:fs/promises'
import { join, extname, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE_DIR = join(ROOT, 'screenshots')
const OUT_DIR = join(ROOT, 'public/assets/showcases')
const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg'])

/** 2× the largest size a screenshot is rendered at, for retina. */
const TARGET_WIDTH = 720
const QUALITY = 78
const force = process.argv.includes('--force')

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else yield path
  }
}

async function isStale(src, out) {
  try {
    const [a, b] = await Promise.all([stat(src), stat(out)])
    return a.mtimeMs > b.mtimeMs
  } catch {
    return true // no output yet
  }
}

let converted = 0
let skipped = 0
let bytesBefore = 0
let bytesAfter = 0

for await (const src of walk(SOURCE_DIR)) {
  if (!SOURCE_EXT.has(extname(src).toLowerCase())) continue

  const out = join(OUT_DIR, relative(SOURCE_DIR, src)).replace(/\.(png|jpe?g)$/i, '.webp')
  if (!force && !(await isStale(src, out))) {
    skipped += 1
    continue
  }

  await mkdir(dirname(out), { recursive: true })
  const before = (await stat(src)).size
  const info = await sharp(src)
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(out)
  const after = (await stat(out)).size

  bytesBefore += before
  bytesAfter += after
  converted += 1
  console.log(
    `  /${relative(join(ROOT, 'public'), out)}  ${info.width}×${info.height}  ` +
      `${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`,
  )
}

const mb = (n) => (n / 1024 / 1024).toFixed(2)
console.log(
  `\n${converted} converted, ${skipped} up to date` +
    (converted ? ` · ${mb(bytesBefore)}MB → ${mb(bytesAfter)}MB` : ''),
)
