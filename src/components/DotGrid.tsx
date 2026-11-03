import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
} from 'react'
import { gsap } from 'gsap'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

import './DotGrid.css'

gsap.registerPlugin(InertiaPlugin)

type DotGridProps = {
  dotSize?: number
  gap?: number
  baseColor?: string
  activeColor?: string
  proximity?: number
  speedTrigger?: number
  shockRadius?: number
  shockStrength?: number
  maxSpeed?: number
  resistance?: number
  returnDuration?: number
  className?: string
  style?: CSSProperties
}

type Dot = {
  cx: number
  cy: number
  xOffset: number
  yOffset: number
  inertiaApplied: boolean
}

type Rgb = { r: number; g: number; b: number }

function throttle<T extends (...args: never[]) => void>(callback: T, limit: number) {
  let lastCall = 0

  return (...args: Parameters<T>) => {
    const now = performance.now()
    if (now - lastCall < limit) return

    lastCall = now
    callback(...args)
  }
}

function hexToRgb(hex: string): Rgb {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!match) return { r: 0, g: 0, b: 0 }

  return {
    r: Number.parseInt(match[1], 16),
    g: Number.parseInt(match[2], 16),
    b: Number.parseInt(match[3], 16),
  }
}

export default function DotGrid({
  dotSize = 3,
  gap = 18,
  baseColor = '#e5e7eb',
  activeColor = '#64748b',
  proximity = 120,
  speedTrigger = 100,
  shockRadius = 220,
  shockStrength = 4,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.2,
  className = '',
  style,
}: DotGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const pointerRef = useRef({
    x: -1000,
    y: -1000,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  })

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor])
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor])

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined') return null

    const path = new Path2D()
    path.arc(0, 0, dotSize / 2, 0, Math.PI * 2)
    return path
  }, [dotSize])

  const buildGrid = useCallback(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) return

    const { width, height } = wrapper.getBoundingClientRect()
    const pixelRatio = window.devicePixelRatio || 1
    const context = canvas.getContext('2d')
    if (!context) return

    canvas.width = Math.round(width * pixelRatio)
    canvas.height = Math.round(height * pixelRatio)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

    const columns = Math.floor((width + gap) / (dotSize + gap))
    const rows = Math.floor((height + gap) / (dotSize + gap))
    const cell = dotSize + gap
    const startX = (width - (cell * columns - gap)) / 2 + dotSize / 2
    const startY = (height - (cell * rows - gap)) / 2 + dotSize / 2

    dotsRef.current = Array.from({ length: rows * columns }, (_, index) => ({
      cx: startX + (index % columns) * cell,
      cy: startY + Math.floor(index / columns) * cell,
      xOffset: 0,
      yOffset: 0,
      inertiaApplied: false,
    }))
  }, [dotSize, gap])

  useEffect(() => {
    if (!circlePath) return

    let animationFrame = 0
    const proximitySquared = proximity * proximity

    const draw = () => {
      const canvas = canvasRef.current
      const context = canvas?.getContext('2d')
      if (!canvas || !context) return

      context.clearRect(0, 0, canvas.width, canvas.height)

      for (const dot of dotsRef.current) {
        const distanceX = dot.cx - pointerRef.current.x
        const distanceY = dot.cy - pointerRef.current.y
        const distanceSquared = distanceX ** 2 + distanceY ** 2
        let fill = baseColor

        if (distanceSquared <= proximitySquared) {
          const amount = 1 - Math.sqrt(distanceSquared) / proximity
          fill = `rgb(${Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * amount)}, ${Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * amount)}, ${Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * amount)})`
        }

        context.save()
        context.translate(dot.cx + dot.xOffset, dot.cy + dot.yOffset)
        context.fillStyle = fill
        context.fill(circlePath)
        context.restore()
      }

      animationFrame = window.requestAnimationFrame(draw)
    }

    draw()
    return () => window.cancelAnimationFrame(animationFrame)
  }, [activeRgb, baseColor, baseRgb, circlePath, proximity])

  useEffect(() => {
    buildGrid()
    const observer = new ResizeObserver(buildGrid)
    const wrapper = wrapperRef.current

    if (wrapper) observer.observe(wrapper)
    return () => observer.disconnect()
  }, [buildGrid])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const moveDots = (event: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const now = performance.now()
      const pointer = pointerRef.current
      const elapsed = pointer.lastTime ? now - pointer.lastTime : 16
      let velocityX = ((event.clientX - pointer.lastX) / elapsed) * 1000
      let velocityY = ((event.clientY - pointer.lastY) / elapsed) * 1000
      let speed = Math.hypot(velocityX, velocityY)

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed
        velocityX *= scale
        velocityY *= scale
        speed = maxSpeed
      }

      Object.assign(pointer, {
        lastTime: now,
        lastX: event.clientX,
        lastY: event.clientY,
        vx: velocityX,
        vy: velocityY,
        speed,
      })

      const bounds = canvas.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top

      for (const dot of dotsRef.current) {
        const distance = Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y)
        if (speed <= speedTrigger || distance >= proximity || dot.inertiaApplied) continue

        dot.inertiaApplied = true
        gsap.killTweensOf(dot)
        gsap.to(dot, {
          inertia: {
            xOffset: dot.cx - pointer.x + velocityX * 0.005,
            yOffset: dot.cy - pointer.y + velocityY * 0.005,
            resistance,
          },
          onComplete: () => {
            gsap.to(dot, {
              xOffset: 0,
              yOffset: 0,
              duration: returnDuration,
              ease: 'power3.out',
              onComplete: () => { dot.inertiaApplied = false },
            })
          },
        })
      }
    }

    const scatterDots = (event: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const bounds = canvas.getBoundingClientRect()
      const clickX = event.clientX - bounds.left
      const clickY = event.clientY - bounds.top

      for (const dot of dotsRef.current) {
        const distance = Math.hypot(dot.cx - clickX, dot.cy - clickY)
        if (distance >= shockRadius || dot.inertiaApplied) continue

        const falloff = Math.max(0, 1 - distance / shockRadius)
        dot.inertiaApplied = true
        gsap.killTweensOf(dot)
        gsap.to(dot, {
          inertia: {
            xOffset: (dot.cx - clickX) * shockStrength * falloff,
            yOffset: (dot.cy - clickY) * shockStrength * falloff,
            resistance,
          },
          onComplete: () => {
            gsap.to(dot, {
              xOffset: 0,
              yOffset: 0,
              duration: returnDuration,
              ease: 'power3.out',
              onComplete: () => { dot.inertiaApplied = false },
            })
          },
        })
      }
    }

    const throttledMove = throttle(moveDots, 50)
    window.addEventListener('mousemove', throttledMove, { passive: true })
    window.addEventListener('click', scatterDots)

    return () => {
      window.removeEventListener('mousemove', throttledMove)
      window.removeEventListener('click', scatterDots)
    }
  }, [maxSpeed, proximity, resistance, returnDuration, shockRadius, shockStrength, speedTrigger])

  return (
    <div className={`dot-grid ${className}`} style={style} aria-hidden="true">
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </div>
  )
}
