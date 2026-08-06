/**
 * Identity, contact links and navigation.
 * Everything user-facing on the site is sourced from src/content, edit here,
 * not in the components.
 */

export const profile = {
  name: 'Hieu Vu',
  shortName: 'Hieu',
  role: 'Senior Software Engineer',
  /** The specialty line under the title. */
  specialty: 'Android & Kotlin Multiplatform',
  location: 'Ho Chi Minh City, Vietnam',
  available: true,
  availableLabel: 'Open to KMP & Android work',
  /** One line, used in the hero. */
  headline: 'I build mobile products that hold up in the real world.',
  /** Hero body copy. */
  intro:
    'Android and Kotlin Multiplatform engineer focused on reliable, scalable mobile products: clean, modular architecture, offline-first experiences, and the unglamorous release work that keeps apps shipping. I have taken apps from an empty module to a staged rollout on both stores, and I maintain them afterwards.',
  /** Short second paragraph in the About block. */
  about:
    'Most of my work sits where architecture meets delivery: designing module boundaries that survive a year of feature work, keeping data correct when the network is not, wiring CI so releases are boring, and watching startup, memory and crash numbers after the rollout. I share what I learn through the Supadroid series and by contributing back to the Kotlin/Supabase ecosystem I depend on.',
  avatar: '/assets/img/profile.webp',
} as const

export type SocialLink = {
  label: string
  handle: string
  href: string
  /** lucide-react icon name, resolved in the component layer */
  icon: 'github' | 'linkedin' | 'pen-line' | 'twitter' | 'mail'
}

export const socials: SocialLink[] = [
  {
    label: 'GitHub',
    handle: '@hieuwu',
    href: 'https://github.com/hieuwu',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    handle: 'in/hieuvu99',
    href: 'https://www.linkedin.com/in/hieuvu99/',
    icon: 'linkedin',
  },
  {
    label: 'Medium',
    handle: 'hieuwu.medium.com',
    href: 'https://hieuwu.medium.com/',
    icon: 'pen-line',
  },
  {
    label: 'X',
    handle: '@hieuwu99',
    href: 'https://x.com/hieuwu99',
    icon: 'twitter',
  },
]

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Writing', href: '#writing' },
  { label: 'Experience', href: '#experience' },
] as const

