import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { navItems, profile } from '@/content/site'
import { useTheme } from '@/hooks/useTheme'

export function Nav() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight whichever section currently owns the upper part of the viewport.
  useEffect(() => {
    const sections = navItems
      .map((i) => document.querySelector(i.href))
      .filter((el): el is Element => Boolean(el))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-element focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:shadow-high"
      >
        Skip to content
      </a>

      <header
        className={[
          'fixed inset-x-0 top-0 z-40 transition-all duration-medium ease-standard',
          scrolled
            ? 'border-b border-line bg-body/85 backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent',
        ].join(' ')}
      >
        <nav className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          >
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-inner bg-accent-bg font-mono text-xs font-bold text-on-accent transition-transform duration-fast ease-emphasized group-hover:scale-105"
            >
              HV
            </span>
            <span className="text-primary">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={[
                    'relative rounded-full px-3.5 py-2 text-sm transition-colors duration-fast',
                    active === item.href
                      ? 'text-primary'
                      : 'text-secondary hover:text-primary',
                  ].join(' ')}
                >
                  {active === item.href && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-tint-hover"
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-secondary transition-all duration-fast hover:border-line-strong hover:text-primary"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" strokeWidth={1.75} />
              ) : (
                <Moon className="h-4 w-4" strokeWidth={1.75} />
              )}
            </button>

            <a
              href="#collaborate"
              className="hidden rounded-full bg-accent-bg px-4 py-2 text-sm font-semibold text-on-accent transition-all duration-fast ease-emphasized hover:-translate-y-px hover:shadow-med sm:inline-block"
            >
              Work with me
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-secondary md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        className={[
          'fixed inset-0 z-30 md:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={[
            'absolute inset-0 bg-overlay transition-opacity duration-medium',
            open ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />
        <div
          className={[
            'absolute inset-x-3 top-[4.5rem] rounded-container border border-line bg-popover p-3 shadow-high transition-all duration-medium ease-emphasized',
            open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
          ].join(' ')}
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-element px-4 py-3 text-base text-secondary transition-colors duration-fast hover:bg-tint-hover hover:text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#collaborate"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-element bg-accent-bg px-4 py-3 text-center text-base font-semibold text-on-accent"
          >
            Work with me
          </a>
        </div>
      </div>
    </>
  )
}
