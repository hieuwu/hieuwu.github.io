import { Briefcase } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Shape } from '@/components/ui/Shape'
import { experience } from '@/content/experience'

export function Experience() {
  return (
    <Section
      id="experience"
      tone="contained"
      eyebrow="Experience"
      title="Where I have done it."
      lead="Roles, scope and the products I worked on."
    >
      <ol className="relative flex flex-col gap-3">
        {/* Timeline rail, running through the shape markers. */}
        <span
          aria-hidden
          className="absolute bottom-10 left-[1.75rem] top-10 hidden w-1 rounded-full bg-outline-variant sm:block"
        />

        {experience.map((role, i) => (
          <Reveal as="li" key={`${role.company}-${i}`} delay={i * 0.08} className="relative sm:pl-20">
            <div className="absolute left-0 top-7 hidden h-14 w-14 place-items-center sm:grid">
              <Shape
                name={i === 0 ? 'cookie-12' : 'cookie-6'}
                className={`absolute inset-0 ${i === 0 ? 'bg-primary' : 'bg-secondary-container'}`}
              />
              <Briefcase
                className={`relative h-5 w-5 ${i === 0 ? 'text-on-primary' : 'text-on-secondary-container'}`}
              />
            </div>

            <article className="card card-interactive group bg-surface-lowest p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="type-headline text-headline-sm text-on-surface">{role.company}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 text-body-md text-on-surface-variant">
                    {role.title && <span className="type-label text-primary">{role.title}</span>}
                    {role.title && role.location && <span aria-hidden>·</span>}
                    {role.location && <span>{role.location}</span>}
                  </p>
                </div>
                <span className="type-label inline-flex h-9 shrink-0 items-center self-start rounded-full bg-secondary-container px-4 text-label-lg text-on-secondary-container">
                  {role.period}
                </span>
              </div>

              {role.summary && (
                <p className="mt-4 max-w-prose text-body-md text-on-surface-variant">{role.summary}</p>
              )}

              <div className="mt-6">
                <p className="type-label text-label-lg text-on-surface-variant">Worked on</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {role.products.map((p) => (
                    <li
                      key={p}
                      className="type-label rounded-lg bg-primary-container px-4 py-2 text-title-sm text-on-primary-container"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {role.points && role.points.length > 0 && (
                <ul className="mt-5 flex flex-col gap-2">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 text-body-md text-on-surface-variant">
                      <Shape name="cookie-4" className="mt-2 h-2.5 w-2.5 shrink-0 bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {role.stack && role.stack.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {role.stack.map((s) => (
                    <li key={s} className="chip h-7 text-label-md">
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
