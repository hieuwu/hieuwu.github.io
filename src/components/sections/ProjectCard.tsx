import { useRef, type CSSProperties } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { Project } from '@/content/projects'
import { StoreBadge } from '@/components/ui/StoreBadge'
import { PhoneShot } from '@/components/ui/PhoneShot'
import { Reveal } from '@/components/ui/Reveal'
import { TechIcon } from '@/components/ui/TechIcon'
import { Shape } from '@/components/ui/Shape'
import type { ShapeName } from '@/components/ui/shapes'

/**
 * A showcase in the same voice as the products' own landing pages:
 * kicker chip → oversized headline → short copy → three ticks → badges,
 * next to a panel painted in the app's *own* background colour, decorated
 * with M3 Expressive shapes in the app's brand colour.
 *
 * Deliberately not a tidy bordered card. The colour runs edge to edge so each
 * project reads as its own block rather than a row in a list.
 */
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

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Opposed drift: the two phones separate slightly as the card passes through.
  const frontY = useTransform(scrollYProgress, [0, 1], [30, -30])
  const backY = useTransform(scrollYProgress, [0, 1], [-16, 20])

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
          <div className="order-2 flex flex-col justify-center p-5 pt-8 sm:p-8 lg:order-none lg:p-12">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
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
            </div>

            <h3 className="type-display mt-6 text-display-sm text-on-surface lg:text-[3.25rem] lg:leading-[1.04]">
              {project.headline}
            </h3>

            <p className="mt-6 max-w-prose text-body-lg text-on-surface-variant">{project.description}</p>

            <ul className="mt-8 flex flex-col gap-3.5">
              {project.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
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
                  </span>
                  <span className="type-label text-title-md leading-snug text-on-surface">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {project.stores.map((store) => (
                <StoreBadge key={store.kind} store={store} />
              ))}
              {project.links.map((link) => (
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
              ))}
            </div>

            {/* Stack as a quiet inline row of marks, not a wall of pills. */}
            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {project.stack.map((s) => (
                <li key={s} className="inline-flex items-center gap-2 text-body-sm text-on-surface-variant">
                  <TechIcon tech={s} brand className="h-4 w-4 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* ================================================== Visual panel */}
          <div
            className="relative order-1 flex min-h-[380px] items-center justify-center overflow-hidden rounded-[1.5rem] transition-[border-radius] duration-long ease-spring group-hover/card:rounded-[2.25rem] sm:rounded-[2.25rem] sm:group-hover/card:rounded-[3rem] lg:order-none lg:min-h-[580px]"
            style={{ backgroundColor: 'var(--proj-panel)' }}
          >
            {/* Flat graphics only: two M3 shapes bled off the edges, slowly
                turning, plus the stack's brand mark as a faint watermark. */}
            <div aria-hidden className="absolute inset-0 overflow-hidden">
              <Shape
                name={SHAPE_PAIRS[index % SHAPE_PAIRS.length][0]}
                className="deco -right-24 -top-28 h-[22rem] w-[22rem] animate-spin-slower"
                style={{ backgroundColor: 'color-mix(in oklab, var(--proj) 16%, transparent)' }}
              />
              <Shape
                name={SHAPE_PAIRS[index % SHAPE_PAIRS.length][1]}
                className="deco -bottom-32 -left-24 h-[26rem] w-[26rem] animate-spin-slow"
                style={{ backgroundColor: 'color-mix(in oklab, var(--proj) 10%, transparent)' }}
              />
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

            {/* Two phones: one forward, one tucked behind and rotated.
                Scroll drift lives on the outer element and the slow breathing
                on the inner one, both animate `y`, so they need separate
                elements or one silently wins. */}
            <div className="relative flex items-center justify-center px-5 py-16 sm:px-8 sm:py-20">
              <motion.div
                style={{ y: reduced ? 0 : frontY }}
                className="relative z-10 w-[150px] shrink-0 drop-shadow-[0_28px_44px_rgba(0,0,0,0.4)] sm:w-[192px] lg:w-[224px]"
              >
                <PhoneShot shot={front} style={{ rotate: '-5deg' }} motionProps={float(0)} />
              </motion.div>

              {back && (
                <motion.div
                  style={{ y: reduced ? 0 : backY }}
                  className="relative z-0 -ml-[13%] w-[128px] shrink-0 translate-y-7 drop-shadow-[0_24px_36px_rgba(0,0,0,0.34)] sm:w-[164px] lg:w-[190px]"
                >
                  <PhoneShot shot={back} style={{ rotate: '7deg' }} motionProps={float(1.6)} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
