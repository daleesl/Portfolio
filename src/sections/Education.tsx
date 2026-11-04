import Badge from '@/components/Badge'
import TimelineItem from '@/components/TimelineItem'
import { eyebrow, section } from '@/lib/ui'

export default function Education() {
  return (
    <section className={section} id="education" aria-labelledby="edu-title">
      <p className={`${eyebrow} mb-8`} data-reveal>Education</p>
      <TimelineItem date="2023 – 2027" title="Bachelor of Science in Information Technology" titleId="edu-title">
        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">Polytechnic University of the Philippines</p>
        <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">Santo Tomas Branch, Batangas</p>
        <Badge>Consistent President's Lister</Badge>
      </TimelineItem>
    </section>
  )
}
