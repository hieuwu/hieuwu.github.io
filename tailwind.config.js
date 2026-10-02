/**
 * Tailwind ← Material 3 bridge.
 *
 * Every colour utility resolves to an M3 colour role defined in
 * src/styles/theme-m3.css, so `bg-primary-container text-on-primary-container`
 * reads exactly like the M3 spec and follows light/dark automatically.
 *
 * Astryx's reset is still used instead of Tailwind Preflight. It lives in the
 * `reset` cascade layer; Tailwind v3 emits unlayered CSS, which always wins.
 */

const role = (name) => `var(--md-${name})`

/** Colour role that also supports Tailwind's `/opacity` modifier, via color-mix. */
const color = (name) => ({ opacityValue }) =>
  opacityValue === undefined || opacityValue === '1'
    ? role(name)
    : `color-mix(in srgb, ${role(name)} calc(${opacityValue} * 100%), transparent)`

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
        primary: color('primary'),
        'on-primary': color('on-primary'),
        'primary-container': color('primary-container'),
        'on-primary-container': color('on-primary-container'),
        'primary-fixed-dim': color('primary-fixed-dim'),

        secondary: color('secondary'),
        'on-secondary': color('on-secondary'),
        'secondary-container': color('secondary-container'),
        'on-secondary-container': color('on-secondary-container'),

        tertiary: color('tertiary'),
        'on-tertiary': color('on-tertiary'),
        'tertiary-container': color('tertiary-container'),
        'on-tertiary-container': color('on-tertiary-container'),

        surface: color('surface'),
        'surface-lowest': color('surface-container-lowest'),
        'surface-low': color('surface-container-low'),
        'surface-container': color('surface-container'),
        'surface-high': color('surface-container-high'),
        'surface-highest': color('surface-container-highest'),
        'on-surface': color('on-surface'),
        'on-surface-variant': color('on-surface-variant'),
        outline: color('outline'),
        'outline-variant': color('outline-variant'),

        'inverse-surface': color('inverse-surface'),
        'inverse-on-surface': color('inverse-on-surface'),
        'inverse-primary': color('inverse-primary'),
        scrim: color('scrim'),
      },

      fontFamily: {
        sans: role('font-plain'),
        display: role('font-brand'),
        mono: role('font-code'),
      },

      // M3 type scale, with the display sizes nudged up for a marketing page.
      fontSize: {
        'label-sm': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.04em' }],
        'label-md': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.03em' }],
        'label-lg': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.25rem' }],
        'body-md': ['0.9375rem', { lineHeight: '1.5rem' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.7rem' }],
        'title-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'title-md': ['1rem', { lineHeight: '1.5rem' }],
        'title-lg': ['1.375rem', { lineHeight: '1.75rem' }],
        'headline-sm': ['1.5rem', { lineHeight: '2rem' }],
        'headline-md': ['1.75rem', { lineHeight: '2.25rem' }],
        'headline-lg': ['2.25rem', { lineHeight: '2.6rem' }],
        'display-sm': ['2.75rem', { lineHeight: '1.08' }],
        'display-md': ['3.5rem', { lineHeight: '1.04' }],
        'display-lg': ['4.5rem', { lineHeight: '1' }],
        'display-xl': ['5.75rem', { lineHeight: '0.96' }],
      },

      borderRadius: {
        xs: role('shape-xs'),
        sm: role('shape-sm'),
        md: role('shape-md'),
        lg: role('shape-lg'),
        'lg-inc': role('shape-lg-inc'),
        xl: role('shape-xl'),
        'xl-inc': role('shape-xl-inc'),
        '2xl': role('shape-2xl'),
        full: role('shape-full'),
      },

      boxShadow: {
        e1: role('elevation-1'),
        e2: role('elevation-2'),
        e3: role('elevation-3'),
        e4: role('elevation-4'),
      },

      transitionTimingFunction: {
        spring: role('spring'),
        'spring-fast': role('spring-fast'),
        emphasized: role('ease-emphasized'),
        standard: role('ease-standard'),
      },

      transitionDuration: {
        short: '200ms',
        medium: '400ms',
        long: '600ms',
      },

      maxWidth: {
        content: '76rem',
        prose: '44rem',
      },

      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px) scale(0.98)' },
          to: { opacity: '1', transform: 'none' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        spin: {
          to: { rotate: '360deg' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.9)', opacity: '0' },
        },
      },

      animation: {
        'fade-up': 'fade-up 700ms cubic-bezier(0.2, 0, 0, 1) both',
        marquee: 'marquee 46s linear infinite',
        'spin-slow': 'spin 40s linear infinite',
        'spin-slower': 'spin 70s linear infinite',
        pulse: 'pulse 2.2s cubic-bezier(0.2, 0, 0, 1) infinite',
      },
    },
  },
  plugins: [],
}
