import type { CSSProperties, ReactNode } from 'react'
import { TechIcon, lookupMark } from './TechIcon'

type Props = {
  children: ReactNode
  /** Accent-tinted variant, used for the two or three skills that matter most. */
  featured?: boolean
  /** Per-project colour override for the ring. */
  color?: string
  /** Show the brand mark when the label maps to one. */
  icon?: boolean
  className?: string
}

export function Tag({ children, featured, color, icon = true, className }: Props) {
  const label = typeof children === 'string' ? children : ''
  const hasMark = icon && label ? Boolean(lookupMark(label)) : false

  const style: CSSProperties | undefined = color
    ? { boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${color} 30%, transparent)` }
    : undefined

  return (
    <span
      style={style}
      className={[
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
        'transition-colors duration-fast',
        color
          ? 'text-secondary'
          : featured
            ? 'border border-[color-mix(in_oklab,var(--surf-500)_38%,transparent)] bg-accent-muted text-accent'
            : 'border border-line bg-subtle text-secondary',
        className ?? '',
      ].join(' ')}
    >
      {hasMark && <TechIcon tech={label} brand className="h-3.5 w-3.5 shrink-0" />}
      {children}
    </span>
  )
}
