import { ArrowLeft } from 'lucide-react'
import EventCard from '@/components/EventCard'
import { events } from '@/data/events'
import { container } from '@/lib/ui'

// Every event as a card, opened from "View all" in the home page events section (/events).
// Each card opens that event's own page.
export default function EventsPage() {
  return (
    <section className={`${container} pt-8 pb-20`} aria-labelledby="events-page-title">
      <a
        className="inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
        href="/#events"
      >
        <ArrowLeft size={16} /> Back to home
      </a>

      <h1 className="mt-6 font-pixel text-[44px] leading-none font-normal md:text-6xl" id="events-page-title">
        Events
      </h1>
      <p className="mt-5 max-w-[640px] text-lg leading-8 font-light text-slate-600 dark:text-slate-400">
        Hackathons, presentations and features, plus the people I built things with.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {events.map((event) => <EventCard event={event} key={event.slug} />)}
      </div>
    </section>
  )
}
