import { useEffect, useRef } from 'react'

type ClickSparkProps = {
  color: string
  // Number of lines in each burst.
  count?: number
  // Length of each line and its thickness, in px.
  size?: number
  width?: number
  // Space between the click and the start of each line, in px, and how far the outer ends drift out.
  gap?: number
  radius?: number
  // Length of a burst, in ms.
  duration?: number
  // fan angle and direction in degrees (0 is up, -45 is up-left)
  spread?: number
  direction?: number
}

const smoothstep = (from: number, to: number, value: number) => {
  const t = Math.min(1, Math.max(0, (value - from) / (to - from)))
  return t * t * (3 - 2 * t)
}

// click spark burst adapted from React Bits, on a click-through layer
export default function ClickSpark({
  color,
  count = 5,
  size = 10,
  width = 2,
  gap = 4,
  radius = 3,
  duration = 280,
  spread = 180,
  direction = -45,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(color)
  colorRef.current = color

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const bursts: { x: number; y: number; start: number; color: string }[] = []
    let frame = 0

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * ratio
      canvas.height = window.innerHeight * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    // Angles on the canvas, where 0 points right; spread them evenly across the fan.
    const fan = (spread * Math.PI) / 180
    const heading = ((direction - 90) * Math.PI) / 180
    const angles = Array.from({ length: count }, (_, i) => (count > 1 ? heading - fan / 2 + (fan / (count - 1)) * i : heading))

    const draw = (now: number) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      context.lineCap = 'round'
      context.lineWidth = width

      for (let i = bursts.length - 1; i >= 0; i--) {
        const burst = bursts[i]
        const progress = (now - burst.start) / duration
        if (progress >= 1) {
          bursts.splice(i, 1)
          continue
        }

        // lines appear whole, then shrink away from the cursor
        const eased = 1 - Math.pow(1 - progress, 3)
        const outer = gap + size + radius * eased
        const distance = gap + (size + radius) * eased
        const length = Math.max(0, outer - distance)
        context.globalAlpha = 1 - smoothstep(0.75, 1, progress)
        context.strokeStyle = burst.color

        for (const angle of angles) {
          context.beginPath()
          context.moveTo(burst.x + Math.cos(angle) * distance, burst.y + Math.sin(angle) * distance)
          context.lineTo(burst.x + Math.cos(angle) * (distance + length), burst.y + Math.sin(angle) * (distance + length))
          context.stroke()
        }
      }

      context.globalAlpha = 1
      frame = bursts.length > 0 ? requestAnimationFrame(draw) : 0
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      bursts.push({ x: event.clientX, y: event.clientY, start: performance.now(), color: colorRef.current })
      if (bursts.length > 16) bursts.shift()
      if (!frame) frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [count, size, width, gap, radius, duration, spread, direction])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[60] size-full" aria-hidden="true" />
}
