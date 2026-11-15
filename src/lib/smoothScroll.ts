import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

// glide on wheel steps (not touch or reduced motion); returns cleanup
export function startSmoothScroll() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const instance = new Lenis({ lerp: 0.12, autoRaf: false })
  const tick = (time: number) => instance.raf(time * 1000)
  const stopSync = instance.on('scroll', ScrollTrigger.update)

  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  lenis = instance

  return () => {
    stopSync()
    gsap.ticker.remove(tick)
    instance.destroy()
    lenis = null
  }
}

// Stops the page scrolling, for example while the photo viewer is open.
export function pauseSmoothScroll() {
  lenis?.stop()
}

export function resumeSmoothScroll() {
  lenis?.start()
}

// scroll a section into view below the navbar, gliding when smooth is true
export function scrollToElement(target: Element, smooth: boolean) {
  if (!lenis) {
    target.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' })
    return
  }
  lenis.resize()
  lenis.scrollTo(target, { immediate: !smooth })
}

export function scrollToTop() {
  if (!lenis) {
    window.scrollTo({ top: 0, behavior: 'instant' })
    return
  }
  lenis.resize()
  lenis.scrollTo(0, { immediate: true })
}
