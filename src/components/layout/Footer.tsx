import { ArrowUp } from 'lucide-react'
import { navItems, profile, socials } from '@/content/site'
import { resolveSocialIcon } from '@/components/ui/icons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-content px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="grid h-7 w-7 place-items-center rounded-inner bg-accent-bg font-mono text-xs font-bold text-on-accent"
              >
                HV
              </span>
              <span className="text-sm font-semibold text-primary">{profile.name}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-secondary">
              {profile.role} · {profile.location}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = resolveSocialIcon(s.icon)
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm text-secondary transition-all duration-fast hover:-translate-y-0.5 hover:border-line-strong hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{s.handle}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-1 sm:text-right">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-secondary transition-colors duration-fast hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 rule-fade" />

        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">
            © {year} {profile.name}. Built with React, Vite and{' '}
            <a
              href="https://astryx.atmeta.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-secondary underline decoration-line underline-offset-4 transition-colors duration-fast hover:text-accent"
            >
              Astryx
            </a>
            .
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-xs text-secondary transition-colors duration-fast hover:text-primary"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-fast group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
