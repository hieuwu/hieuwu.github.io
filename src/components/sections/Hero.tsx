import type { CSSProperties } from 'react'
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { profile, socials } from '@/content/site'
import { resolveSocialIcon } from '@/components/ui/icons'
import { TechIcon } from '@/components/ui/TechIcon'

/** The core stack. Repeated below to fill the loop seamlessly. */
const MARQUEE = [
  'Kotlin',
  'Android',
  'Jetpack Compose',
  'Compose Multiplatform',
  'Kotlin Multiplatform',
  'Supabase',
  'RevenueCat',
]

/**
 * Hero backdrop.
 *
 * Deliberately short lists. Earlier passes stacked five kinds of decoration on
 * top of each other and the composition turned to noise, so this is pared back
 * to: the three platform marks the work is actually about, the contour waves
 * that frame them, one soft colour field per side, and a single ring. Anything
 * added here should replace something rather than stack on it.
 */
const BACKDROP = [
  // Pushed to the outer corners and bled off the edges rather than ringed around
  // the copy, they frame the band from the back instead of competing with it.
  {
    tech: 'Kotlin',
    className:
      '-right-10 top-20 h-36 w-36 rotate-[12deg] sm:-right-16 sm:-top-20 sm:h-[15rem] sm:w-[15rem] lg:h-[19rem] lg:w-[19rem]',
    anim: 'drift',
    duration: '17s',
    delay: '0s',
  },
  {
    tech: 'Android',
    className:
      '-left-20 -bottom-16 h-36 w-36 -rotate-[10deg] sm:h-[14rem] sm:w-[14rem] lg:h-[18rem] lg:w-[18rem]',
    anim: 'drift-alt',
    duration: '21s',
    delay: '-4s',
  },
  {
    tech: 'Apple',
    // Monochrome mark: it inherits this colour rather than its own black.
    className:
      'hidden sm:block -right-20 bottom-[6%] h-32 w-32 -rotate-[6deg] text-[color:var(--frost-500)] sm:h-44 sm:w-44 lg:h-[15rem] lg:w-[15rem]',
    anim: 'drift-alt',
    duration: '19s',
    delay: '-2s',
  },
] as const

/**
 * Soft colour fields. Blurred solid discs rather than gradient fills, the
 * falloff comes from the blur, so there's no banding and the waves stay crisp
 * against them. One per side, both bled off the edge.
 */
const GLOWS = [
  {
    className: '-left-72 top-[26%] h-[32rem] w-[32rem]',
    color: 'var(--surf-500)',
    mix: 14,
    duration: '26s',
    delay: '0s',
  },
  {
    className: '-right-56 -top-40 h-[30rem] w-[30rem]',
    color: 'var(--teal-500)',
    mix: 13,
    duration: '32s',
    delay: '-9s',
  },
] as const

/** One dashed ring, low and to the right. The turn only reads because it's dashed. */
const RINGS = [
  {
    className:
      'hidden lg:block -right-24 top-[58%] h-[22rem] w-[22rem] border-[1.5px] border-dashed turn-slow',
    duration: '70s',
    opacity: 0.16,
  },
] as const

/**
 * Flowing contour lines, drawn as one SVG so the curves stay smooth at any
 * width. They sweep left to right and bow around the middle of the band, which
 * pulls the eye inward; a radial mask thins them out directly behind the
 * headline so the copy still reads as the foreground.
 */
const WAVES = [
  { d: 'M-80 212 C 262 124, 476 332, 720 252 S 1188 118, 1560 218', opacity: 0.7, duration: '19s', delay: '-4s' },
  { d: 'M-80 336 C 244 252, 484 462, 720 380 S 1204 250, 1560 348', opacity: 1, duration: '26s', delay: '-9s' },
  { d: 'M-80 472 C 262 400, 462 622, 720 540 S 1184 400, 1560 498', opacity: 0.7, duration: '21s', delay: '-2s' },
  { d: 'M-80 618 C 240 560, 502 762, 720 690 S 1164 558, 1560 656', opacity: 0.45, duration: '29s', delay: '-13s' },
] as const

/**
 * Above-the-fold entrance is CSS, not JS.
 *
 * A mount animation driven from JS starts at opacity 0, so anything that stops
 * it running, a backgrounded tab throttling rAF, a script error, JS disabled , 
 * leaves the hero blank. A CSS animation with `both` fill can't fail that way,
 * and it keeps the first paint free of animation work. Scroll-triggered reveals
 * further down the page still use motion, where nothing is hidden if they never
 * fire (they start in view).
 */
