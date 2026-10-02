import type { CSSProperties } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, MapPin } from 'lucide-react'
import { profile, socials } from '@/content/site'
import { projects } from '@/content/projects'
import { openSource } from '@/content/openSource'
import { posts } from '@/content/blog'
import { resolveSocialIcon } from '@/components/ui/icons'
import { TechIcon } from '@/components/ui/TechIcon'
import { MorphLoop, Shape } from '@/components/ui/Shape'
import type { ShapeName } from '@/components/ui/shapes'

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

/** Every figure here is counted from the content files, never typed in. */
const merged = openSource.flatMap((r) => r.contributions).filter((c) => c.merged).length
const STATS: {
  value: number
  label: string
  href: string
  shape: ShapeName
  hover: ShapeName
  tone: string
  deco: string
}[] = [
  {
    value: projects.length,
    label: 'apps shipped to the stores',
    href: '#projects',
    shape: 'cookie-9',
    hover: 'flower',
    tone: 'bg-primary text-on-primary',
    deco: 'bg-[color-mix(in_oklab,var(--md-on-primary)_14%,transparent)]',
  },
  {
    value: merged,
    label: 'merged pull requests upstream',
    href: '#open-source',
    shape: 'clover',
    hover: 'cookie-4',
    tone: 'bg-tertiary-container text-on-tertiary-container',
    deco: 'bg-[color-mix(in_oklab,var(--md-tertiary)_18%,transparent)]',
  },
  {
    value: posts.length,
    label: 'Supadroid articles written',
    href: '#writing',
    shape: 'sunny',
    hover: 'burst',
    tone: 'bg-secondary-container text-on-secondary-container',
    deco: 'bg-[color-mix(in_oklab,var(--md-secondary)_16%,transparent)]',
  },
]

/** Small platform tiles that orbit the portrait. */
const ORBIT: { tech: string; shape: ShapeName; className: string; delay: number }[] = [
  { tech: 'Kotlin', shape: 'squircle', className: '-left-2 top-[12%] sm:-left-6', delay: 0 },
  { tech: 'Android', shape: 'cookie-6', className: '-right-1 top-[30%] sm:-right-5', delay: 1.2 },
  { tech: 'Apple', shape: 'clover', className: 'left-[6%] bottom-[16%]', delay: 2.1 },
]

/**
 * Above-the-fold entrance is CSS, not JS: a JS mount animation starts at
 * opacity 0, so anything that stops it running leaves the hero blank. A CSS
 * animation with `both` fill can't fail that way.
 */
const rise = (delay: number): { style: CSSProperties } => ({
  style: { animationDelay: `${delay}ms` },
})

/** Wraps the last two words of the headline in a tonal highlight pill. */
function Headline({ text }: { text: string }) {
  const stop = text.endsWith('.') ? '.' : ''
  const words = text.slice(0, stop ? -1 : undefined).split(' ')
  const tail = words.splice(-2).join(' ')
  return (
    <>
      {words.join(' ')}{' '}
      <span className="relative inline-block whitespace-nowrap">
        <span
          aria-hidden
          className="absolute -inset-x-3 inset-y-[0.08em] -z-10 -rotate-1 rounded-full bg-primary-container sm:-inset-x-4"
        />
        <span className="text-primary">{tail}</span>
      </span>
      {stop}
    </>
  )
}

