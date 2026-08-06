import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { ICONS } from '@/components/ui/icons'
import { collaborate, offers } from '@/content/collaborate'

/**
 * The page's closing statement, so it gets the loudest treatment: a solid deep
 * twilight block in both colour schemes with a turquoise call to action. The
 * token overrides scope the light-on-dark palette to this block only.
 */
const DEEP =
  '[--color-text-primary:var(--cyan-500)] [--color-text-secondary:var(--frost-500)] [--color-text-muted:#8fb7d4] [--color-text-accent:var(--surf-500)] [--color-border:rgb(255_255_255/16%)] [--color-border-emphasized:rgb(255_255_255/30%)] [--color-background-card:rgb(255_255_255/6%)] [--color-background-muted:rgb(255_255_255/8%)] [--color-tint-hover:rgb(255_255_255/10%)]'

export function Collaborate() {
  return (
    <section id="collaborate" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <div
          className={`relative overflow-hidden rounded-page bg-[var(--twilight-500)] text-[color:var(--cyan-500)] ${DEEP}`}
        >
          {/* Flat shapes, bled off the block's edges. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="shape -bottom-56 -right-32 h-[36rem] w-[36rem] rounded-full"
              style={{ backgroundColor: 'color-mix(in oklab, var(--surf-500) 22%, transparent)' }}
            />
            <div
              className="shape -left-40 -top-48 h-[30rem] w-[30rem] rounded-full"
              style={{ backgroundColor: 'color-mix(in oklab, var(--teal-600) 20%, transparent)' }}
            />
          </div>

          <div className="relative p-8 sm:p-12 lg:p-16">
            <Reveal>
              <p className="eyebrow">Collaboration</p>
              <h2 className="mt-4 max-w-[14ch] text-pretty text-4xl font-extrabold leading-[1.0] tracking-[-0.04em] sm:text-6xl">
                {collaborate.heading}
              </h2>
              <p className="mt-6 max-w-prose text-lg text-secondary">{collaborate.intro}</p>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {offers.map((offer, i) => {
                const Icon = ICONS[offer.icon]
                return (
                  <Reveal
                    key={offer.title}
                    delay={i * 0.05}
                    className="group rounded-container bg-card p-6 ring-1 ring-inset ring-white/10 transition-colors duration-medium hover:bg-subtle"
                  >
                    <span
                      className="grid h-10 w-10 place-items-center rounded-element text-[color:var(--twilight-500)]"
                      style={{ backgroundColor: 'var(--surf-500)' }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <h3 className="mt-4 text-lg font-bold tracking-[-0.015em]">{offer.title}</h3>
                    <p className="mt-2 text-sm text-secondary">{offer.description}</p>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-center gap-3">
                <a
                  href={collaborate.ctaHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-bold text-[color:var(--twilight-500)] transition-all duration-fast ease-emphasized hover:-translate-y-0.5 hover:shadow-high"
                  style={{ backgroundColor: 'var(--surf-500)' }}
                >
                  {collaborate.ctaLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={collaborate.secondaryHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-bold ring-1 ring-inset ring-white/30 transition-all duration-fast ease-emphasized hover:-translate-y-0.5 hover:bg-white/10"
                >
                  {collaborate.secondaryLabel}
                </a>
              </div>
              <p className="mt-6 text-sm text-muted">{collaborate.responseNote}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
