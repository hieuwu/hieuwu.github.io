import { ArrowUp } from 'lucide-react'
import { navItems, profile, socials } from '@/content/site'
import { resolveSocialIcon } from '@/components/ui/icons'
import { Monogram } from './Nav'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="px-3 pb-3 pt-0 sm:px-4 sm:pb-4">
      <div className="mx-auto mt-3 w-full rounded-[2rem] bg-surface-container px-5 py-12 sm:rounded-[3rem] sm:px-8 sm:py-14">
        <div className="mx-auto grid max-w-content gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div>
            <div className="flex items-center gap-3">
              <Monogram />
              <span className="type-headline text-title-lg text-on-surface">{profile.name}</span>
            </div>
            <p className="mt-3 max-w-sm text-body-md text-on-surface-variant">
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
                      className="btn btn-sm bg-surface-lowest text-on-surface-variant hover:text-on-surface"
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
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-1 sm:text-right">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="btn btn-text btn-sm text-on-surface-variant hover:text-primary">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mx-auto mt-10 flex max-w-content flex-col-reverse items-start justify-between gap-4 border-t border-outline-variant pt-6 sm:flex-row sm:items-center">
          <p className="text-body-sm text-on-surface-variant">
            © {year} {profile.name}. Built with React, Vite and{' '}
            <a
              href="https://m3.material.io/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary underline decoration-outline-variant underline-offset-4 hover:decoration-primary"
            >
              Material 3 Expressive
            </a>
            .
          </p>
          <a href="#top" className="btn btn-tonal btn-sm group">
            Back to top
            <ArrowUp className="h-4 w-4 transition-transform duration-medium ease-spring-fast group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