export function Hero() {
  const reduced = useReducedMotion()

  const float = (delay: number) =>
    reduced
      ? {}
      : {
          animate: { y: [0, -10, 0], rotate: [0, 6, 0] },
          transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay },
        }

  return (
    <section id="top" className="relative overflow-hidden pb-10 pt-28 sm:pt-36">
      {/* Backdrop: two oversized shapes bled off the edges, turning slowly. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Shape
          name="flower"
          className="deco -right-40 -top-40 h-[34rem] w-[34rem] animate-spin-slower bg-primary-container opacity-60 sm:-right-24 lg:h-[44rem] lg:w-[44rem]"
        />
        <Shape
          name="cookie-6"
          className="deco -left-48 top-[48%] h-[26rem] w-[26rem] animate-spin-slow bg-tertiary-container opacity-50"
        />
      </div>

      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10">
          {/* ---------------------------------------------------------- Copy */}
          <div>
            {profile.available && (
              <p
                {...rise(0)}
                className="type-label inline-flex animate-fade-up items-center gap-2.5 rounded-full bg-surface-lowest py-2 pl-3 pr-4 text-label-lg text-on-surface shadow-e1"
              >
                <span className="relative grid h-2.5 w-2.5 place-items-center">
                  <span className="absolute inset-0 animate-pulse rounded-full bg-[#1e8e3e]" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-[#1e8e3e]" />
                </span>
                {profile.availableLabel}
              </p>
            )}

            <h1
              {...rise(80)}
              className="type-display relative z-0 mt-7 max-w-[13ch] animate-fade-up text-display-sm text-on-surface sm:text-display-lg xl:text-display-xl"
            >
              <Headline text={profile.headline} />
            </h1>

            <p
              {...rise(200)}
              className="mt-8 max-w-prose animate-fade-up text-body-lg text-on-surface-variant"
            >
              {profile.intro}
            </p>

            <div {...rise(320)} className="mt-10 flex animate-fade-up flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-filled btn-lg group">
                See the work
                <ArrowDown className="h-5 w-5 transition-transform duration-medium ease-spring-fast group-hover:translate-y-0.5" />
              </a>
              <a href="#collaborate" className="btn btn-tonal btn-lg">
                Work with me
              </a>
            </div>

            <ul {...rise(400)} className="mt-8 flex animate-fade-up flex-wrap items-center gap-2">
              {socials.map((s) => {
                const Icon = resolveSocialIcon(s.icon)
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={s.label}
                      title={s.label}
                      className="icon-btn h-12 w-12 bg-surface-container text-on-surface-variant hover:text-on-surface"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* ------------------------------------------------------- Portrait */}
          <div {...rise(160)} className="mx-auto w-full max-w-[26rem] animate-fade-up">
            <div className="group relative aspect-square">
              <MorphLoop
                sequence={['cookie-12', 'flower', 'sunny', 'clover']}
                step={3}
                className="absolute inset-0 bg-primary"
              />
              <Shape
                name="cookie-9"
                hover="squircle"
                className="absolute inset-[9%] overflow-hidden bg-surface-container"
              >
                <img
                  src={profile.avatar}
                  alt={`${profile.name}, ${profile.role}`}
                  width={640}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-long ease-spring group-hover:scale-105"
                />
              </Shape>

              {ORBIT.map((o) => (
                <motion.div
                  key={o.tech}
                  className={`absolute h-16 w-16 drop-shadow-[0_8px_16px_rgba(15,76,129,0.18)] sm:h-[4.5rem] sm:w-[4.5rem] ${o.className}`}
                  {...float(o.delay)}
                >
                  <Shape
                    name={o.shape}
                    className="grid h-full w-full place-items-center bg-surface-lowest text-on-surface"
                  >
                    <TechIcon tech={o.tech} brand className="h-7 w-7" />
                  </Shape>
                </motion.div>
              ))}
            </div>

            {/* Identity card, overlapping the bottom of the portrait. */}
            <div className="relative z-10 mx-auto -mt-8 w-[88%] rounded-xl bg-surface-lowest px-6 py-5 text-center shadow-e3">
              <p className="type-headline text-headline-sm text-on-surface">{profile.name}</p>
              <p className="type-label mt-1 text-title-sm text-primary">
                {profile.role} · {profile.specialty}
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-body-sm text-on-surface-variant">
                <MapPin className="h-4 w-4 shrink-0" />
                {profile.location}
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------- Stat bento */}
        <ul className="mt-16 grid gap-3 sm:mt-24 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <li key={s.label} {...rise(480 + i * 80)} className="animate-fade-up">
              <a
                href={s.href}
                className={`card card-interactive group flex h-full items-end justify-between gap-4 overflow-hidden p-6 sm:min-h-[11rem] sm:p-7 ${s.tone}`}
              >
                <Shape
                  name={s.shape}
                  hover={s.hover}
                  hoverRotate={30}
                  className={`deco -right-8 -top-8 h-36 w-36 ${s.deco}`}
                />
                <div className="relative">
                  <p className="type-display text-display-md leading-none">{s.value}</p>
                  <p className="type-label mt-3 text-title-md">{s.label}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ------------------------------------------------------------ Marquee */}
      <div className="marquee-mask relative mt-12 select-none py-2">
        <div className="flex w-max animate-marquee items-center gap-3">
          {/* Four passes: two make the loop, doubled to fill wide viewports. */}
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="type-label flex items-center gap-2.5 whitespace-nowrap rounded-full bg-surface-container px-5 py-3 text-title-sm text-on-surface"
            >
              <TechIcon tech={item} brand className="h-5 w-5 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
