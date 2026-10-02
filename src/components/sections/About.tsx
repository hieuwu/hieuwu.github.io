import { Reveal } from '@/components/ui/Reveal'
import { Shape } from '@/components/ui/Shape'
import type { ShapeName } from '@/components/ui/shapes'
import { profile } from '@/content/site'
import { SplitWords, Tilt } from '@/components/ui/motion'

const PRINCIPLES: {
  n: string
  title: string
  body: string
  shape: ShapeName
  hover: ShapeName
  tone: string
  badge: string
}[] = [
  {
    n: '01',
    title: 'Architecture that survives contact',
    body: 'Module boundaries drawn so that a year of feature work does not turn into one god-module. Boring, testable, and easy for the next person to change.',
    shape: 'cookie-9',
    hover: 'flower',
    tone: 'bg-primary-container text-on-primary-container',
    badge: 'bg-primary text-on-primary',
  },
  {
    n: '02',
    title: 'Offline is the normal case',
    body: 'Cache with intent, resolve conflicts explicitly, and be honest in the UI about how fresh the data is. An app on a bad connection should still be useful.',
    shape: 'clover',
    hover: 'cookie-4',
    tone: 'bg-surface-high text-on-surface',
    badge: 'bg-secondary text-on-secondary',
  },
  {
    n: '03',
    title: 'Shipping is part of engineering',
    body: 'CI, signing, staged rollouts and store compliance are design constraints, not afterthoughts. Releases should be dull.',
    shape: 'sunny',
    hover: 'burst',
    tone: 'bg-tertiary-container text-on-tertiary-container',
    badge: 'bg-tertiary text-on-tertiary',
  },
  {
    n: '04',
    title: 'Measure, then optimise',
    body: 'Startup traces, memory profiles and crash data decide what gets worked on, not intuition about what feels slow.',
    shape: 'squircle',
    hover: 'cookie-12',
    tone: 'bg-secondary-container text-on-secondary-container',
    badge: 'bg-primary text-on-primary',
  },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">
              <Shape as="span" name="cookie-4" className="h-3.5 w-3.5 bg-primary" />
              About
            </p>
            <h2 className="type-display mt-4 text-display-sm text-on-surface sm:text-display-md">
              <SplitWords>How I work</SplitWords>
            </h2>
            <p className="mt-6 text-body-lg text-on-surface-variant">{profile.about}</p>
          </Reveal>

          <ol className="grid gap-3 sm:grid-cols-2 sm:pb-10">
            {PRINCIPLES.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 0.07} className={i % 2 === 1 ? 'sm:[translate:0_2.5rem]' : ''}>
                <Tilt className="h-full">
                <article className={`card card-interactive group h-full overflow-hidden p-7 ${p.tone}`}>
                  <div className="relative grid h-16 w-16 place-items-center">
                    <Shape
                      name={p.shape}
                      hover={p.hover}
                      hoverRotate={40}
                      className={`absolute inset-0 ${p.badge}`}
                    />
                    <span className="type-headline relative text-title-lg">{p.n}</span>
                  </div>
                  <h3 className="type-headline mt-6 text-headline-sm">{p.title}</h3>
                  <p className="mt-3 text-body-md opacity-80">{p.body}</p>
                </article>
                </Tilt>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
