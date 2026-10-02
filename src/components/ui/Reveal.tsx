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
 * Fade, lift and settle on first scroll into view, on a spring with a little
 * bounce, the M3 Expressive "spatial" motion. Respects prefers-reduced-motion by
 * rendering the final state immediately rather than animating a shorter version.
 */
export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }: Props) {
  const reduced = useReducedMotion()
  const Tag = motion[as]

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        delay,
        default: { type: 'spring', duration: 0.9, bounce: 0.3 },
        opacity: { duration: 0.4, ease: [0.2, 0, 0, 1] },
      }}
    >
      {children}
    </Tag>
  )
}
