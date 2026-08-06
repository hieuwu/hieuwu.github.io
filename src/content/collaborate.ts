export type Offer = {
  title: string
  description: string
  icon: 'smartphone' | 'layers' | 'rocket' | 'gauge'
}

export const offers: Offer[] = [
  {
    title: 'Ship an Android or KMP app',
    icon: 'smartphone',
    description:
      'From an empty repo to a staged store rollout, covering architecture, feature work and the release plumbing in between.',
  },
  {
    title: 'Take an existing app multiplatform',
    icon: 'layers',
    description:
      'Carving a shared Kotlin core out of an Android codebase without freezing feature work or flattening the iOS experience.',
  },
  {
    title: 'Fix a release process',
    icon: 'rocket',
    description:
      'CI/CD, signing, staged rollouts and store compliance, so shipping stops being an event.',
  },
  {
    title: 'Stabilise a struggling app',
    icon: 'gauge',
    description:
      'Startup time, memory, battery drain and crash rate, measured first and then fixed in priority order.',
  },
]

export const collaborate = {
  heading: 'Work with me',
  intro:
    "I take on a small number of engagements at a time: contract, part-time, or a focused piece of consulting. If any of the below sounds like your situation, tell me what you're building and where it hurts.",
  ctaLabel: 'Start a conversation',
  ctaHref: 'https://www.linkedin.com/in/hieuvu99/',
  secondaryLabel: 'See the code',
  secondaryHref: 'https://github.com/hieuwu',
  responseNote: 'Usually replies within a couple of days · Based in Ho Chi Minh City (GMT+7)',
} as const
