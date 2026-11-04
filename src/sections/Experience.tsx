import Badge from '@/components/Badge'
import TimelineItem from '@/components/TimelineItem'
import { eyebrow, section } from '@/lib/ui'

export default function Experience() {
  return (
    <section className={section} id="experience" aria-labelledby="exp-title">
      <p className={`${eyebrow} mb-8`} data-reveal>Experience</p>
      <TimelineItem date="Oct 2026" title="PUP Hackathon 2026: Uthack ang Puhunan" titleId="exp-title">
        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">Front-End Developer, Team Innobyte</p>
        <Badge>3rd Runner-Up · Top 10 Finalist</Badge>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
          Built Konektado's front end as one of two developers on the team and contributed to backend features, taking
          the app from idea to a working product for the finals.
        </p>
      </TimelineItem>
    </section>
  )
}
