import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

/**
 * `tone` gives the page a Wise-style rhythm: most sections sit on the page
 * background, and one or two are full-bleed colour blocks that break the scroll
 * up. Tones set their own text colours, so children don't need to know.
 */
type Tone = 'default' | 'surface' | 'deep'

type Props = {
  id: string
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  children: ReactNode
  /** Right-hand slot next to the heading (a link, a count, a toggle). */
  aside?: ReactNode
  tone?: Tone
  className?: string
}

const TONE: Record<Tone, string> = {
  default: 'border-t border-line',
  surface: 'bg-surface',
  // Deep twilight in both schemes. The block is the point, so it shouldn't invert.
  deep: 'bg-[var(--twilight-500)] text-[color:var(--cyan-500)] [--color-text-primary:var(--cyan-500)] [--color-text-secondary:var(--frost-500)] [--color-text-muted:#8fb7d4] [--color-text-accent:var(--surf-500)] [--color-border:rgb(255_255_255/14%)] [--color-border-emphasized:rgb(255_255_255/26%)] [--color-background-card:rgb(255_255_255/6%)] [--color-background-muted:rgb(255_255_255/7%)] [--color-tint-hover:rgb(255_255_255/8%)]',
}

export function Section({ id, eyebrow, title, lead, children, aside, tone = 'default', className }: Props) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 sm:py-28 ${TONE[tone]} ${className ?? ''}`}
    >
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-prose">
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="mt-4 text-pretty text-4xl font-extrabold leading-[1.03] tracking-[-0.035em] text-primary sm:text-5xl">
                {title}
              </h2>
              {lead ? <p className="mt-5 text-lg text-secondary">{lead}</p> : null}
            </div>
            {aside ? <div className="shrink-0">{aside}</div> : null}
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  )
}
