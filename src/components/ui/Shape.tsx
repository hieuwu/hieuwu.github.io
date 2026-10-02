import type { CSSProperties, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { shape, type ShapeName } from './shapes'

type Props = {
  name: ShapeName
  /** Shape to morph into when this element, or its nearest `.group`, is hovered. */
  hover?: ShapeName
  /** Rotation of the hover shape, so the morph also turns. */
  hoverRotate?: number
  rotate?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** `span` for use inside text (eyebrows, labels); it renders as inline-block. */
  as?: 'div' | 'span'
}

/**
 * A box clipped to an M3 Expressive shape. Hover morphing is pure CSS (see
 * `.morph` in index.css): the two polygons share a vertex count, so the
 * clip-path transition interpolates between them on a spring curve.
 */
export function Shape({
  name,
  hover,
  hoverRotate = 0,
  rotate = 0,
  className,
  style,
  children,
  as: Tag = 'div',
}: Props) {
  return (
    <Tag
      className={`morph ${Tag === 'span' ? 'inline-block' : ''} ${className ?? ''}`}
      style={
        {
          '--shape': shape(name, rotate),
          '--shape-hover': hover ? shape(hover, hoverRotate) : undefined,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  )
}

type LoopProps = {
  /** Shapes visited in order, then back to the first. */
  sequence: ShapeName[]
  /** Seconds spent on each step. */
  step?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/**
 * Continuously morphs through a sequence while turning, the same idea as the
 * M3 Expressive loading indicator, slowed right down to work as decoration.
 * Under reduced motion it holds the first shape.
 */
export function MorphLoop({ sequence, step = 2.4, className, style, children }: LoopProps) {
  const reduced = useReducedMotion()
  const first = shape(sequence[0])

  if (reduced) {
    return (
      <div className={className} style={{ clipPath: first, ...style }}>
        {children}
      </div>
    )
  }

  // Each step also turns by an equal share of a full revolution, so the last
  // frame (the first shape at 360°) is identical to the first and the loop is
  // seamless. Vertices only move radially, so the turn reads as a twist.
  const frames = [...sequence, sequence[0]].map((s, i) =>
    shape(s, (i * 360) / sequence.length),
  )

  return (
    <motion.div
      className={className}
      style={{ clipPath: first, ...style }}
      animate={{ clipPath: frames }}
      transition={{
        duration: step * sequence.length,
        repeat: Infinity,
        ease: 'easeInOut',
        times: frames.map((_, i) => i / (frames.length - 1)),
      }}
    >
      {children}
    </motion.div>
  )
}
