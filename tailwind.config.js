/**
 * Tailwind ← Astryx bridge.
 *
 * Astryx ships a `tailwind-theme.css` bridge for Tailwind v4. We're on v3 (so the
 * site still builds on Node 18), so the same mapping lives here instead: every
 * utility resolves to an Astryx CSS custom property, which means theme switching
 * (light/dark, or swapping the theme package) just works — nothing is hard-coded.
 *
 * Astryx's own reset is used instead of Tailwind Preflight. Astryx styles live in
 * cascade layers (`reset` → `astryx-base` → `astryx-theme`); Tailwind v3 emits
 * unlayered CSS, which always wins, so utilities reliably override components.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', 'html[data-theme="dark"]'],
  corePlugins: {
    preflight: false, // @astryxdesign/core/reset.css owns the reset
  },
  theme: {
    extend: {
      colors: {
        // --- Text ---------------------------------------------------------
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        muted: 'var(--color-text-muted)',
        disabled: 'var(--color-text-disabled)',
        accent: 'var(--color-text-accent)',

        // --- Surfaces -----------------------------------------------------
        body: 'var(--color-background-body)',
        surface: 'var(--color-background-surface)',
        card: 'var(--color-background-card)',
        popover: 'var(--color-background-popover)',
        subtle: 'var(--color-background-muted)',
        inverted: 'var(--color-background-inverted)',

        // --- Interactive --------------------------------------------------
        'accent-bg': 'var(--color-accent)',
        'accent-muted': 'var(--color-accent-muted)',
        'on-accent': 'var(--color-on-accent)',
        'tint-hover': 'var(--color-tint-hover)',
        'overlay-hover': 'var(--color-overlay-hover)',

        // --- Borders ------------------------------------------------------
        line: 'var(--color-border)',
        'line-strong': 'var(--color-border-emphasized)',

        // --- Brand ramps ---------------------------------------------------
        twilight: {
          DEFAULT: 'var(--twilight-500)',
          100: 'var(--twilight-100)',
          200: 'var(--twilight-200)',
          300: 'var(--twilight-300)',
          400: 'var(--twilight-400)',
          500: 'var(--twilight-500)',
          600: 'var(--twilight-600)',
          800: 'var(--twilight-800)',
          900: 'var(--twilight-900)',
        },
        teal: {
          DEFAULT: 'var(--teal-500)',
          100: 'var(--teal-100)',
          300: 'var(--teal-300)',
          500: 'var(--teal-500)',
          700: 'var(--teal-700)',
          900: 'var(--teal-900)',
        },
        surf: {
          DEFAULT: 'var(--surf-500)',
          100: 'var(--surf-100)',
          300: 'var(--surf-300)',
          500: 'var(--surf-500)',
          700: 'var(--surf-700)',
          900: 'var(--surf-900)',
        },
        frost: 'var(--frost-500)',
        cyan: 'var(--cyan-500)',
      },

      fontFamily: {
        sans: 'var(--font-family-body)',
        display: 'var(--font-family-heading)',
        mono: 'var(--font-family-code)',
      },

      fontSize: {
        // Astryx ramp, re-scaled for a marketing surface in theme-ocean.css
        '2xs': ['var(--font-size-2xs)', { lineHeight: '1.5' }],
        xs: ['var(--font-size-xs)', { lineHeight: '1.5' }],
        sm: ['var(--font-size-sm)', { lineHeight: '1.6' }],
        base: ['var(--font-size-base)', { lineHeight: '1.65' }],
        lg: ['var(--font-size-lg)', { lineHeight: '1.6' }],
        xl: ['var(--font-size-xl)', { lineHeight: '1.45' }],
        '2xl': ['var(--font-size-2xl)', { lineHeight: '1.3' }],
        '3xl': ['var(--font-size-3xl)', { lineHeight: '1.22' }],
        '4xl': ['var(--font-size-4xl)', { lineHeight: '1.14' }],
        '5xl': ['var(--font-size-5xl)', { lineHeight: '1.08' }],
        '6xl': ['var(--font-size-6xl)', { lineHeight: '1.04' }],
      },

      borderRadius: {
        none: 'var(--radius-none)',
        inner: 'var(--radius-inner)',
        element: 'var(--radius-element)',
        container: 'var(--radius-container)',
        page: 'var(--radius-page)',
        full: 'var(--radius-full)',
      },

      boxShadow: {
        low: 'var(--shadow-low)',
        med: 'var(--shadow-med)',
        high: 'var(--shadow-high)',
        glow: '0 0 0 1px var(--color-border), 0 18px 48px -18px var(--accent-glow)',
      },

      spacing: {
        1: 'var(--spacing-1)',
        2: 'var(--spacing-2)',
        3: 'var(--spacing-3)',
        4: 'var(--spacing-4)',
        5: 'var(--spacing-5)',
        6: 'var(--spacing-6)',
        7: 'var(--spacing-7)',
        8: 'var(--spacing-8)',
        9: 'var(--spacing-9)',
        10: 'var(--spacing-10)',
        11: 'var(--spacing-11)',
        12: 'var(--spacing-12)',
      },

      transitionDuration: {
        fast: 'var(--duration-fast)',
        medium: 'var(--duration-medium)',
        slow: 'var(--duration-slow)',
      },

      transitionTimingFunction: {
        standard: 'var(--ease-standard, cubic-bezier(0.2, 0, 0, 1))',
        emphasized: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      maxWidth: {
        content: '72rem',
        prose: '46rem',
      },

      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },

      animation: {
        'fade-up': 'fade-up var(--duration-slow) cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 42s linear infinite',
      },
    },
  },
  plugins: [],
}
