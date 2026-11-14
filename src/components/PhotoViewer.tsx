import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { pauseSmoothScroll, resumeSmoothScroll } from '@/lib/smoothScroll'
import type { EventPhoto } from '@/types'

type PhotoViewerProps = {
  photos: EventPhoto[]
  title: string
  // The photo being shown; null keeps the viewer closed.
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

const control = 'grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400'

// Full-screen photo viewer built on <dialog>: Esc closes it, focus stays inside, and the arrow keys
// or buttons move between photos.
export default function PhotoViewer({ photos, title, index, onIndexChange, onClose }: PhotoViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const isOpen = index !== null
  const photo = isOpen ? photos[index] : null
  const hasMany = photos.length > 1

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Stop the page behind from scrolling while the viewer is open.
  useEffect(() => {
    if (!isOpen) return

    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'
    pauseSmoothScroll()
    return () => {
      root.style.overflow = previous
      resumeSmoothScroll()
    }
  }, [isOpen])

  const go = (step: number) => {
    if (index !== null) onIndexChange((index + step + photos.length) % photos.length)
  }

  return (
    <dialog
      ref={dialogRef}
      className="m-0 size-full max-h-none max-w-none bg-transparent p-0 text-slate-100 backdrop:bg-[#07080b]/95"
      aria-label={`${title} photos`}
      onClose={onClose}
      // Esc fires "cancel"; some browsers skip the "close" event after it, so close through state instead.
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') go(-1)
        if (event.key === 'ArrowRight') go(1)
      }}
    >
      {photo && index !== null && (
        <div className="flex h-full flex-col gap-4 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-wide text-slate-400">
              {title} · {index + 1} / {photos.length}
            </p>
            <button className={control} type="button" onClick={onClose} aria-label="Close photos">
              <X size={18} />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center gap-3">
            {hasMany && (
              <button className={`${control} hidden sm:grid`} type="button" onClick={() => go(-1)} aria-label="Previous photo">
                <ChevronLeft size={20} />
              </button>
            )}
            <figure className="m-0 flex h-full min-h-0 flex-1 flex-col items-center justify-center gap-3">
              <img className="min-h-0 w-full flex-1 rounded-xl object-contain" src={photo.src} alt={photo.caption} />
              <figcaption className="text-center text-[15px] text-slate-300">{photo.caption}</figcaption>
            </figure>
            {hasMany && (
              <button className={`${control} hidden sm:grid`} type="button" onClick={() => go(1)} aria-label="Next photo">
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {hasMany && (
            <div className="flex items-center justify-center gap-3">
              <button className={`${control} sm:hidden`} type="button" onClick={() => go(-1)} aria-label="Previous photo">
                <ChevronLeft size={20} />
              </button>
              <div className="flex min-w-0 gap-2 overflow-x-auto py-1">
                {photos.map((item, itemIndex) => (
                  <button
                    className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
                      itemIndex === index ? 'ring-2 ring-sky-400' : 'opacity-50 hover:opacity-100'
                    }`}
                    type="button"
                    onClick={() => onIndexChange(itemIndex)}
                    aria-label={`Show photo ${itemIndex + 1}: ${item.caption}`}
                    aria-current={itemIndex === index || undefined}
                    key={item.src}
                  >
                    <img className="size-full object-cover" src={item.src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
              <button className={`${control} sm:hidden`} type="button" onClick={() => go(1)} aria-label="Next photo">
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  )
}
