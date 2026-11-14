import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Day = { date: string; count: number; level: number }
type GraphState = { status: 'loading' } | { status: 'ready'; total: number; days: Day[] } | { status: 'error' }

// GitHub's own API needs a secret token, so the daily counts come from a free public service instead.
const apiUrl = (username: string) => `https://github-contributions-api.jogruber.de/v4/${username}?y=last`

// Square colour for each activity level (0 = none, 4 = most), in light and dark mode: GitHub's own greens.
const levelClass = [
  'bg-slate-100 dark:bg-slate-800',
  'bg-[#9be9a8] dark:bg-[#0e4429]',
  'bg-[#40c463] dark:bg-[#006d32]',
  'bg-[#30a14e] dark:bg-[#26a641]',
  'bg-[#216e39] dark:bg-[#39d353]',
]

const cell = 'size-[10px] rounded-[3px]'
const weekdayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', '']
const emptyWeeks = 53

// Splits the days into week columns (Sunday at the top), padding the first week so each day sits on its weekday.
function toWeeks(days: Day[]) {
  if (days.length === 0) return []
  const firstWeekday = new Date(`${days[0].date}T00:00:00`).getDay()
  const padded: (Day | null)[] = [...Array<null>(firstWeekday).fill(null), ...days]
  const weeks: (Day | null)[][] = []
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7))
  return weeks
}

// A month name above the first week column that starts in that month.
function monthLabels(weeks: (Day | null)[][]) {
  let lastMonth = -1
  return weeks.map((week) => {
    const first = week.find((day) => day !== null)
    if (!first) return ''
    const date = new Date(`${first.date}T00:00:00`)
    if (date.getMonth() === lastMonth) return ''
    lastMonth = date.getMonth()
    return date.toLocaleDateString('en-US', { month: 'short' })
  })
}

const describe = (day: Day) => {
  const date = new Date(`${day.date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return `${day.count === 0 ? 'No' : day.count} contribution${day.count === 1 ? '' : 's'} on ${date}`
}

// A year of GitHub contributions as a grid of days, styled to match the site.
export default function ContributionGraph({ username, profileUrl }: { username: string; profileUrl: string }) {
  const [state, setState] = useState<GraphState>({ status: 'loading' })
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(apiUrl(username), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Contributions request failed: ${response.status}`)
        return response.json() as Promise<{ total: { lastYear: number }; contributions: Day[] }>
      })
      .then((data) => setState({ status: 'ready', total: data.total.lastYear, days: data.contributions }))
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          console.error(error)
          setState({ status: 'error' })
        }
      })

    return () => controller.abort()
  }, [username])

  // On narrow screens the grid scrolls sideways; start at the most recent weeks.
  useEffect(() => {
    if (state.status === 'ready' && scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
  }, [state.status])

  if (state.status === 'error') {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 px-5 py-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
        Couldn't load contributions right now.{' '}
        <a className="font-medium underline underline-offset-4 hover:text-sky-700 dark:hover:text-sky-400" href={profileUrl} target="_blank" rel="noreferrer">
          See them on GitHub
        </a>
      </p>
    )
  }

  const weeks = state.status === 'ready' ? toWeeks(state.days) : Array.from({ length: emptyWeeks }, () => Array<null>(7).fill(null))
  const months = state.status === 'ready' ? monthLabels(weeks) : []
  const columns = { gridTemplateColumns: `repeat(${weeks.length}, 10px)` }

  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-4 sm:p-5 dark:border-slate-700">
      <div className="flex justify-end">
        <a
          className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
        >
          {state.status === 'ready' ? (
            <span>
              <span className="font-semibold text-slate-950 dark:text-white">{state.total.toLocaleString('en-US')}</span> contributions in the
              last year
            </span>
          ) : (
            'Loading contributions…'
          )}
          <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={14} aria-hidden="true" />
        </a>
      </div>

      <div className="mt-2 overflow-x-auto pb-1" ref={scrollRef}>
        <div
          className={`flex w-max gap-2 ${state.status === 'loading' ? 'animate-pulse' : ''}`}
          role="img"
          aria-label={state.status === 'ready' ? `${state.total} GitHub contributions in the last year` : 'Loading GitHub contributions'}
        >
          <div className="grid grid-rows-7 gap-[3px] pt-5 font-mono text-[9px] leading-[10px] text-slate-500 dark:text-slate-400" aria-hidden="true">
            {weekdayLabels.map((label, index) => <span key={index}>{label}</span>)}
          </div>

          <div aria-hidden="true">
            <div className="grid h-5 gap-[3px] font-mono text-[9px] text-slate-500 dark:text-slate-400" style={columns}>
              {months.map((month, index) => (
                <span className="whitespace-nowrap" key={index}>{month}</span>
              ))}
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]" style={columns}>
              {weeks.flatMap((week, weekIndex) =>
                Array.from({ length: 7 }, (_, dayIndex) => {
                  const day = week[dayIndex]
                  if (state.status === 'ready' && !day) return <span className={cell} key={`${weekIndex}-${dayIndex}`} />
                  return (
                    <span
                      className={`${cell} ${levelClass[day ? Math.min(day.level, 4) : 0]}`}
                      title={day ? describe(day) : undefined}
                      key={`${weekIndex}-${dayIndex}`}
                    />
                  )
                }),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
