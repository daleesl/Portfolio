import type { ReactNode } from 'react'

// Date on the left, details on the right. Used by Experience and Education.
export default function TimelineItem({
  date,
  title,
  titleId,
  children,
}: {
  date: string
  title: string
  titleId: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-wrap gap-x-10 gap-y-2" data-reveal>
      <p className="mt-1 w-36 shrink-0 font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {date}
      </p>
      <div className="min-w-0 flex-[1_1_420px]">
        <h3 className="text-xl font-semibold" id={titleId}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  )
}
