import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

/**
 * Theme lives on `<html data-theme>`, which is what Astryx's `color-scheme`
 * rules key off. Everything else resolves through CSS `light-dark()`.
 * The initial value is set by an inline script in index.html so there is no
 * flash before hydration; this hook just reads and updates it.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'light'
    return (document.documentElement.dataset.theme as Theme) ?? 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage can be unavailable in private modes; not worth failing over */
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
