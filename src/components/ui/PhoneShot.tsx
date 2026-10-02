import { motion, type MotionProps } from 'motion/react'
import type { Shot } from '@/content/projects'

/**
 * Most captures arrive with a device bezel already rendered into the image.
 * The Supabuckt iOS ones are bare screen recordings, so `shot.framed` draws a
 * bezel around them to match.
 *
 * The corner radius is expressed as `horizontal% / vertical%` rather than a
 * single percentage: a lone percentage resolves against width *and* height
 * independently, which on a 1:2 box gives a stretched, obviously-wrong ellipse.
 * These two numbers describe the same physical radius (~14% of the screen's
 * width, which is what an iPhone's corner actually is) on both axes.
 */
const OUTER_RADIUS = '15.5% / 7.2%'
const INNER_RADIUS = '13.5% / 6.3%'

type Props = {
  shot: Shot
  className?: string
  motionProps?: MotionProps
  style?: MotionProps['style']
}

export function PhoneShot({ shot, className, motionProps, style }: Props) {
  const img = (
    <img
      src={shot.src}
      alt={shot.alt}
      width={shot.w}
      height={shot.h}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="block h-auto w-full"
      style={shot.framed ? { borderRadius: INNER_RADIUS } : undefined}
    />
  )

  if (!shot.framed) {
    return (
      <motion.div className={className} style={style} {...motionProps}>
        {img}
      </motion.div>
    )
  }

  return (
    <motion.div className={className} style={style} {...motionProps}>
      <div
        className="bg-[#1b1b1d] p-[2.6%] ring-1 ring-inset ring-white/12"
        style={{ borderRadius: OUTER_RADIUS }}
      >
        {img}
      </div>
    </motion.div>
  )
}
