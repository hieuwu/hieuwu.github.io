import { useRef, type CSSProperties } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react'
import type { Project } from '@/content/projects'
import { StoreBadge } from '@/components/ui/StoreBadge'
import { PhoneShot } from '@/components/ui/PhoneShot'
import { Reveal } from '@/components/ui/Reveal'
import { TechIcon } from '@/components/ui/TechIcon'
import { Shape } from '@/components/ui/Shape'
import { Magnetic, SPRING, SplitWords, useFinePointer, usePointerSpring, useRange } from '@/components/ui/motion'
import type { ShapeName } from '@/components/ui/shapes'

/**
 * A showcase in the same voice as the products' own landing pages:
 * kicker chip → oversized headline → short copy → three ticks → badges,
 * next to a panel painted in the app's *own* background colour, decorated
 * with M3 Expressive shapes in the app's brand colour.
 *
 * Deliberately not a tidy bordered card. The colour runs edge to edge so each
 * project reads as its own block rather than a row in a list.
 *
 * Motion, all on springs:
 * - the copy column staggers in, headline word by word, ticks popping
 * - the phones are thrown in from below and settle with a bounce
 * - the panel tilts in 3D toward the cursor; the phones and the decorative
 *   shapes parallax at different depths
 * - on desktop the phones can be grabbed and flung; they spring back home
 * - scrolling drifts the phones apart and turns the shapes
 */
/** Stagger for the copy column: each child rises on the default spring. */
const COLUMN: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const ITEM: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: SPRING.default },
}
const TICK: Variants = {
  hidden: { scale: 0, rotate: -90 },
  shown: { scale: 1, rotate: 0, transition: { ...SPRING.bouncy, stiffness: 320 } },
}

