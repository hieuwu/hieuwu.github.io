/**
 * Material 3 Expressive shape library, as CSS `clip-path: polygon()` strings.
 *
 * Every shape is a radial function r(θ) sampled at the same POINTS angles, so
 * any two shapes have identical vertex counts. That is what makes them morph:
 * CSS transitions and Motion both interpolate polygon() point by point, so a
 * hover can turn a cookie into a flower without any SVG or JS path tweening.
 *
 * Coordinates are percentages, so a shape fills whatever box it is applied to.
 */

const POINTS = 120

type Radial = (theta: number) => number

/** Scalloped circle with `k` lobes; `depth` is how far the dips cut in. */
const cookie =
  (k: number, depth: number): Radial =>
  (t) =>
    (1 + depth * Math.cos(k * t)) / (1 + depth)

/** Sharper-lobed flower: the lobes are rounded, the valleys pinched. */
const flower =
  (k: number, depth: number): Radial =>
  (t) => {
    const c = Math.abs(Math.cos((k * t) / 2))
    return 1 - depth + depth * Math.pow(c, 0.6)
  }

/** Superellipse, normalised so its corners touch the box. */
const squircle =
  (n: number): Radial =>
  (t) => {
    const r = Math.pow(Math.pow(Math.abs(Math.cos(t)), n) + Math.pow(Math.abs(Math.sin(t)), n), -1 / n)
    return r / Math.pow(2, 1 / 2 - 1 / n)
  }

const RADIALS = {
  circle: () => 1,
  sunny: cookie(8, 0.07),
  'cookie-4': cookie(4, 0.12),
  'cookie-6': cookie(6, 0.1),
  'cookie-9': cookie(9, 0.075),
  'cookie-12': cookie(12, 0.05),
  clover: flower(4, 0.32),
  flower: flower(8, 0.22),
  burst: flower(12, 0.18),
  squircle: squircle(4),
} satisfies Record<string, Radial>

export type ShapeName = keyof typeof RADIALS

const cache = new Map<string, string>()

/**
 * @param rotate turns the shape, in degrees. Morphing between the same shape at
 * two rotations gives the M3 loading-indicator spin without rotating the box.
 */
export function shape(name: ShapeName, rotate = 0): string {
  const key = `${name}:${rotate}`
  const hit = cache.get(key)
  if (hit) return hit

  const r = RADIALS[name]
  const offset = (rotate * Math.PI) / 180
  const pts: string[] = []
  for (let i = 0; i < POINTS; i++) {
    const t = (i / POINTS) * Math.PI * 2
    const rad = r(t - offset) * 50
    const x = 50 + rad * Math.cos(t - Math.PI / 2)
    const y = 50 + rad * Math.sin(t - Math.PI / 2)
    pts.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`)
  }
  const out = `polygon(${pts.join(', ')})`
  cache.set(key, out)
  return out
}
