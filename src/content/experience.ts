/**
 * Roles, newest first.
 *
 * Companies, dates and products are as supplied. The NAB job title comes from
 * the previous version of this site (preserved in `_archive-old-site/`); the
 * EPOS one is still blank, add it below and it renders automatically.
 *
 * `summary` and `points` are optional. Fill either in when you want a role to
 * say more than the products it covered.
 */

export type Role = {
  company: string
  /** Omitted until confirmed: the row renders fine without it. */
  title?: string
  period: string
  location?: string
  /** Products or platforms worked on. */
  products: string[]
  summary?: string
  points?: string[]
  stack?: string[]
}

export const experience: Role[] = [
  {
    company: 'Grab',
    title: 'Senior Software Engineer, Android',
    period: 'August 2026 to present',
    location: 'Ho Chi Minh City',
    products: ['Mobile Shared Libraries'],
  },
  {
    company: 'National Australia Bank',
    title: 'Android Engineer',
    period: 'April 2022 to July 2026',
    location: 'Ho Chi Minh City',
    products: ['Mobile Banking', 'CCOM'],
  },
  {
    company: 'EPOS Vietnam',
    period: 'March 2021 to March 2022',
    location: 'Ho Chi Minh City',
    products: ['EPOS', 'Stock Take app'],
  },
]
