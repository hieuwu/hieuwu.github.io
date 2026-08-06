export type StoreLink = { kind: 'appStore' | 'playStore'; href: string }

export type Shot = {
  src: string
  alt: string
  platform: 'ios' | 'android'
  /**
   * Intrinsic pixel size. Rendered as width/height attributes so the browser
   * knows each shot's aspect ratio before it loads, without them the floating
   * pair has no width and the images never come into view to load.
   * `npm run optimize:shots` prints these.
   */
  w: number
  h: number
  /**
   * True when the capture is a bare screen recording with no device bezel, so
   * the component draws one. Most captures already ship with a frame; the
   * Supabuckt iOS ones don't.
   */
  framed?: boolean
}

/**
 * Colours are lifted from each app's own theme file rather than eyeballed, so a
 * showcase looks like the product it is advertising.
 *
 * - `base`  , the vivid brand colour: glow, ticks, the dot in the kicker.
 * - `deep`  , a darker cut of it that clears 4.5:1 against white, for solid fills.
 * - `spark` , the app's secondary, used once per card so it isn't monochrome.
 * - `panel*`, the app's own background colour, used solid for the visual panel.
 * - `on*`   , readable accent text on that panel.
 */
export type Accent = {
  base: string
  deep: string
  spark: string
  panelLight: string
  panelDark: string
  onPanelLight: string
  onPanelDark: string
}

export type Project = {
  id: string
  name: string
  /** Short category, shown in the solid pill above the headline. */
  kicker: string
  /** Big display line. Written to end with a full stop. */
  headline: string
  /** One or two sentences. Placeholder-friendly: rewrite freely. */
  description: string
  status: string
  platforms: string[]
  /** Tech label whose brand mark is used as the panel's faded watermark. */
  watermark: string
  accent: Accent
  /** Three, one line each. Any more and the section stops being scannable. */
  bullets: string[]
  stack: string[]
  stores: StoreLink[]
  links: { label: string; href: string }[]
  /** Two shots: the first floats in front, the second sits behind it. */
  shots: Shot[]
}

