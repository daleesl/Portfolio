import Badge from '@/components/Badge'
import { eventHref } from '@/hooks/useProjectRoute'
import type { PortfolioEvent } from '@/types'

// How many small photos sit under the cover before the rest are counted as "+N".
const stripCount = 3

// A card for one event on the events page; it opens that event's own page.
export default function EventCard({ event }: { event: PortfolioEvent }) {
  const [cover, ...rest] = event.photos
  const strip = rest.slice(0, stripCount)
  const hidden = rest.length - strip.length

  return (
    <a
      className="group flex flex-col rounded-2xl border border-dashed border-slate-300 p-2.5 transition-colors hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-500"
      href={eventHref(event.slug)}
    >
      {cover ? (
        <div className="grid grid-cols-3 gap-1.5">
          <img
            className="col-span-3 aspect-video w-full rounded-[10px] bg-slate-100 object-cover dark:bg-slate-800"
            src={cover.src}
            alt={cover.caption}
            loading="lazy"
          />
          {strip.map((photo, index) => (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800" key={photo.src}>
              <img className="size-full object-cover" src={photo.src} alt="" loading="lazy" />
              {hidden > 0 && index === strip.length - 1 && (
                <span className="absolute inset-0 grid place-items-center bg-slate-950/60 font-mono text-xs text-white">
                  +{hidden} photos
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="dot-pattern grid aspect-video place-items-center rounded-[10px] bg-slate-100 font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          Photos coming soon
        </p>
      )}

      <div className="flex flex-col gap-2 px-1.5 pt-4 pb-1.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-[11px] text-sky-700 dark:text-sky-400">{event.date}</span>
          {event.badge && <Badge className="">{event.badge}</Badge>}
        </div>
        <h3 className="text-lg leading-snug font-semibold">{event.title}</h3>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{event.summary}</p>
      </div>
    </a>
  )
}
