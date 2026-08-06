import {
  BarChart3,
  Bell,
  CreditCard,
  Database,
  FolderTree,
  Gauge,
  Github,
  KeyRound,
  Layers,
  LayoutGrid,
  Linkedin,
  Mail,
  PenLine,
  RefreshCw,
  Rocket,
  Share2,
  Smartphone,
  Sparkles,
  Watch,
  WifiOff,
  type LucideIcon,
} from 'lucide-react'

/** Small registry so content files can name an icon without importing React. */
export const ICONS = {
  github: Github,
  linkedin: Linkedin,
  'pen-line': PenLine,
  mail: Mail,
  smartphone: Smartphone,
  rocket: Rocket,
  database: Database,
  gauge: Gauge,
  layers: Layers,
  // Project highlight tiles
  sparkles: Sparkles,
  'share-2': Share2,
  'credit-card': CreditCard,
  'bar-chart': BarChart3,
  'key-round': KeyRound,
  'folder-tree': FolderTree,
  'refresh-cw': RefreshCw,
  'wifi-off': WifiOff,
  'layout-grid': LayoutGrid,
  watch: Watch,
  bell: Bell,
} as const satisfies Record<string, LucideIcon>

/** lucide has no X/Twitter glyph in recent versions, so this is the current mark. */
export function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function resolveSocialIcon(name: string) {
  if (name === 'twitter') return XIcon
  return ICONS[name as keyof typeof ICONS] ?? Mail
}
