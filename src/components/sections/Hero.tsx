import { useRef, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, MapPin } from 'lucide-react'
import { profile, socials } from '@/content/site'
import { resolveSocialIcon } from '@/components/ui/icons'
import { TechIcon } from '@/components/ui/TechIcon'
import { Shape } from '@/components/ui/Shape'
import type { ShapeName } from '@/components/ui/shapes'
import {
  Magnetic,
  SPRING,
  Tilt,
  VelocityMarquee,
  useFinePointer,
  usePointerSpring,
  useRange,
} from '@/components/ui/motion'

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

/** Small platform tiles pinned to the corners of the name card. */
const ORBIT: { tech: string; shape: ShapeName; className: string; delay: number }[] = [
  { tech: 'Kotlin', shape: 'squircle', className: '-left-5 -top-6', delay: 0 },
  { tech: 'Android', shape: 'cookie-6', className: '-right-5 -top-6', delay: 1.2 },
  { tech: 'Apple', shape: 'clover', className: '-bottom-5 -right-4', delay: 2.1 },
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
  const fine = useFinePointer()
  const sectionRef = useRef<HTMLElement>(null)

  // Cursor parallax across the whole hero: far layers move against the
  // pointer, near layers with it, all on the same soft spring.
  const pointer = usePointerSpring(sectionRef)
  const farX = useRange(pointer.x, -40)
  const farY = useRange(pointer.y, -30)
  const midX = useRange(pointer.x, 24)
  const midY = useRange(pointer.y, 18)
  const nearX = useRange(pointer.x, 14)
  const nearY = useRange(pointer.y, 10)

  const float = (delay: number) =>
    reduced
      ? {}
      : {
          animate: { y: [0, -10, 0], rotate: [0, 6, 0] },
          transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay },
        }

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pb-10 pt-28 sm:pt-36">
      {/* Backdrop: two oversized shapes bled off the edges, turning slowly
          and drifting against the cursor. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="deco -right-40 -top-40 h-[34rem] w-[34rem] sm:-right-24 lg:h-[44rem] lg:w-[44rem]"
          style={{ x: farX, y: farY }}
        >
          <Shape
            name="flower"
            className="h-full w-full animate-spin-slower bg-primary-container opacity-60"
          />
        </motion.div>
        <motion.div
          className="deco -left-48 top-[48%] h-[26rem] w-[26rem]"
          style={{ x: midX, y: midY }}
        >
          <Shape
            name="cookie-6"
            className="h-full w-full animate-spin-slow bg-tertiary-container opacity-50"
          />
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10">
          {/* ---------------------------------------------------------- Copy */}
          <div>
            <h1
              {...rise(80)}
              className="type-display relative z-0 max-w-[13ch] animate-fade-up text-display-sm text-on-surface sm:text-display-lg xl:text-display-xl"
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
              <Magnetic>
                <a href="#projects" className="btn btn-filled btn-lg group">
                  See the work
                  <ArrowDown className="h-5 w-5 transition-transform duration-medium ease-spring-fast group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#collaborate" className="btn btn-tonal btn-lg">
                  Work with me
                </a>
              </Magnetic>
            </div>

            <ul {...rise(400)} className="mt-8 flex animate-fade-up flex-wrap items-center gap-2">
              {socials.map((s) => {
                const Icon = resolveSocialIcon(s.icon)
                return (
                  <motion.li
                    key={s.label}
                    whileHover={reduced ? undefined : { y: -4 }}
                    whileTap={reduced ? undefined : { scale: 0.94 }}
                    transition={SPRING.fast}
                  >
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${s.label}: ${s.handle}`}
                      className="btn btn-sm group/social bg-surface-container pl-3 text-on-surface-variant hover:text-on-surface"
                    >
                      <Icon className="h-[1.125rem] w-[1.125rem] transition-transform duration-medium ease-spring-fast group-hover/social:-rotate-12" />
                      <span>{s.handle}</span>
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          </div>

          {/* ------------------------------------------------------- Portrait */}
          <div {...rise(160)} className="mx-auto w-full max-w-[26rem] animate-fade-up">
            <motion.div className="group relative aspect-[4/5]" style={{ x: nearX, y: nearY }}>
              <Tilt className="absolute inset-0" max={8}>
              <div className="h-full overflow-hidden rounded-[2.5rem] bg-surface-container shadow-e2">
                <img
                  src={profile.avatar}
                  alt={`${profile.name}, ${profile.role} at ${profile.company}`}
                  width={640}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-long ease-spring group-hover:scale-[1.03]"
                />
              </div>
              </Tilt>
            </motion.div>

            {/* Identity card, overlapping the bottom of the portrait, with the
                platform tiles stuck to its corners. */}
            <div className="relative z-10 mx-auto -mt-8 w-[88%] rounded-xl bg-surface-lowest px-6 py-5 text-center shadow-e3">
              <p className="type-headline text-headline-sm text-on-surface">{profile.name}</p>
              <p className="type-label mt-1 text-title-sm text-primary">
                {profile.role} at {profile.company}
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-body-sm text-on-surface-variant">
                <MapPin className="h-4 w-4 shrink-0" />
                {profile.location}
              </p>

                {/* Platform tiles pinned to the card's corners. They bob gently,
                    and on desktop can be flung around and spring back. */}
                {ORBIT.map((o) => (
                  <motion.div
                    key={o.tech}
                    className={`absolute z-10 h-12 w-12 sm:h-14 sm:w-14 ${o.className}`}
                  >
                    <motion.div
                      className={`h-full w-full drop-shadow-[0_8px_16px_rgba(15,76,129,0.18)] ${fine ? 'cursor-grab touch-none' : ''}`}
                      {...(fine && !reduced
                        ? {
                            drag: true,
                            dragSnapToOrigin: true,
                            dragElastic: 0.7,
                            dragTransition: { bounceStiffness: 300, bounceDamping: 12 },
                            whileHover: { scale: 1.12, rotate: 12 },
                            whileDrag: { scale: 1.2, cursor: 'grabbing' },
                            transition: SPRING.fast,
                          }
                        : {})}
                    >
                      <motion.div className="h-full w-full" {...float(o.delay)}>
                        <Shape
                          name={o.shape}
                          className="grid h-full w-full place-items-center bg-surface-lowest text-on-surface"
                        >
                          <TechIcon tech={o.tech} brand className="h-6 w-6" />
                        </Shape>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ Marquee */}
      {/* Speed follows scroll velocity: it surges, reverses with the scroll
          direction and coasts back to idle. */}
      <VelocityMarquee className="marquee-mask relative mt-16 select-none py-2 sm:mt-24">
          {/* Two passes per copy, so one copy is wider than the viewport. */}
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="type-label flex items-center gap-2.5 whitespace-nowrap rounded-full bg-surface-container px-5 py-3 text-title-sm text-on-surface"
            >
              <TechIcon tech={item} brand className="h-5 w-5 shrink-0" />
              {item}
            </span>
          ))}
      </VelocityMarquee>
    </section>
  )
}
