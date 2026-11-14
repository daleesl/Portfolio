import { ChevronRight } from 'lucide-react'
import AccordionGallery from '@/components/AccordionGallery'
import AnimatedContent from '@/components/AnimatedContent'
import type { AccordionItem } from '@/components/AccordionGallery'
import EventCard from '@/components/EventCard'
import { events, homeEvents, showEventsPage } from '@/data/events'
import { eventHref, eventsHref } from '@/hooks/useProjectRoute'
import { eyebrow, section } from '@/lib/ui'

// One panel per event, using its cover photo.
const highlights: AccordionItem[] = homeEvents.map((event) => ({
    image: event.photos[0].src,
    title: event.title,
    link: eventHref(event.slug),
    date: event.date,
    badge: event.badge,
    summary: event.summary,
    photoCount: event.photos.length,
  }))

// With only a couple of events, the open panel takes more of the row.
const expandRatio = highlights.length <= 2 ? 0.7 : 0.52

export default function Events() {
  if (events.length === 0) return null

  return (
    <section className={section} id="events" aria-labelledby="events-title">
      <AnimatedContent className="mb-9 flex items-end justify-between gap-4" blur={4}>
        <div>
          <p className={eyebrow}>Events</p>
          <h2 className="mt-3 font-pixel text-3xl font-normal lowercase md:text-[38px]" id="events-title">
            Moments beyond the code.
          </h2>
        </div>
        {showEventsPage && (
          <a
            className="inline-flex min-h-11 shrink-0 items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
            href={eventsHref}
          >
            View all <ChevronRight size={14} />
          </a>
        )}
      </AnimatedContent>
      <AnimatedContent>
        {highlights.length > 0 ? (
          <AccordionGallery items={highlights} label="Events" expandRatio={expandRatio} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {events.slice(0, 2).map((event) => <EventCard event={event} key={event.slug} />)}
          </div>
        )}
      </AnimatedContent>
    </section>
  )
}
