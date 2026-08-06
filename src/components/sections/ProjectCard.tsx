import { useRef, type CSSProperties } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { Project } from '@/content/projects'
import { StoreBadge } from '@/components/ui/StoreBadge'
import { PhoneShot } from '@/components/ui/PhoneShot'
import { Reveal } from '@/components/ui/Reveal'
import { TechIcon } from '@/components/ui/TechIcon'

/**
 * A showcase in the same voice as the products' own landing pages:
 * solid pill kicker → oversized headline → short copy → three ticks → badges,
 * next to a panel painted in the app's *own* background colour.
 *
 * Deliberately not a tidy bordered card. The colour runs edge to edge so each
 * project reads as its own block rather than a row in a list.
 */
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
    '--grid-line': 'color-mix(in oklab, var(--proj) 16%, transparent)',
    '--grid-size': '44px',
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
        className="relative overflow-hidden rounded-page bg-card shadow-low transition-shadow duration-medium hover:shadow-high"
      >
        <div
          className={[
            'grid items-stretch lg:grid-cols-2',
            flip ? 'lg:[&>*:first-child]:order-2' : '',
          ].join(' ')}
        >
          {/* ==================================================== Copy column */}
          <div className="order-2 flex flex-col justify-center p-7 sm:p-10 lg:order-none lg:p-14">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-2xs font-bold uppercase tracking-[0.16em] text-white"
                style={{ backgroundColor: 'var(--proj-deep)' }}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--proj-spark)' }}
                />
                {project.kicker}
              </span>
              <span className="text-xs font-medium text-muted">{project.status}</span>
            </div>

            <h3 className="mt-6 text-pretty text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-primary sm:text-5xl">
              {project.headline}
            </h3>

            <p className="mt-6 max-w-prose text-base text-secondary">{project.description}</p>

            <ul className="mt-8 flex flex-col gap-3.5">
              {project.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                    style={{ backgroundColor: 'var(--proj-deep)' }}
                  >
                    <Check className="h-3 w-3" strokeWidth={3.5} />
                  </span>
                  <span className="text-[0.95rem] font-medium leading-snug text-primary">{b}</span>
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
                  className="group/link inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-fast hover:border-line-strong hover:bg-tint-hover"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              ))}
            </div>

            {/* Stack as a quiet inline row of marks, not a wall of pills. */}
            <ul className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {project.stack.map((s) => (
                <li key={s} className="inline-flex items-center gap-2 text-xs text-muted">
                  <TechIcon tech={s} brand className="h-4 w-4 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* ================================================== Visual panel */}
          <div
            className="relative order-1 flex min-h-[380px] items-center justify-center overflow-hidden lg:order-none lg:min-h-[560px]"
            style={{ backgroundColor: 'var(--proj-panel)' }}
          >
            {/* Flat graphics only: two solid discs bled off the edges so just an
                arc shows, plus the stack's brand mark blown up as a watermark.
                No blur and no gradient, so the phones and the copy stay loudest. */}
            <div aria-hidden className="absolute inset-0 overflow-hidden">
              <div
                className="shape -right-24 -top-28 h-[22rem] w-[22rem] rounded-full"
                style={{ backgroundColor: 'color-mix(in oklab, var(--proj) 16%, transparent)' }}
              />
              <div
                className="shape -bottom-32 -left-24 h-[26rem] w-[26rem] rounded-full"
                style={{ backgroundColor: 'color-mix(in oklab, var(--proj) 10%, transparent)' }}
              />
              <TechIcon
                tech={project.watermark}
                className="watermark -bottom-10 -right-10 h-56 w-56 text-[color:var(--proj)]"
              />
            </div>

            <span
              className="absolute left-6 top-6 font-mono text-xs font-bold uppercase tracking-[0.2em] sm:left-9 sm:top-9"
              style={{ color: 'var(--proj-on-panel)' }}
            >
              {project.name}
            </span>

            <ul className="absolute right-6 top-6 z-10 flex flex-wrap justify-end gap-2 sm:right-9 sm:top-9">
              {project.platforms.map((p) => (
                <li
                  key={p}
                  className="rounded-full px-2.5 py-1 text-2xs font-bold uppercase tracking-wide"
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
