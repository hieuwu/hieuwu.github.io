import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { experience } from '@/content/experience'

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I have done it."
      lead="Roles, scope and the products I worked on."
    >
      <ol className="relative">
        {/* Timeline rail */}
        <span
          aria-hidden
          className="absolute bottom-6 left-[7px] top-2 w-px bg-line sm:left-[calc(11rem+7px)]"
        />

        {experience.map((role, i) => (
          <Reveal
            as="li"
            key={`${role.company}-${i}`}
            delay={i * 0.06}
            className="relative pb-12 pl-8 last:pb-0 sm:grid sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8 sm:pl-0"
          >
            {/* Period column */}
            <div className="sm:text-right">
              <span
                aria-hidden
                className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border-2 border-line-strong bg-body sm:left-[11rem]"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-[var(--surf-500)]" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted sm:pr-8">
                {role.period}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-bold tracking-[-0.02em] text-primary">
                  {role.company}
                </h3>
                {role.title && (
                  <span className="text-sm font-semibold text-accent">{role.title}</span>
                )}
                {role.location && <span className="text-xs text-muted">· {role.location}</span>}
              </div>

              {role.summary && (
                <p className="mt-2 max-w-prose text-sm text-secondary">{role.summary}</p>
              )}

              <div className="mt-4">
                <p className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
                  Worked on
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {role.products.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-line bg-subtle px-3 py-1.5 text-sm font-medium text-primary"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {role.points && role.points.length > 0 && (
                <ul className="mt-4 flex flex-col gap-2">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-secondary">
                      <span
                        aria-hidden
                        className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-[var(--surf-500)]"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {role.stack && role.stack.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {role.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line px-2.5 py-1 text-2xs font-medium text-secondary"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
