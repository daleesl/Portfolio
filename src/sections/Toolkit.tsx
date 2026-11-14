import { ChevronRight } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'
import MarqueeRow from '@/components/MarqueeRow'
import { toolRows } from '@/data/tools'
import { toolkitHref } from '@/hooks/useProjectRoute'
import { eyebrow, section } from '@/lib/ui'

export default function Toolkit() {
  return (
    <section className={section} id="toolkit" aria-labelledby="stack-title">
      <AnimatedContent className="mb-9 flex items-end justify-between gap-4" blur={4}>
        <div>
          <p className={eyebrow}>Toolkit</p>
          <h2 className="mt-3 font-pixel text-3xl font-normal lowercase md:text-[38px]" id="stack-title">
            What I build with.
          </h2>
        </div>
        <a
          className="inline-flex min-h-11 shrink-0 items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          href={toolkitHref}
        >
          View all <ChevronRight size={14} />
        </a>
      </AnimatedContent>
      <AnimatedContent className="flex flex-col" stagger={0.05}>
        {toolRows.map((row) => (
          <MarqueeRow tools={row.tools} duration={row.duration} reverse={row.reverse} key={row.tools[0].name} />
        ))}
      </AnimatedContent>
    </section>
  )
}
