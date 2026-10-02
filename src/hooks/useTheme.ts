import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

/**
 * Not `theme`: the previous site wrote that key on every visit (dark for anyone
 * whose OS was dark), so honouring it would override the light default.
 */
export const THEME_KEY = 'color-theme'

/**
 * Theme lives on `<html data-theme>`, which sets `color-scheme`; everything
 * else resolves through CSS `light-dark()`. Light is the default. The initial
 * value is set by an inline script in index.html so there is no flash before
 * hydration; this hook reads it and only persists an explicit toggle.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'light'
    return (document.documentElement.dataset.theme as Theme) ?? 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(THEME_KEY, next)
      } catch {
        /* storage can be unavailable in private modes; not worth failing over */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