const rise = (delay: number): { style: CSSProperties } => ({
  style: { animationDelay: `${delay}ms` },
})

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      {/* Backdrop, in four layers: soft colour fields, contour waves, one ring,
          then the platform marks. Each element drifts on its own long cycle with
          a negative delay, so they start mid-motion and never visibly sync up,
          and all of it stays well under the text's contrast.

          The wrapper stops short of the marquee strip so no decoration appears
          to spill past that divider. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-24 top-0 -z-10 overflow-hidden sm:bottom-32"
      >
        {GLOWS.map((g) => (
          <div
            key={g.className}
            className={`shape drift-alt rounded-full blur-3xl ${g.className}`}
            style={{
              backgroundColor: `color-mix(in oklab, ${g.color} ${g.mix}%, transparent)`,
              ['--drift-duration' as string]: g.duration,
              ['--drift-delay' as string]: g.delay,
            }}
          />
        ))}

        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full [mask-image:radial-gradient(115%_85%_at_26%_46%,transparent_0%,#000_62%)]"
        >
          {WAVES.map((w) => (
            <path
              key={w.d}
              d={w.d}
              fill="none"
              stroke="var(--surf-500)"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
              className="drift-alt"
              style={{
                opacity: w.opacity * 0.34,
                ['--drift-duration' as string]: w.duration,
                ['--drift-delay' as string]: w.delay,
              }}
            />
          ))}
        </svg>

        {RINGS.map((r) => (
          <div
            key={r.className}
            className={`shape rounded-full border-[color:var(--surf-500)] ${r.className}`}
            style={{ opacity: r.opacity, ['--drift-duration' as string]: r.duration }}
          />
        ))}


        {BACKDROP.map((m) => (
          <TechIcon
            key={m.tech}
            tech={m.tech}
            brand
            className={`watermark ${m.anim} ${m.className}`}
            style={{
              ['--drift-duration' as string]: m.duration,
              ['--drift-delay' as string]: m.delay,
            }}
          />
        ))}
      </div>

      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        {/* minmax(0,…) on the single-column case too: without it the column
            sizes to the h1's min-content and overflows narrow viewports. */}
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          {/* ---------------------------------------------------------- Copy */}
          <div>
            {/* Identity: name, title, location, now lives on the avatar card,
                so the copy column opens straight on the statement. */}
            <h1
              {...rise(60)}
              className="max-w-[15ch] animate-fade-up text-pretty text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-primary sm:text-6xl"
            >
              {profile.headline}
            </h1>

            <p
              {...rise(180)}
              className="mt-7 max-w-prose animate-fade-up text-base text-secondary sm:text-lg"
            >
              {profile.intro}
            </p>

            <div {...rise(300)} className="mt-9 flex flex-wrap items-center gap-3 animate-fade-up">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent-bg px-5 py-3 text-sm font-semibold text-on-accent transition-all duration-fast ease-emphasized hover:-translate-y-0.5 hover:shadow-med"
              >
                See the work
                <ArrowDown className="h-4 w-4 transition-transform duration-fast group-hover:translate-y-0.5" />
              </a>
              <a
                href="#collaborate"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-primary transition-all duration-fast ease-emphasized hover:-translate-y-0.5 hover:bg-tint-hover"
              >
                Work with me
              </a>
            </div>

            <ul
              {...rise(360)}
              className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-5 gap-y-3"
            >
              {socials.map((s) => {
                const Icon = resolveSocialIcon(s.icon)
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-2 text-sm text-secondary transition-colors duration-fast hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{s.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-fast group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* ------------------------------------------------------- Portrait */}
          <div
            {...rise(200)}
            className="mx-auto w-full max-w-[20rem] animate-fade-up lg:sticky lg:top-24"
          >
            <div className="surface-card overflow-hidden shadow-low">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={profile.avatar}
                  alt={`${profile.name}, ${profile.role}`}
                  width={640}
                  height={800}
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 ring-1 ring-inset ring-[color-mix(in_oklab,var(--surf-500)_28%,transparent)]"
                />
              </div>
              {/* Name, job title and location: the identity block moved off the
                  copy column so the headline can carry the whole left side. */}
              <div className="px-5 py-4">
                <p className="text-lg font-extrabold tracking-[-0.02em] text-primary">
                  {profile.name}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-accent">{profile.role}</p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted">
                  <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                  {profile.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ Marquee */}
      <div className="marquee-mask relative mt-16 select-none border-y border-line bg-surface py-5 sm:mt-24">
        <div className="animate-marquee flex w-max items-center">
          {/* Four passes of the five: two make the loop, doubled to fill wide viewports. */}
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center">
              <span className="flex items-center gap-2.5 px-7">
                <TechIcon tech={item} brand className="h-5 w-5 shrink-0" />
                <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-secondary">
                  {item}
                </span>
              </span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--surf-500)] opacity-60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
