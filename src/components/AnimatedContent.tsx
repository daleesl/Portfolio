import { useLayoutEffect, useRef } from 'react'
import type { HTMLAttributes } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// re-measure after images load, since photos shift where reveals start
let refreshTimer: number | undefined
document.addEventListener(
  'load',
  (event) => {
    if (!(event.target instanceof HTMLImageElement)) return
    window.clearTimeout(refreshTimer)
    refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150)
  },
  true,
)

type AnimatedContentProps = HTMLAttributes<HTMLDivElement> & {
  // How far the content travels into place, in px.
  distance?: number
  direction?: 'vertical' | 'horizontal'
  // Comes in from above (or the left) instead of below (or the right).
  reverse?: boolean
  duration?: number
  ease?: string
  initialOpacity?: number
  scale?: number
  // Blur it starts from, in px; it sharpens as it lands.
  blur?: number
  // How far into the viewport the top of the content must be before it animates, from 0 to 1.
  threshold?: number
  delay?: number
  // Animates each direct child in turn, this many seconds apart.
  stagger?: number
  staggerFrom?: 'start' | 'end' | 'center' | 'edges' | 'random'
}

// slide-and-fade reveal on scroll (React Bits), skipped for reduced motion
export default function AnimatedContent({
  children,
  distance = 24,
  direction = 'vertical',
  reverse = false,
  duration = 0.6,
  ease = 'power3.out',
  initialOpacity = 0,
  scale = 1,
  blur = 0,
  threshold = 0.08,
  delay = 0,
  stagger = 0,
  staggerFrom = 'start',
  style,
  ...rest
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const context = gsap.context(() => {
      gsap.set(element, { visibility: 'visible' })
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const targets = stagger > 0 && element.children.length > 0 ? Array.from(element.children) : [element]
      const axis = direction === 'horizontal' ? 'x' : 'y'
      const offset = distance * (reverse ? -1 : 1)

      const from: gsap.TweenVars = { [axis]: offset, scale, opacity: initialOpacity }
      const to: gsap.TweenVars = {
        [axis]: 0,
        scale: 1,
        opacity: 1,
        duration,
        ease,
        delay,
        // Hand transforms back to the page once landed, so hover effects work as before.
        clearProps: blur > 0 ? 'transform,filter' : 'transform',
        scrollTrigger: { trigger: element, start: `top ${(1 - threshold) * 100}%`, once: true },
      }

      if (blur > 0) {
        from.filter = `blur(${blur}px)`
        to.filter = 'blur(0px)'
      }
      if (stagger > 0) to.stagger = { each: stagger, from: staggerFrom }

      gsap.fromTo(targets, from, to)
    }, element)

    return () => context.revert()
  }, [distance, direction, reverse, duration, ease, initialOpacity, scale, blur, threshold, delay, stagger, staggerFrom])

  return (
    <div ref={ref} style={{ visibility: 'hidden', ...style }} {...rest}>
      {children}
    </div>
  )
}
