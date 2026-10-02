import type { CSSProperties, ReactNode } from 'react'
import { Reveal } from './Reveal'
import { Shape } from './Shape'

/**
 * Sections alternate between sitting on the page surface and being an inset,
 * heavily rounded colour block, the M3 Expressive way of breaking up a long
 * scroll with containment instead of hairlines.
 *
 * - `plain`    , on the page surface
 * - `contained`, inset surface-container block
 * - `primary`  , inset solid Classic Blue block; the header re-maps the text
 *                roles onto on-primary so the copy reads without the children
 *                needing to know where they are
 */
type Tone = 'plain' | 'contained' | 'primary'

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

const BLOCK: Record<Tone, string> = {
  plain: '',
  contained: 'bg-surface-low',
  primary: 'bg-primary',
}

const ON_PRIMARY = {
  '--md-on-surface': 'var(--md-on-primary)',
  '--md-on-surface-variant': 'var(--md-on-primary-variant)',
  '--md-primary': 'var(--md-on-primary)',
  '--md-outline-variant': 'color-mix(in oklab, var(--md-on-primary) 35%, transparent)',
} as CSSProperties

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  aside,
  tone = 'plain',
  className,
}: Props) {
  const inset = tone !== 'plain'

  return (
    <section id={id} className={`scroll-mt-28 ${inset ? 'px-3 py-3 sm:px-4' : ''} ${className ?? ''}`}>
      <div
        className={[
          'relative overflow-hidden',
          inset ? 'rounded-[2rem] py-16 sm:rounded-[3rem] sm:py-24' : 'py-20 sm:py-28',
          BLOCK[tone],
        ].join(' ')}
      >
        {inset && (
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <Shape
              name={tone === 'primary' ? 'flower' : 'cookie-9'}
              className="deco -right-24 -top-24 h-72 w-72 animate-spin-slower sm:h-[26rem] sm:w-[26rem]"
              style={{
                backgroundColor:
                  tone === 'primary'
                    ? 'color-mix(in oklab, var(--md-on-primary) 8%, transparent)'
                    : 'var(--md-surface-container)',
              }}
            />
          </div>
        )}

        <div className="relative mx-auto w-full max-w-content px-5 sm:px-8">
          <Reveal>
            <div
              style={tone === 'primary' ? ON_PRIMARY : undefined}
              className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
            >
              <div className="max-w-prose">
                <p className="eyebrow">
                  <Shape as="span" name="cookie-4" className="h-3.5 w-3.5 bg-[var(--md-primary)]" />
                  {eyebrow}
                </p>
                <h2 className="type-display mt-4 text-display-sm text-on-surface sm:text-display-md">
                  {title}
                </h2>
                {lead ? (
                  <p className="mt-5 text-body-lg text-on-surface-variant">{lead}</p>
                ) : null}
              </div>
              {aside ? <div className="shrink-0">{aside}</div> : null}
            </div>
          </Reveal>

          <div className="mt-12 sm:mt-16">{children}</div>
        </div>
      </div>
    </section>
  )
}
