import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react'
import { navItems, profile } from '@/content/site'
import { useTheme } from '@/hooks/useTheme'
import { Shape } from '@/components/ui/Shape'

/** Logo mark: a 12-scallop cookie that blooms into a flower on hover. */
export function Monogram({ size = 'h-10 w-10' }: { size?: string }) {
  return (
    <span className={`relative grid ${size} shrink-0 place-items-center`}>
      <Shape
        as="span"
        name="cookie-12"
        hover="flower"
        hoverRotate={22}
        className="absolute inset-0 bg-primary"
      />
      <span className="type-label relative text-[0.8rem] font-extrabold tracking-tight text-on-primary">
        HV
      </span>
    </span>
  )
}

/**
 * An M3 Expressive floating toolbar: a single pill that hovers over the page,
 * with the active destination marked by a tonal indicator that springs between
 * items (shared layout animation).
 */
export function Nav() {
  const { theme, toggle } = useTheme()
  const reduced = useReducedMotion()
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

  const spring = reduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 520, damping: 34 }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-label-lg focus:text-on-primary"
      >
        Skip to content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
        <nav
          className={[
            'pointer-events-auto mx-auto flex h-16 w-full max-w-content items-center justify-between gap-3 rounded-full pl-3 pr-2.5',
            'transition-[background-color,box-shadow] duration-medium ease-standard',
            scrolled || open
              ? 'bg-surface-container shadow-e3'
              : 'bg-surface-low/0 shadow-none',
          ].join(' ')}
        >
          <a href="#top" className="group flex items-center gap-3 rounded-full pr-2">
            <Monogram />
            <span className="type-headline text-title-md text-on-surface">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.href
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={[
                      'type-label relative flex h-11 items-center rounded-full px-4 text-label-lg transition-colors duration-short',
                      isActive
                        ? 'text-on-secondary-container'
                        : 'text-on-surface-variant hover:bg-on-surface/[0.06] hover:text-on-surface',
                    ].join(' ')}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        transition={spring}
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-secondary-container"
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="icon-btn text-on-surface-variant"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={reduced ? false : { rotate: -90, scale: 0.4, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={reduced ? undefined : { rotate: 90, scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 26 }}
                  className="grid place-items-center"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>

            <a href="#collaborate" className="btn btn-filled hidden sm:inline-flex">
              Work with me
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="icon-btn bg-secondary-container text-on-secondary-container lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <motion.div
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute inset-x-3 top-[5.25rem] origin-top rounded-xl bg-surface-high p-3 shadow-e4 sm:inset-x-5"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scaleY: 0.7, y: -12 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scaleY: 0.85, y: -8 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={[
                        'type-headline flex items-center justify-between rounded-lg px-5 py-4 text-title-lg transition-colors duration-short',
                        active === item.href
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'text-on-surface hover:bg-on-surface/[0.06]',
                      ].join(' ')}
                    >
                      {item.label}
                      <ArrowRight className="h-5 w-5 opacity-60" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href="#collaborate"
                onClick={() => setOpen(false)}
                className="btn btn-filled btn-lg mt-3 w-full"
              >
                Work with me
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
