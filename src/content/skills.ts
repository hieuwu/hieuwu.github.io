export type SkillGroup = {
  id: string
  title: string
  /** lucide-react icon name, resolved in the component layer */
  icon: 'smartphone' | 'rocket' | 'database' | 'gauge' | 'layers'
  summary: string
  skills: string[]
  /** The two or three that matter most: rendered with the accent treatment. */
  featured?: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'mobile',
    title: 'Mobile Development',
    icon: 'smartphone',
    summary:
      'Kotlin-first Android and shared KMP codebases, structured around clean module boundaries and testable state.',
    featured: ['Kotlin', 'Jetpack Compose', 'Kotlin Multiplatform'],
    skills: [
      'Kotlin',
      'Jetpack Compose',
      'Kotlin Multiplatform',
      'Clean / Modular Architecture',
      'Coroutines & Flow',
      'Hilt',
      'Room',
      'WorkManager',
      'Navigation',
      'Unit & UI Testing',
    ],
  },
  {
    id: 'release',
    title: 'Build & Release',
    icon: 'rocket',
    summary:
      'Getting builds out repeatably: signed, staged, reviewed, and reversible when something looks wrong.',
    featured: ['CI/CD', 'Staged rollouts'],
    skills: [
      'CI/CD',
      'Play Store releases',
      'App Store releases',
      'Staged rollouts',
      'Store compliance & policy',
      'Release automation',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Data',
    icon: 'database',
    summary:
      'Supabase end to end, plus the sync and caching patterns that let an app stay useful with no connection.',
    featured: ['Supabase', 'Offline-first'],
    skills: [
      'Supabase Auth',
      'Supabase Storage',
      'Realtime',
      'Edge Functions',
      'Webhooks',
      'Offline-first patterns',
      'Local caching & sync',
    ],
  },
  {
    id: 'quality',
    title: 'Quality & Reliability',
    icon: 'gauge',
    summary:
      'Measuring before optimising: startup traces, memory profiles, battery impact, and what the crash data says after release.',
    featured: ['Performance', 'Observability'],
    skills: [
      'Static code analysis',
      'Startup optimisation',
      'Memory profiling',
      'Battery & background work',
      'Observability',
      'Incident management',
    ],
  },
  {
    id: 'other',
    title: 'Also In The Toolkit',
    icon: 'layers',
    summary: 'Surfaces and integrations that extend an app beyond its main screen.',
    featured: ['RevenueCat', 'Wear OS'],
    skills: ['In-App Purchases (RevenueCat)', 'Wear OS', 'App Widgets', 'Deep links'],
  },
]
