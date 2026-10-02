import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { MorphLoop, Shape } from '@/components/ui/Shape'
import type { ShapeName } from '@/components/ui/shapes'
import { ICONS } from '@/components/ui/icons'
import { collaborate, offers } from '@/content/collaborate'

const OFFER_SHAPES: [ShapeName, ShapeName][] = [
  ['cookie-9', 'flower'],
  ['clover', 'cookie-4'],
  ['sunny', 'burst'],
  ['squircle', 'cookie-12'],
]

/**
 * The page's closing statement, so it gets the loudest treatment: a primary
 * container block with a giant morphing shape behind the heading and an
 * extra-large call to action.
 */
export function Collaborate() {
  return (
    <section id="collaborate" className="scroll-mt-28 px-3 py-3 sm:px-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-primary-container text-on-primary-container sm:rounded-[3rem]">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <MorphLoop
            sequence={['flower', 'cookie-9', 'clover', 'sunny']}
            step={3.5}
            className="deco -right-32 -top-32 h-[28rem] w-[28rem] bg-primary opacity-[0.12] sm:h-[40rem] sm:w-[40rem]"
          />
          <Shape
            name="cookie-6"
            className="deco -bottom-40 -left-32 h-[24rem] w-[24rem] animate-spin-slow bg-tertiary-container"
          />
        </div>

        <div className="relative mx-auto w-full max-w-content px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow">
              <Shape as="span" name="cookie-4" className="h-3.5 w-3.5 bg-primary" />
              Collaboration
            </p>
            <h2 className="type-display mt-4 max-w-[12ch] text-display-md sm:text-display-xl">
              {collaborate.heading}
            </h2>
            <p className="mt-6 max-w-prose text-body-lg opacity-85">{collaborate.intro}</p>
          </Reveal>

          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {offers.map((offer, i) => {
              const Icon = ICONS[offer.icon]
              const [rest, hover] = OFFER_SHAPES[i % OFFER_SHAPES.length]
              return (
                <Reveal key={offer.title} delay={i * 0.06}>
                  <article className="card card-interactive group flex h-full gap-5 bg-surface-lowest p-6 text-on-surface sm:p-7">
                    <div className="relative grid h-14 w-14 shrink-0 place-items-center">
                      <Shape
                        name={rest}
                        hover={hover}
                        hoverRotate={30}
                        className="absolute inset-0 bg-primary"
                      />
                      <Icon className="relative h-6 w-6 text-on-primary" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="type-headline text-title-lg">{offer.title}</h3>
                      <p className="mt-2 text-body-md text-on-surface-variant">{offer.description}</p>
                    </div>
                  </article>
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
                className="btn btn-filled btn-xl group shadow-e2"
              >
                {collaborate.ctaLabel}
                <ArrowUpRight className="h-6 w-6 transition-transform duration-medium ease-spring-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={collaborate.secondaryHref}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-xl bg-surface-lowest text-primary"
              >
                {collaborate.secondaryLabel}
              </a>
            </div>
            <p className="mt-6 text-body-md opacity-75">{collaborate.responseNote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
