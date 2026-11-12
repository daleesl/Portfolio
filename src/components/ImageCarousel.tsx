import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type ImageCarouselProps = {
  images: string[]
  title: string
  // Where clicking a picture goes.
  href?: string
}

const arrow = 'absolute top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-slate-950/70 text-white backdrop-blur-sm transition-colors hover:bg-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500'

// Swipeable image slider with arrows and pagination dots; the controls only show with more than one image.
export default function ImageCarousel({ images, title, href }: ImageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const hasMany = images.length > 1

  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return

    const wrapped = (index + images.length) % images.length
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: wrapped * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const updateActive = () => {
    const track = trackRef.current
    if (track) setActive(Math.round(track.scrollLeft / track.clientWidth))
  }

  return (
    <div className="dot-pattern relative aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
      <div
        className="carousel-track flex size-full snap-x snap-mandatory overflow-x-auto"
        ref={trackRef}
        onScroll={updateActive}
      >
        {images.map((image, index) => (
          <a className="size-full shrink-0 snap-center" href={href} aria-label={`Open ${title} case study`} key={image}>
            <img
              className="size-full object-contain"
              src={image}
              alt={`${title} screenshot ${index + 1} of ${images.length}`}
              loading="lazy"
              draggable={false}
            />
          </a>
        ))}
      </div>

      {hasMany && (
        <>
          <button className={`${arrow} left-2`} type="button" onClick={() => goTo(active - 1)} aria-label="Previous picture">
            <ChevronLeft size={18} />
          </button>
          <button className={`${arrow} right-2`} type="button" onClick={() => goTo(active + 1)} aria-label="Next picture">
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 items-center rounded-full bg-slate-950/70 px-1.5 backdrop-blur-sm">
            {images.map((image, index) => (
              <button
                className="grid h-6 place-items-center px-0.75"
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show ${title} screenshot ${index + 1}`}
                aria-current={index === active || undefined}
                key={image}
              >
                <span className={`block h-1.5 rounded-full transition-all duration-300 ${index === active ? 'w-5 bg-white' : 'w-1.5 bg-white/45'}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