export const projects: Project[] = [
  {
    id: 'kudos-snap',
    name: 'Kudos Snap',
    kicker: 'AI recognition',
    headline: 'Recognition that sounds like you meant it.',
    description:
      'Pick a teammate and a tone. The app drafts a specific, non-generic kudos you can send or edit, then keeps track of who you have recognised. One Kotlin Multiplatform codebase, shipped to both stores in the same release.',
    status: 'Live on both stores',
    platforms: ['iOS', 'Android'],
    watermark: 'Kotlin Multiplatform',
    // Solar Blaze / Volt Yellow over Radiant White and Void Black.
    accent: {
      base: '#FF3D00',
      deep: '#D63000',
      spark: '#FFE57F',
      panelLight: '#FFF9E6',
      panelDark: '#232323',
      onPanelLight: '#A32400',
      onPanelDark: '#FFE57F',
    },
    bullets: [
      'Shared KMP domain, native Compose and SwiftUI on top',
      'AI drafting behind a Supabase Edge Function, so no keys ship in the client',
      'RevenueCat entitlements resolved server-side, consistent across stores',
    ],
    stack: ['Kotlin Multiplatform', 'Jetpack Compose', 'SwiftUI', 'Supabase', 'RevenueCat'],
    stores: [
      {
        kind: 'appStore',
        href: 'https://apps.apple.com/us/app/kudos-snap-ai-kudos-message/id6759520257',
      },
      {
        kind: 'playStore',
        href: 'https://play.google.com/store/apps/details?id=com.crafted.kudossnap.android',
      },
    ],
    links: [{ label: 'kudossnap.app', href: 'https://kudossnap.app/' }],
    shots: [
      {
        src: '/assets/showcases/kudossnap/ios/kudos-feed.webp',
        alt: 'Kudos Snap feed on iOS showing sent kudos with tone tags',
        platform: 'ios',
        w: 720,
        h: 1432,
      },
      {
        src: '/assets/showcases/kudossnap/android/give-kudos.webp',
        alt: 'Give kudos composer on Android',
        platform: 'android',
        w: 720,
        h: 1516,
      },
    ],
  },

  {
    id: 'supabuckt',
    name: 'Supabuckt',
    kicker: 'Storage client',
    headline: 'Your Supabase Storage, in your pocket.',
    description:
      'Attach one or more Supabase projects, move through buckets and folders, preview and upload files, and star the paths you touch constantly, all from a phone instead of a dashboard tab.',
    status: 'Live on both stores',
    platforms: ['iOS', 'Android'],
    watermark: 'Supabase',
    accent: {
      base: '#3ECF8E',
      deep: '#0B7A4C',
      spark: '#A7F3D0',
      panelLight: '#F2FBF7',
      panelDark: '#101815',
      onPanelLight: '#0B7A4C',
      onPanelDark: '#5BE0A5',
    },
    bullets: [
      'Multiple projects, keys held in Keystore and Keychain',
      'Browse, preview, upload and download from one shared repository layer',
      'Transfers resume after process death or a dropped connection',
    ],
    stack: ['Kotlin Multiplatform', 'Compose Multiplatform', 'supabase-kt', 'Ktor'],
    stores: [
      {
        kind: 'appStore',
        href: 'https://apps.apple.com/us/app/supabuckt-supabase-storage/id6759938222',
      },
      {
        kind: 'playStore',
        href: 'https://play.google.com/store/apps/details?id=com.hieuwu.supabasestorageclient',
      },
    ],
    links: [{ label: 'supabuckt', href: 'https://hieuwu.github.io/supabuckt-landing/' }],
    shots: [
      {
        src: '/assets/showcases/supabuckt/ios/buckets-grid.webp',
        alt: 'Supabuckt bucket grid on iOS',
        platform: 'ios',
        w: 720,
        h: 1565,
        framed: true,
      },
      {
        src: '/assets/showcases/supabuckt/android/browse-files-folders-grid-list-view.webp',
        alt: 'Browsing files and folders on Android',
        platform: 'android',
        w: 720,
        h: 1521,
      },
    ],
  },

  {
    id: 'ark-rates',
    name: 'Ark Rates',
    kicker: 'Currency & crypto',
    headline: "Rates that work when the signal doesn't.",
    description:
      'A converter for people who travel with patchy data. Rates are cached with the time they were fetched, so a conversion is always available and always honest about how fresh it is. I built the Wear OS companion and the home-screen widget.',
    status: 'Live · open source',
    platforms: ['Android', 'iOS', 'Wear OS'],
    watermark: 'Jetpack Compose',
    // Brand purple with the app's teal as the secondary.
    accent: {
      base: '#7F56D9',
      deep: '#6941C6',
      spark: '#15B79E',
      panelLight: '#F6F4FE',
      panelDark: '#17122B',
      onPanelLight: '#6941C6',
      onPanelDark: '#B69BF0',
    },
    bullets: [
      'Cached rates stamped with the moment they were fetched',
      'Glance widget refreshed on a battery-aware WorkManager schedule',
      "Wear OS companion sharing the phone app's domain layer",
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Wear OS', 'Room', 'WorkManager'],
    stores: [
      {
        kind: 'playStore',
        href: 'https://play.google.com/store/apps/details?id=dev.arkbuilders.rate',
      },
      {
        kind: 'appStore',
        href: 'https://apps.apple.com/us/app/travel-with-currency-converter/id6746667973',
      },
    ],
    links: [{ label: 'GitHub repo', href: 'https://github.com/ARK-Builders/ARK-Rate' }],
    shots: [
      {
        src: '/assets/showcases/arkrates/ios/home-1.webp',
        alt: 'Ark Rates quick calculations on iOS',
        platform: 'ios',
        w: 720,
        h: 1472,
      },
      {
        src: '/assets/showcases/arkrates/android/widget.webp',
        alt: 'Ark Rates home-screen widget showing pinned currency pairs',
        platform: 'android',
        w: 720,
        h: 1517,
      },
    ],
  },
]
