import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import './AccordionGallery.css'

export type AccordionItem = {
  image: string
  title: string
  link: string
  date?: string
  badge?: string
  summary?: string
  // Shown as "N photos" beside "View event".
  photoCount?: number
}

type AccordionGalleryProps = {
  items: AccordionItem[]
  // Names the list for screen readers.
  label: string
  defaultIndex?: number
  // Row height on wider screens, and the column height on phones.
  height?: number
  mobileHeight?: number
  gap?: number
  radius?: number
  // Share of the row the open panel takes (0.2–0.9).
  expandRatio?: number
  duration?: number
  ease?: string
  // How far photos drift inside their panels as they resize (0 turns it off).
  parallax?: number
  // Degrees the closed panels turn in 3D on wider screens.
  tilt?: number
  stagger?: number
  grayscale?: boolean
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const list = window.matchMedia(query)
    const update = () => setMatches(list.matches)

    update()
    list.addEventListener('change', update)
    return () => list.removeEventListener('change', update)
  }, [query])

  return matches
}

// accordion panels adapted from React Bits; hover, focus or tap opens one
export default function AccordionGallery({
  items,
  label,
  defaultIndex = 0,
  height = 380,
  mobileHeight = 520,
  gap = 8,
  radius = 14,
  expandRatio = 0.52,
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  grayscale = true,
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLUListElement>(null)
  const panelRefs = useRef<(HTMLLIElement | null)[]>([])
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const mediaRefs = useRef<(HTMLSpanElement | null)[]>([])
  const barRefs = useRef<(HTMLSpanElement | null)[]>([])
  const detailRefs = useRef<(HTMLSpanElement | null)[]>([])
  const sideRefs = useRef<(HTMLSpanElement | null)[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const firstRunRef = useRef(true)
  const mediaSizeRef = useRef(320)

  const vertical = useMediaQuery('(max-width: 520px)')
  const canHover = useMediaQuery('(hover: hover)')
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const count = items.length
  const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9)
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1))

  const applyLayout = useCallback(
    (animate: boolean) => {
      const grow = count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1
      const time = animate && !reduceMotion ? duration : 0
      const timeline = gsap.timeline()

      timelineRef.current?.kill()

      panelRefs.current.forEach((panel, index) => {
        if (!panel) return

        const isActive = index === active
        const turn = vertical || isActive ? 0 : index < active ? tilt : -tilt
        timeline.to(panel, { flexGrow: isActive ? grow : 1, rotateY: turn, rotateX: 0, duration: time, ease }, 0)

        const media = mediaRefs.current[index]
        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - index))
          const shift = isActive ? 0 : drift * parallax * mediaSizeRef.current * 0.06
          timeline.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : shift,
              y: vertical ? shift : 0,
              '--ag-gray': grayscale && !isActive ? 1 : 0,
              '--ag-dim': isActive ? 0 : 0.45,
              duration: time,
              ease,
            },
            0,
          )
        }

        const bar = barRefs.current[index]
        const detail = detailRefs.current[index]
        if (bar && detail) {
          if (isActive) timeline.to([bar, detail], { autoAlpha: 1, x: 0, duration: time, ease, stagger: time ? stagger : 0 }, time * 0.25)
          else timeline.to([bar, detail], { autoAlpha: 0, x: -14, duration: time * 0.5, ease }, 0)
        }

        const side = sideRefs.current[index]
        if (side) timeline.to(side, { autoAlpha: isActive ? 0 : 1, duration: time * 0.5, ease }, isActive ? 0 : time * 0.4)
      })

      timelineRef.current = timeline
    },
    [active, count, ratio, duration, ease, vertical, tilt, parallax, grayscale, stagger, reduceMotion],
  )

  // Size the photos to the open panel, so they don't rescale while panels grow and shrink.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const measure = () => {
      const rect = root.getBoundingClientRect()
      const total = vertical ? rect.height : rect.width
      const usable = Math.max(total - gap * (count - 1), 120)
      const size = Math.max(140, usable * ratio * 1.22)
      mediaSizeRef.current = size
      root.style.setProperty('--ag-media-size', `${size}px`)
      applyLayout(!firstRunRef.current)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    return () => observer.disconnect()
  }, [applyLayout, gap, count, ratio, vertical])

  useEffect(() => {
    applyLayout(!firstRunRef.current)
    firstRunRef.current = false
  }, [applyLayout])

  useEffect(() => () => {
    timelineRef.current?.kill()
  }, [])

  // The first tap or click on a closed panel opens it; the next one follows the link.
  const handleClick = (index: number, event: MouseEvent<HTMLAnchorElement>) => {
    if (index === active) return
    event.preventDefault()
    setActive(index)
  }

  // Arrow keys move focus between panels, which also opens them.
  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLAnchorElement>) => {
    const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown'
    const back = event.key === 'ArrowLeft' || event.key === 'ArrowUp'
    if (!forward && !back) return

    event.preventDefault()
    linkRefs.current[(index + (forward ? 1 : -1) + count) % count]?.focus()
  }

  return (
    <ul
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}`}
      style={{ '--ag-gap': `${gap}px`, '--ag-radius': `${radius}px`, height: `${vertical ? mobileHeight : height}px` } as CSSProperties}
      aria-label={label}
    >
      {items.map((item, index) => (
        <li
          className="ag-panel"
          ref={(element) => {
            panelRefs.current[index] = element
          }}
          onMouseEnter={canHover ? () => setActive(index) : undefined}
          key={`${item.link}-${index}`}
        >
          <a
            className="ag-panel__link"
            ref={(element) => {
              linkRefs.current[index] = element
            }}
            href={item.link}
            aria-label={[item.title, item.date].filter(Boolean).join(', ')}
            onClick={(event) => handleClick(index, event)}
            onFocus={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
          >
            <span className="ag-panel__frame">
              <span
                className="ag-panel__media"
                ref={(element) => {
                  mediaRefs.current[index] = element
                }}
              >
                <img src={item.image} alt="" draggable={false} loading="lazy" />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>

            <span
              className="ag-panel__side"
              aria-hidden="true"
              ref={(element) => {
                sideRefs.current[index] = element
              }}
            >
              {item.title}
            </span>

            <span className="ag-panel__label" aria-hidden="true">
              <span
                className="ag-panel__bar"
                ref={(element) => {
                  barRefs.current[index] = element
                }}
              />
              <span
                className="ag-panel__detail"
                ref={(element) => {
                  detailRefs.current[index] = element
                }}
              >
                {(item.date || item.badge) && (
                  <span className="ag-panel__meta">
                    {item.date && <span>{item.date}</span>}
                    {item.badge && <span className="ag-panel__badge">{item.badge}</span>}
                  </span>
                )}
                <span className="ag-panel__title">{item.title}</span>
                {item.summary && <span className="ag-panel__summary">{item.summary}</span>}
                <span className="ag-panel__more">
                  {item.photoCount ? `${item.photoCount} photos · ` : ''}View event <ArrowRight size={13} />
                </span>
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
