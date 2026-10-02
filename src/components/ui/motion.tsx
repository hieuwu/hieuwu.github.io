import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'motion/react'

/**
 * Motion physics shared across the page. Everything here runs on springs, so
 * movement carries momentum and settles instead of easing to a stop, and
 * everything degrades to static under prefers-reduced-motion.
 */

/** M3 Expressive "spatial" springs. */
export const SPRING = {
  /** Snappy, a little overshoot: buttons, chips, small things. */
  fast: { type: 'spring', stiffness: 520, damping: 28, mass: 0.8 },
  /** Default: cards, headings, entrances. */
  default: { type: 'spring', stiffness: 260, damping: 22 },
  /** Bouncy: things that should feel thrown, like the phones. */
  bouncy: { type: 'spring', stiffness: 180, damping: 13, mass: 1 },
  /** Soft follower for pointer tracking. */
  follow: { stiffness: 140, damping: 18, mass: 0.6 },
} as const

/** True on devices with a precise hover-capable pointer (not touch). */
export function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return fine
}

/**
 * Pointer position over `ref`, normalised to -0.5…0.5 on each axis and run
 * through a spring, so anything bound to it lags and settles naturally.
 * Returns to centre when the pointer leaves.
 */
export function usePointerSpring(ref: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, SPRING.follow)
  const y = useSpring(rawY, SPRING.follow)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !fine) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      rawX.set((e.clientX - r.left) / r.width - 0.5)
      rawY.set((e.clientY - r.top) / r.height - 0.5)
    }
    const leave = () => {
      rawX.set(0)
      rawY.set(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [ref, reduced, fine, rawX, rawY])

  return { x, y }
}

/** Maps a -0.5…0.5 pointer value onto ±`range` (px or deg). */
export function useRange(v: MotionValue<number>, range: number) {
  return useTransform(v, [-0.5, 0.5], [-range, range])
}

/**
 * Pulls its child toward the cursor while hovered, then springs back: the
 * "magnetic" feel for primary calls to action.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const x = useSpring(0, SPRING.follow)
  const y = useSpring(0, SPRING.follow)

  if (reduced || !fine) return <span className={className}>{children}</span>

  return (
    <motion.span
      ref={ref}
      className={`inline-flex ${className ?? ''}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}

/**
 * Heading reveal: each word rises out of its own clipped line on a staggered
 * spring. Non-string children render as-is.
 */
export function SplitWords({
  children,
  className,
  delay = 0,
  stagger = 0.045,
}: {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
}) {
  const reduced = useReducedMotion()
  if (typeof children !== 'string' || reduced) {
    return <span className={className}>{children}</span>
  }

  const words = children.split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={children}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '105%', rotate: 6 },
              shown: { y: '0%', rotate: 0, transition: SPRING.default },
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </motion.span>
  )
}

/** Thin bar under the toolbar that tracks page progress on a spring. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-primary"
      style={{ scaleX }}
    />
  )
}

/**
 * A marquee whose speed is driven by scroll velocity: it idles slowly, surges
 * while the page is scrolled, reverses with the scroll direction and coasts
 * back to idle on a spring.
 */
export function VelocityMarquee({
  children,
  baseVelocity = -2.2,
  className,
}: {
  children: ReactNode
  /** Percent of one copy's width per second; negative moves left. */
  baseVelocity?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [-4, 0, 4], {
    clamp: false,
  })
  const skew = useTransform(smoothVelocity, [-2000, 0, 2000], [8, 0, -8])
  const direction = useRef(1)

  // Two copies sit side by side; wrapping within one copy's width (-50%…0)
  // makes the loop seamless.
  const x = useTransform(baseX, (v) => `${(((v % 50) - 50) % 50).toFixed(3)}%`)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    let move = direction.current * baseVelocity * (delta / 1000)
    const f = velocityFactor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    move += direction.current * move * f
    baseX.set(baseX.get() + move)
  })

  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <motion.div className="flex w-max" style={{ x, skewX: reduced ? 0 : skew }}>
        <div className="flex shrink-0 items-center gap-3 pr-3">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-3 pr-3">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * Leans its child toward the cursor in 3D on a soft spring, and lifts it a
 * touch while hovered. Purely additive: with no fine pointer, or with reduced
 * motion, it is a plain wrapper.
 */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: ReactNode
  className?: string
  /** Maximum lean in degrees. */
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { x, y } = usePointerSpring(ref)
  const rotateY = useRange(x, max)
  const rotateX = useRange(y, -max)

  return (
    <div ref={ref} className={`[perspective:1000px] ${className ?? ''}`}>
      <motion.div className="h-full" style={{ rotateX, rotateY }}>
        {children}
      </motion.div>
    </div>
  )
}

/** Container + item variants for a spring-staggered pop-in of small things. */
export const POP_CONTAINER = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } },
}
export const POP_ITEM = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  shown: { opacity: 1, scale: 1, y: 0, transition: SPRING.fast },
}
