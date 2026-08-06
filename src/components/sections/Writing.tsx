import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { posts } from '@/content/blog'

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
          className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-primary transition-all duration-fast hover:border-line-strong hover:bg-tint-hover"
        >
          Read on Medium
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      }
    >
      <ul className="overflow-hidden rounded-container border border-line">
        {posts.map((post, i) => (
          <Reveal as="li" key={post.href} delay={Math.min(i, 4) * 0.04}>
            <a
              href={post.href}
              target="_blank"
              rel="noreferrer noopener"
              className={[
                'group flex flex-col gap-3 bg-card p-6 transition-colors duration-medium',
                'hover:bg-subtle sm:flex-row sm:items-center sm:gap-8',
                i > 0 ? 'border-t border-line' : '',
              ].join(' ')}
            >
              <span className="hidden shrink-0 font-mono text-sm tabular-nums text-muted sm:block">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono text-2xs uppercase tracking-[0.16em] text-accent">
                    {post.series}
                  </span>
                  <span aria-hidden className="text-muted">
                    ·
                  </span>
                  <span className="text-2xs uppercase tracking-wide text-muted">
                    {post.publication}
                  </span>
                </div>
                <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.01em] text-primary transition-colors duration-fast group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-1.5 max-w-prose text-sm text-secondary">{post.blurb}</p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <ul className="hidden gap-2 lg:flex">
                  {post.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line px-2.5 py-1 text-2xs font-medium text-secondary"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
