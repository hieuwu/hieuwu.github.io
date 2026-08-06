import { Reveal } from '@/components/ui/Reveal'
import { profile } from '@/content/site'

const PRINCIPLES = [
  {
    n: '01',
    title: 'Architecture that survives contact',
    body: 'Module boundaries drawn so that a year of feature work does not turn into one god-module. Boring, testable, and easy for the next person to change.',
  },
  {
    n: '02',
    title: 'Offline is the normal case',
    body: 'Cache with intent, resolve conflicts explicitly, and be honest in the UI about how fresh the data is. An app on a bad connection should still be useful.',
  },
  {
    n: '03',
    title: 'Shipping is part of engineering',
    body: 'CI, signing, staged rollouts and store compliance are design constraints, not afterthoughts. Releases should be dull.',
  },
  {
    n: '04',
    title: 'Measure, then optimise',
    body: 'Startup traces, memory profiles and crash data decide what gets worked on, not intuition about what feels slow.',
  },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-primary sm:text-4xl">
              How I work
            </h2>
            <p className="mt-5 text-base text-secondary">{profile.about}</p>
          </Reveal>

          <ol className="grid gap-px overflow-hidden rounded-container border border-line bg-line sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal
                as="li"
                key={p.n}
                delay={i * 0.06}
                className="group bg-card p-6 transition-colors duration-medium hover:bg-subtle"
              >
                <span className="font-mono text-2xs tracking-[0.18em] text-accent">{p.n}</span>
                <h3 className="mt-3 text-base font-semibold text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-secondary">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
