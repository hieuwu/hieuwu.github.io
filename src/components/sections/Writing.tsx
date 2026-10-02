import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Shape } from '@/components/ui/Shape'
import type { ShapeName } from '@/components/ui/shapes'
import { posts } from '@/content/blog'

/** Leading shape per row, cycled, each blooming into the next on hover. */
const SHAPES: [ShapeName, ShapeName][] = [
  ['cookie-9', 'flower'],
  ['clover', 'cookie-4'],
  ['sunny', 'burst'],
  ['squircle', 'cookie-12'],
  ['cookie-6', 'clover'],
]

export function Writing() {
  return (
    <Section
      id="writing"
      eyebrow="Writing"
      title="Supadroid: Supabase, from an Android engineer."
      lead="A series on wiring Supabase into real Android apps: the parts that are genuinely easy, and the parts where the docs stop and you have to work it out."
      aside={
        <a
          href="https://hieuwu.medium.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="btn btn-tonal btn-lg group"
        >
          Read on Medium
          <ArrowUpRight className="h-4 w-4 transition-transform duration-medium ease-spring-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      }
    >
      <ul className="flex flex-col gap-2">
        {posts.map((post, i) => {
          const [rest, hover] = SHAPES[i % SHAPES.length]
          return (
            <Reveal as="li" key={post.href} delay={Math.min(i, 4) * 0.05}>
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer noopener"
                className={[
                  'card group flex flex-col gap-4 bg-surface-low p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6',
                  'rounded-md hover:rounded-2xl hover:bg-primary-container',
                  i === 0 ? 'rounded-t-[2rem]' : '',
                  i === posts.length - 1 ? 'rounded-b-[2rem]' : '',
                ].join(' ')}
              >
                <div className="relative grid h-14 w-14 shrink-0 place-items-center">
                  <Shape
                    name={rest}
                    hover={hover}
                    hoverRotate={30}
                    className="absolute inset-0 bg-secondary-container transition-colors group-hover:bg-primary"
                  />
                  <span className="type-headline relative text-title-lg text-on-secondary-container tabular-nums transition-colors group-hover:text-on-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-label-lg">
                    <span className="type-label text-primary">{post.series}</span>
                    <span aria-hidden className="text-on-surface-variant">
                      ·
                    </span>
                    <span className="text-on-surface-variant">{post.publication}</span>
                  </div>
                  <h3 className="type-headline mt-1 text-title-lg text-on-surface group-hover:text-on-primary-container">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 max-w-prose text-body-md text-on-surface-variant">
                    {post.blurb}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <ul className="hidden gap-2 lg:flex">
                    {post.tags.map((t) => (
                      <li key={t} className="chip h-7 text-label-md">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span className="icon-btn bg-surface-lowest text-on-surface transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </a>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