/** Decorative shape pair per card, so neighbouring showcases don't repeat. */
const SHAPE_PAIRS: [ShapeName, ShapeName][] = [
  ['flower', 'cookie-9'],
  ['clover', 'sunny'],
  ['burst', 'cookie-6'],
]

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { accent } = project
  /** Alternate which side the panel sits on, so the list has rhythm. */
  const flip = index % 2 === 1

  const panelRef = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()

  // Scroll: the phones drift apart and the shapes turn as the card passes.
  // Smoothed through a spring so fast scrolling carries a little momentum.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 20, mass: 0.4 })
  const frontY = useTransform(progress, [0, 1], [40, -40])
  const backY = useTransform(progress, [0, 1], [-24, 28])
  const shapeTurnA = useTransform(progress, [0, 1], [-30, 90])
  const shapeTurnB = useTransform(progress, [0, 1], [40, -60])

  // Pointer: tilt the stage and parallax the layers at different depths.
  const pointer = usePointerSpring(panelRef)
  const tiltX = useRange(pointer.y, -10)
  const tiltY = useRange(pointer.x, 14)
  const frontX = useRange(pointer.x, 26)
  const frontPY = useRange(pointer.y, 18)
  const backX = useRange(pointer.x, 12)
  const backPY = useRange(pointer.y, 8)
  const decoX = useRange(pointer.x, -30)
  const decoY = useRange(pointer.y, -22)
  const frontYSum = useTransform(() => frontY.get() + frontPY.get())
  const backYSum = useTransform(() => backY.get() + backPY.get())

  const vars = {
    '--proj': accent.base,
    '--proj-deep': accent.deep,
    '--proj-spark': accent.spark,
    '--proj-panel': `light-dark(${accent.panelLight}, ${accent.panelDark})`,
    '--proj-on-panel': `light-dark(${accent.onPanelLight}, ${accent.onPanelDark})`,
  } as CSSProperties

  const [front, back] = project.shots

  /** Slow vertical breathing, offset per phone so they never move in lockstep. */
  const float = (delay: number) =>
    reduced
      ? {}
      : {
          animate: { y: [0, -10, 0] },
          transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' as const, delay },
        }

  /** Thrown in from below, settling with a bounce. */
  const enter = (from: { y: number; rotate: number; x: number }, delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, scale: 0.7, ...from },
          whileInView: { opacity: 1, scale: 1, y: 0, rotate: 0, x: 0 },
          viewport: { once: true, margin: '0px 0px -15% 0px' },
          transition: { ...SPRING.bouncy, delay, opacity: { duration: 0.3, delay } },
        }

  /** Grab and fling on desktop; the phone springs back to its slot. */
  const grab =
    fine && !reduced
      ? {
          drag: true,
          dragSnapToOrigin: true,
          dragElastic: 0.55,
          dragTransition: { bounceStiffness: 260, bounceDamping: 14 },
          whileHover: { scale: 1.04 },
          whileDrag: { scale: 1.1, rotate: 0, cursor: 'grabbing' },
          transition: SPRING.fast,
        }
      : {}

  return (
    <Reveal as="article">
      <div
        ref={ref}
        style={vars}
        className="card group/card relative overflow-hidden rounded-[2rem] bg-surface-lowest p-2 shadow-e1 hover:rounded-[2.75rem] hover:shadow-e3 sm:rounded-[2.75rem] sm:p-3 sm:hover:rounded-[3.5rem]"
      >
        <div
          className={[
            'grid items-stretch lg:grid-cols-2',
            flip ? 'lg:[&>*:first-child]:order-2' : '',
          ].join(' ')}
        >
          {/* ==================================================== Copy column */}
          <motion.div
            variants={COLUMN}
            initial={reduced ? false : 'hidden'}
            whileInView="shown"
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            className="order-2 flex flex-col justify-center p-5 pt-8 sm:p-8 lg:order-none lg:p-12"
          >
            <motion.div variants={ITEM} className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span
                className="type-label inline-flex h-9 items-center gap-2 rounded-full px-4 text-label-lg text-white"
                style={{ backgroundColor: 'var(--proj-deep)' }}
              >
                <Shape
                  as="span"
                  name="cookie-4"
                  className="h-3 w-3"
                  style={{ backgroundColor: 'var(--proj-spark)' }}
                />
                {project.kicker}
              </span>
              <span className="chip">{project.status}</span>
            </motion.div>

            <h3 className="type-display mt-6 text-display-sm text-on-surface lg:text-[3.25rem] lg:leading-[1.04]">
              <SplitWords delay={0.15}>{project.headline}</SplitWords>
            </h3>

            <motion.p
              variants={ITEM}
              className="mt-6 max-w-prose text-body-lg text-on-surface-variant"
            >
              {project.description}
            </motion.p>

            <ul className="mt-8 flex flex-col gap-3.5">
              {project.bullets.map((b) => (
                <motion.li key={b} variants={ITEM} className="flex items-start gap-3">
                  <motion.span
                    variants={TICK}
                    aria-hidden
                    className="relative mt-px grid h-6 w-6 shrink-0 place-items-center text-white"
                  >
                    <Shape
                      as="span"
                      name="cookie-9"
                      className="absolute inset-0"
                      style={{ backgroundColor: 'var(--proj-deep)' }}
                    />
                    <Check className="relative h-3.5 w-3.5" strokeWidth={3.5} />
                  </motion.span>
                  <span className="type-label text-title-md leading-snug text-on-surface">{b}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={ITEM} className="mt-9 flex flex-wrap items-center gap-3">
              {project.stores.map((store) => (
                <Magnetic key={store.kind} strength={0.25}>
                  <StoreBadge store={store} />
                </Magnetic>
              ))}
              {project.links.map((link) => (
                <Magnetic key={link.href} strength={0.25}>
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-tonal group/link h-11"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-medium ease-spring-fast group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
                </Magnetic>
              ))}
            </motion.div>

            {/* Stack as a quiet inline row of marks, not a wall of pills. */}
            <motion.ul
              variants={ITEM}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5"
            >
              {project.stack.map((s) => (
                <motion.li
                  key={s}
                  whileHover={reduced ? undefined : { y: -3, scale: 1.06 }}
                  transition={SPRING.fast}
                  className="inline-flex items-center gap-2 text-body-sm text-on-surface-variant"
                >
                  <TechIcon tech={s} brand className="h-4 w-4 shrink-0" />
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ================================================== Visual panel */}
          <div
            ref={panelRef}
            className="relative order-1 flex min-h-[380px] [perspective:1200px] items-center justify-center overflow-hidden rounded-[1.5rem] transition-[border-radius] duration-long ease-spring group-hover/card:rounded-[2.25rem] sm:rounded-[2.25rem] sm:group-hover/card:rounded-[3rem] lg:order-none lg:min-h-[580px]"
            style={{ backgroundColor: 'var(--proj-panel)' }}
          >
            {/* Flat graphics only: two M3 shapes bled off the edges, slowly
                turning, plus the stack's brand mark as a faint watermark. */}
            <div aria-hidden className="absolute inset-0 overflow-hidden">
              <motion.div
                className="deco -right-24 -top-28 h-[22rem] w-[22rem]"
                style={reduced ? undefined : { rotate: shapeTurnA, x: decoX, y: decoY }}
              >
                <Shape
                  name={SHAPE_PAIRS[index % SHAPE_PAIRS.length][0]}
                  className="h-full w-full"
                  style={{ backgroundColor: 'color-mix(in oklab, var(--proj) 16%, transparent)' }}
                />
              </motion.div>
              <motion.div
                className="deco -bottom-32 -left-24 h-[26rem] w-[26rem]"
                style={reduced ? undefined : { rotate: shapeTurnB, x: backX, y: backPY }}
              >
                <Shape
                  name={SHAPE_PAIRS[index % SHAPE_PAIRS.length][1]}
                  className="h-full w-full"
                  style={{ backgroundColor: 'color-mix(in oklab, var(--proj) 10%, transparent)' }}
                />
              </motion.div>
              <TechIcon
                tech={project.watermark}
                className="deco -bottom-10 -right-10 h-56 w-56 text-[color:var(--proj)] opacity-[0.12]"
              />
            </div>

            <span
              className="type-headline absolute left-6 top-6 text-title-md sm:left-8 sm:top-8"
              style={{ color: 'var(--proj-on-panel)' }}
            >
              {project.name}
            </span>

            <ul className="absolute right-6 top-6 z-10 flex flex-wrap justify-end gap-2 sm:right-8 sm:top-8">
              {project.platforms.map((p) => (
                <li
                  key={p}
                  className="type-label rounded-full px-3 py-1 text-label-md"
                  style={{
                    color: 'var(--proj-on-panel)',
                    boxShadow: 'inset 0 0 0 1.5px color-mix(in oklab, var(--proj) 45%, transparent)',
                  }}
                >
                  {p}
                </li>
              ))}
            </ul>

            {/* Two phones: one forward, one tucked behind and rotated. Each
                transform source gets its own element, because they'd
                otherwise fight over the same `x`/`y`:
                  depth layer  (scroll drift + pointer parallax)
                  → entrance   (thrown in on a bouncy spring)
                  → grab       (drag and fling, snaps home)
                  → PhoneShot  (static tilt + slow breathing) */}
            <motion.div
              className="relative flex items-center justify-center px-5 py-16 [transform-style:preserve-3d] sm:px-8 sm:py-20"
              style={reduced ? undefined : { rotateX: tiltX, rotateY: tiltY }}
            >
              <motion.div
                style={reduced ? undefined : { y: frontYSum, x: frontX }}
                className="relative z-10 w-[150px] shrink-0 drop-shadow-[0_28px_44px_rgba(0,0,0,0.4)] sm:w-[192px] lg:w-[224px]"
              >
                <motion.div {...enter({ y: 160, rotate: -24, x: -30 }, 0.1)}>
                  <motion.div {...grab} className={fine ? 'cursor-grab touch-none' : ''}>
                    <PhoneShot shot={front} style={{ rotate: '-5deg' }} motionProps={float(0)} />
                  </motion.div>
                </motion.div>
              </motion.div>

              {back && (
                <motion.div
                  style={reduced ? undefined : { y: backYSum, x: backX }}
                  className="relative z-0 -ml-[13%] w-[128px] shrink-0 translate-y-7 drop-shadow-[0_24px_36px_rgba(0,0,0,0.34)] sm:w-[164px] lg:w-[190px]"
                >
                  <motion.div {...enter({ y: 200, rotate: 28, x: 40 }, 0.22)}>
                    <motion.div {...grab} className={fine ? 'cursor-grab touch-none' : ''}>
                      <PhoneShot shot={back} style={{ rotate: '7deg' }} motionProps={float(1.6)} />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
