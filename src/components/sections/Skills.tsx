import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Tag } from '@/components/ui/Tag'
import { ICONS } from '@/components/ui/icons'
import { skillGroups } from '@/content/skills'

export function Skills() {
  return (
    <Section
      id="skills"
      tone="surface"
      eyebrow="Skills"
      title="The stack I reach for."
      lead="Grouped by the part of the job they belong to, rather than as one long list of logos."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = ICONS[group.icon]
          // The first card spans two columns on large screens so the grid has a
          // deliberate rhythm instead of five identical boxes.
          const wide = i === 0
          return (
            <Reveal
              as="article"
              key={group.id}
              delay={i * 0.05}
              className={[
                'surface-card group relative flex flex-col p-6 transition-all duration-medium ease-emphasized',
                'hover:-translate-y-1 hover:border-line-strong hover:shadow-med',
                wide ? 'lg:col-span-2' : '',
              ].join(' ')}
            >
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-element border border-line bg-subtle text-accent transition-colors duration-medium group-hover:border-[color-mix(in_oklab,var(--surf-500)_40%,transparent)]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-[-0.01em] text-primary">
                    {group.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-secondary">{group.summary}</p>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Tag featured={group.featured?.includes(skill)}>{skill}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
