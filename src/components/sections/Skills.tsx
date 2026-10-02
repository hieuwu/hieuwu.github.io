import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Tag } from '@/components/ui/Tag'
import { Shape } from '@/components/ui/Shape'
import { ICONS } from '@/components/ui/icons'
import type { ShapeName } from '@/components/ui/shapes'
import { skillGroups } from '@/content/skills'

/** One shape per card, so the icons read as a family rather than a stamp. */
const SHAPES: [ShapeName, ShapeName][] = [
  ['cookie-12', 'flower'],
  ['clover', 'cookie-4'],
  ['sunny', 'burst'],
  ['squircle', 'cookie-9'],
  ['cookie-6', 'clover'],
]

export function Skills() {
  return (
    <Section
      id="skills"
      tone="contained"
      eyebrow="Skills"
      title="The stack I reach for."
      lead="Grouped by the part of the job they belong to, rather than as one long list of logos."
    >
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = ICONS[group.icon]
          const [rest, hover] = SHAPES[i % SHAPES.length]
          // The first card spans two columns on large screens and takes the
          // primary container, so the grid has a lead instead of five equals.
          const lead = i === 0
          return (
            <Reveal key={group.id} delay={i * 0.06} className={lead ? 'lg:col-span-2' : ''}>
              <article
                className={[
                  'card card-interactive group flex h-full flex-col p-7',
                  lead ? 'bg-surface-lowest shadow-e1' : 'bg-surface-lowest',
                ].join(' ')}
              >
                <div className="flex items-start gap-5">
                  <div className="relative grid h-14 w-14 shrink-0 place-items-center">
                    <Shape
                      name={rest}
                      hover={hover}
                      hoverRotate={36}
                      className={`absolute inset-0 ${lead ? 'bg-primary' : 'bg-primary-container'}`}
                    />
                    <Icon
                      className={`relative h-6 w-6 ${lead ? 'text-on-primary' : 'text-on-primary-container'}`}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="type-headline text-title-lg text-on-surface">{group.title}</h3>
                    <p className="mt-1.5 text-body-md text-on-surface-variant">{group.summary}</p>
                  </div>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <Tag featured={group.featured?.includes(skill)}>{skill}</Tag>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
