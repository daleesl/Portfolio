import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import Badge from '@/components/Badge'
import PhotoViewer from '@/components/PhotoViewer'
import { events, showEventsPage } from '@/data/events'
import { projects } from '@/data/projects'
import { caseStudyHref, eventHref, eventsHref } from '@/hooks/useProjectRoute'
import { container, eyebrow } from '@/lib/ui'
import type { PortfolioEvent } from '@/types'

// How many photos the grid shows; the rest open from "See all".
const gridCount = 5

// The small photos share a 2×2 block beside the big one; with fewer than four, they stretch to fill it.
const smallTileSpan = (count: number, index: number) => {
  if (count === 1) return 'col-span-2 row-span-2'
  if (count === 2) return 'col-span-2'
  if (count === 3 && index === 2) return 'col-span-2'
  return ''
}

// Back to the events page once it is linked; until then, back to the events on the home page.
const back = showEventsPage ? { href: eventsHref, label: 'All events' } : { href: '/#events', label: 'Back to home' }

const backLink = 'inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
const textLink = 'inline-flex min-h-11 items-center gap-1.5 hover:text-sky-700 dark:hover:text-sky-400'
const tile = 'relative overflow-hidden rounded-xl bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:bg-slate-800'

function EventPhotos({ event, onOpen }: { event: PortfolioEvent; onOpen: (index: number) => void }) {
  const shown = event.photos.slice(0, gridCount)
  const hidden = event.photos.length - shown.length

  if (shown.length === 0) {
    return (
      <p className="dot-pattern rounded-lg bg-slate-100 px-5 py-10 text-center font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        Photos coming soon
      </p>
    )
  }

  return (
    <>
      <div className="grid auto-rows-[110px] grid-cols-2 gap-2 sm:auto-rows-[150px] sm:grid-cols-4">
        {shown.map((photo, index) => (
          <button
            className={`${tile} group ${index === 0 ? 'col-span-2 row-span-2' : smallTileSpan(shown.length - 1, index - 1)}`}
            type="button"
            onClick={() => onOpen(index)}
            aria-label={`Open photo: ${photo.caption}`}
            key={photo.src}
          >
            <img
              className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              src={photo.src}
              alt=""
              loading="lazy"
            />
            {hidden > 0 && index === shown.length - 1 && (
              <span className="absolute inset-0 grid place-items-center bg-slate-950/60 font-mono text-sm text-white">+{hidden}</span>
            )}
          </button>
        ))}
      </div>
      {event.photos.length > 1 && (
        <button
          className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          type="button"
          onClick={() => onOpen(0)}
        >
          See all {event.photos.length} photos <ArrowRight size={14} />
        </button>
      )}
    </>
  )
}

// One event with its details and photos (/events/<slug>), opened from a card on the events page.
export default function EventDetail({ slug }: { slug: string }) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const index = events.findIndex((event) => event.slug === slug)

  if (index === -1) {
    return (
      <section className={`${container} py-24`}>
        <h1 className="font-pixel text-3xl font-normal lowercase">Event not found.</h1>
        <a className={`${backLink} mt-4`} href={back.href}><ArrowLeft size={16} /> {back.label}</a>
      </section>
    )
  }

  const event = events[index]
  const next = events.length > 1 ? events[(index + 1) % events.length] : null
  const project = projects.find((item) => item.slug === event.project)
  const links = event.links ?? []

  return (
    <>
      <section className={`${container} pt-8 pb-12`} aria-labelledby="event-title">
        <a className={backLink} href={back.href}><ArrowLeft size={16} /> {back.label}</a>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <span className="font-mono text-[11px] text-sky-700 dark:text-sky-400">{event.date}</span>
          {event.badge && <Badge className="">{event.badge}</Badge>}
        </div>
        <h1 className="mt-4 font-pixel text-4xl leading-tight font-normal md:text-5xl" id="event-title">{event.title}</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{event.role}</p>
        <p className="mt-5 max-w-[640px] text-lg leading-8 font-light text-slate-600 dark:text-slate-400">{event.description}</p>

        {(project || links.length > 0) && (
          <div className="mt-4 flex flex-wrap gap-x-6 font-mono text-[11px] font-medium uppercase tracking-wide">
            {project && (
              <a className={textLink} href={caseStudyHref(project.slug)}>
                Project: {project.title} <ArrowRight size={14} />
              </a>
            )}
            {links.map((link) => (
              <a className={textLink} href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                {link.label} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}

        <h2 className={`${eyebrow} mt-10 mb-5`}>Photos</h2>
        <EventPhotos event={event} onOpen={setViewerIndex} />
      </section>

      {next && (
        <section className={`${container} py-12`} aria-label="Next event">
          <a className="group flex items-center justify-between gap-6 border-y border-slate-200 py-7 dark:border-slate-800" href={eventHref(next.slug)}>
            <span>
              <span className={`${eyebrow} block`}>Next event</span>
              <span className="mt-2 block font-pixel text-2xl md:text-3xl">{next.title}</span>
            </span>
            <ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" size={22} />
          </a>
        </section>
      )}

      <PhotoViewer
        photos={event.photos}
        title={event.title}
        index={viewerIndex}
        onIndexChange={setViewerIndex}
        onClose={() => setViewerIndex(null)}
      />
    </>
  )
}
