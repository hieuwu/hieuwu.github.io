import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { TechIcon, lookupMark } from './TechIcon'

type Props = {
  children: ReactNode
  /** Rendered as a selected filter chip: the two or three skills that matter most. */
  featured?: boolean
  /** Show the brand mark when the label maps to one. */
  icon?: boolean
  className?: string
}

/** M3 chip. Featured skills take the selected-filter treatment. */
export function Tag({ children, featured, icon = true, className }: Props) {
  const label = typeof children === 'string' ? children : ''
  const hasMark = icon && label ? Boolean(lookupMark(label)) : false

  return (
    <span className={`chip ${featured ? 'chip-selected' : ''} ${className ?? ''}`}>
      {featured && !hasMark && <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} />}
      {hasMark && <TechIcon tech={label} brand className="h-4 w-4 shrink-0" />}
      {children}
    </span>
  )
}
