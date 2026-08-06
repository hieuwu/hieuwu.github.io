import { ArrowUpRight, GitPullRequest, Github } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { openSource } from '@/content/openSource'

export function OpenSource() {
  return (
    <Section
      id="open-source"
      tone="deep"
      eyebrow="Open Source"
      title="I fix the libraries I depend on."
      lead="When something is missing in a library my apps rely on, the fix belongs upstream. These are the repos where that has happened."
      aside={
        <a
          href="https://github.com/hieuwu"
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-primary transition-all duration-fast hover:border-line-strong hover:bg-tint-hover"
        >
          <Github className="h-4 w-4" />
          All repositories
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-fast group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      }
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {openSource.map((repo, i) => (
          <Reveal
            as="article"
            key={repo.id}
            delay={i * 0.06}
            className="surface-card group flex flex-col p-6 transition-all duration-medium ease-emphasized hover:-translate-y-1 hover:border-line-strong hover:shadow-med"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
                  {repo.org}
                </p>
                <h3 className="mt-1 truncate font-mono text-lg font-semibold text-primary">
                  {repo.name}
                </h3>
              </div>
              <a
                href={repo.repoHref}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${repo.name} on GitHub`}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-secondary transition-all duration-fast hover:border-line-strong hover:text-primary"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-4 text-sm text-secondary">{repo.description}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {repo.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line bg-subtle px-2.5 py-1 text-2xs font-medium text-secondary"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="my-5 rule-fade" />

            <ul className="mt-auto flex flex-col gap-1">
              {repo.contributions.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group/pr -mx-2 flex gap-3 rounded-element px-2 py-2.5 transition-colors duration-fast hover:bg-tint-hover"
                  >
                    <GitPullRequest
                      className={`mt-0.5 h-4 w-4 shrink-0 ${c.merged ? 'text-accent' : 'text-muted'}`}
                      strokeWidth={1.75}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium leading-snug text-primary">
                        {c.title}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-x-2 font-mono text-2xs text-muted">
                        <span>{c.ref}</span>
                        <span aria-hidden>·</span>
                        <span>{c.stat}</span>
                        {c.merged && (
                          <span
                            className="rounded-full px-1.5 py-0.5 font-semibold uppercase tracking-wide text-accent"
                            style={{
                              backgroundColor:
                                'color-mix(in oklab, var(--color-accent) 14%, transparent)',
                            }}
                          >
                            Merged
                          </span>
                        )}
                      </span>
                    </span>
                    <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-fast group-hover/pr:translate-x-0.5 group-hover/pr:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
