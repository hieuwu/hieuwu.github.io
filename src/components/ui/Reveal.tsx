import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type Props = {
  children: ReactNode
  /** Stagger helper: index * 60ms. */
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}

/**
 * Fade-and-lift on first scroll into view. Respects prefers-reduced-motion by
 * rendering the final state immediately rather than animating a shorter version.
 */
export function Reveal({ children, delay = 0, y = 16, className, as = 'div' }: Props) {
  const reduced = useReducedMotion()
  const Tag = motion[as]

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
