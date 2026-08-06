import type { CSSProperties } from 'react'
import { MARKS } from './brandMarks'

type MarkKey = keyof typeof MARKS

/**
 * Which brand mark represents each label used in the content files.
 *
 * Kotlin Multiplatform and Compose Multiplatform share the Kotlin and Compose
 * marks respectively, they are those technologies, and JetBrains brands them
 * that way, so the label carries the distinction.
 */
const EXACT: Record<string, MarkKey> = {
  Kotlin: 'kotlin',
  'Kotlin Multiplatform': 'kotlin',
  'Jetpack Compose': 'compose',
  'Compose Multiplatform': 'compose',
  SwiftUI: 'swift',
  Swift: 'swift',
  Apple: 'apple',
  iOS: 'apple',
  Android: 'android',
  'Wear OS': 'wearos',
  Ktor: 'ktor',
  Gradle: 'gradle',
  RevenueCat: 'revenuecat',
  'In-App Purchases (RevenueCat)': 'revenuecat',
  Supabase: 'supabase',
  'Supabase Auth': 'supabase',
  'Supabase Storage': 'supabase',
  'supabase-kt': 'supabase',
  'Edge Functions': 'supabase',
  Realtime: 'supabase',
  Webhooks: 'supabase',
}

/** Falls back to a loose match so new labels usually still resolve. */
export function lookupMark(label: string): MarkKey | null {
  if (EXACT[label]) return EXACT[label]
  const l = label.toLowerCase()
  if (l.includes('revenuecat')) return 'revenuecat'
  if (l.includes('supabase')) return 'supabase'
  if (l.includes('compose')) return 'compose'
  if (l.includes('kotlin')) return 'kotlin'
  if (l.includes('wear')) return 'wearos'
  if (l.includes('swift')) return 'swift'
  if (l.includes('apple') || l.includes('ios')) return 'apple'
  if (l.includes('android')) return 'android'
  return null
}

/** Marks whose brand colour is (near-)black and must not be painted literally. */
const MONOCHROME = new Set<MarkKey>(['github', 'apple'])

type Props = {
  /** A content label ("Jetpack Compose") or a mark key ("compose"). */
  tech: string
  className?: string
  /** Paint the mark in its official brand colour instead of currentColor. */
  brand?: boolean
  title?: boolean
  /** Merged after the brand colour: used to pass animation custom properties. */
  style?: CSSProperties
}

export function TechIcon({ tech, className = 'h-4 w-4', brand, title, style }: Props) {
  const key = (tech in MARKS ? (tech as MarkKey) : lookupMark(tech)) as MarkKey | null
  if (!key) return null
  const mark = MARKS[key]

  // GitHub's and Apple's marks are (near-)black, which vanishes on a dark
  // surface, those inherit the surrounding colour instead of their brand hex.
  const merged: CSSProperties | undefined =
    brand || style
      ? { ...(brand ? { color: MONOCHROME.has(key) ? 'currentColor' : mark.hex } : {}), ...style }
      : undefined

  return (
    <svg
      viewBox="0 0 24 24"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title ? mark.title : undefined}
      fill="currentColor"
      style={merged}
      className={className}
    >
      {title && <title>{mark.title}</title>}
      <path d={mark.path} />
    </svg>
  )
}

export { MARKS }
