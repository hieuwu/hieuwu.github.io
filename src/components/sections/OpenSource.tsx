import { ArrowUpRight, GitMerge, GitPullRequest, Github } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Shape } from '@/components/ui/Shape'
import { openSource } from '@/content/openSource'

export function OpenSource() {
  return (
    <Section
      id="open-source"
      tone="primary"
      eyebrow="Open Source"
      title="I fix the libraries I depend on."
      lead="When something is missing in a library my apps rely on, the fix belongs upstream. These are the repos where that has happened."
      aside={
        <a
          href="https://github.com/hieuwu"
          target="_blank"
          rel="noreferrer noopener"
          // Explicit roles: the header remaps primary/on-surface for the block.
          className="btn btn-lg group bg-surface-lowest"
          style={{ color: 'var(--md-on-primary-container)' }}
        >
          <Github className="h-5 w-5" />
          All repositories
          <ArrowUpRight className="h-4 w-4 transition-transform duration-medium ease-spring-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      }
    >
      <div className="grid gap-3 lg:grid-cols-3">
        {openSource.map((repo, i) => (
          <Reveal key={repo.id} delay={i * 0.07}>
            <article className="card card-interactive group flex h-full flex-col bg-surface-lowest p-6 sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="relative grid h-12 w-12 shrink-0 place-items-center">
                    <Shape
                      name="cookie-9"
                      hover="flower"
                      hoverRotate={20}
                      className="absolute inset-0 bg-primary-container"
                    />
                    <Github className="relative h-5 w-5 text-on-primary-container" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-label-md text-on-surface-variant">{repo.org}</p>
                    <h3 className="type-headline truncate text-title-lg text-on-surface">
                      {repo.name}
                    </h3>
                  </div>
                </div>
                <a
                  href={repo.repoHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${repo.name} on GitHub`}
                  className="icon-btn shrink-0 text-on-surface-variant"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>

              <p className="mt-5 text-body-md text-on-surface-variant">{repo.description}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {repo.tags.map((t) => (
                  <li key={t} className="chip h-7 text-label-md">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <ul className="flex flex-col gap-1.5 rounded-lg bg-surface-low p-1.5">
                  {repo.contributions.map((c) => (
                    <li key={c.href}>
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group/pr flex gap-3 rounded-md px-3 py-3 transition-[background-color,border-radius] duration-medium ease-spring-fast hover:rounded-lg hover:bg-surface-lowest"
                      >
                        {c.merged ? (
                          <GitMerge className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        ) : (
                          <GitPullRequest className="mt-0.5 h-4 w-4 shrink-0 text-on-surface-variant" />
                        )}
                        <span className="min-w-0 flex-1">
                          <span className="type-label block text-title-sm leading-snug text-on-surface">
                            {c.title}
                          </span>
                          <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-label-md text-on-surface-variant">
                            <span>{c.ref}</span>
                            <span aria-hidden>·</span>
                            <span>{c.stat}</span>
                            {c.merged && (
                              <span className="type-label rounded-full bg-primary-container px-2 py-0.5 text-label-sm text-on-primary-container">
                                Merged
                              </span>
                            )}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
