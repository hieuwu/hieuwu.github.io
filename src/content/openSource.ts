export type Contribution = {
  /** The pull request's actual title. */
  title: string
  href: string
  /** e.g. "#277": shown as the mono badge on the row */
  ref: string
  merged: boolean
  /** Diff size, for a sense of scale. */
  stat: string
}

export type OpenSourceProject = {
  id: string
  name: string
  org: string
  repoHref: string
  description: string
  tags: string[]
  contributions: Contribution[]
}

export const openSource: OpenSourceProject[] = [
  {
    id: 'supabase-kt',
    name: 'supabase-kt',
    org: 'supabase-community',
    repoHref: 'https://github.com/supabase-community/supabase-kt',
    description:
      'The Kotlin Multiplatform client for Supabase, and the library the rest of my Supabase work is built on. Contributions here land in the client itself rather than in an app around it.',
    tags: ['Kotlin Multiplatform', 'Ktor', 'Supabase'],
    contributions: [
      {
        title:
          'Separate PostgrestRequest, move Rpc execution alongside other requests, and cover with unit tests',
        ref: '#277',
        href: 'https://github.com/supabase-community/supabase-kt/pull/277',
        merged: true,
        stat: '+802 / −216 · 19 files',
      },
      {
        title: 'Set up iOS for the chat demo',
        ref: '#397',
        href: 'https://github.com/supabase-community/supabase-kt/pull/397',
        merged: true,
        stat: '+1,152 / −575 · 45 files',
      },
    ],
  },
  {
    id: 'supabase-kt-plugins',
    name: 'supabase-kt-plugins',
    org: 'supabase-community',
    repoHref: 'https://github.com/supabase-community/supabase-kt-plugins',
    description:
      'Companion plugins extending supabase-kt beyond the core client, keeping platform-specific integrations out of application code.',
    tags: ['Kotlin', 'OAuth', 'Apple targets'],
    contributions: [
      {
        title: 'Implement native Google OAuth for Apple targets',
        ref: '#45',
        href: 'https://github.com/supabase-community/supabase-kt-plugins/pull/45',
        merged: true,
        stat: '+239 / −9 · 9 files',
      },
    ],
  },
  {
    id: 'ark-rate',
    name: 'ARK-Rate',
    org: 'ARK-Builders',
    repoHref: 'https://github.com/ARK-Builders/ARK-Rate',
    description:
      'The open-source currency app behind Ark Rates. I built the Wear OS companion and the home-screen widget, and contribute to the Android app itself.',
    tags: ['Android', 'Wear OS', 'Glance', 'Compose'],
    contributions: [
      {
        title: 'Implement the watch app for quick calculation',
        ref: '#163',
        href: 'https://github.com/ARK-Builders/Rate/pull/163',
        merged: true,
        stat: '+3,426 / −26 · 70 files',
      },
      {
        title: 'Implement pinned pairs in the app widget',
        ref: '#100',
        href: 'https://github.com/ARK-Builders/Rate/pull/100',
        merged: true,
        stat: '+524 / −13 · 17 files',
      },
    ],
  },
]
