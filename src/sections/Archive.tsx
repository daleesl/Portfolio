import { ArrowUpRight } from 'lucide-react'
import { archive } from '@/data/projects'
import { eyebrow, section } from '@/lib/ui'

export default function Archive() {
  return (
    <section className={section} aria-labelledby="early-title">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-10 gap-y-3" data-reveal>
        <div>
          <p className={eyebrow}>Archive</p>
          <h2 className="mt-3 text-[22px] font-semibold" id="early-title">Early web projects</h2>
        </div>
        <p className="flex-[0_1_280px] text-[13px] leading-6 text-slate-600 dark:text-slate-400">
          Where I started: layout, the DOM and my first API calls.
        </p>
      </div>
      <ul className="border-t border-slate-200 dark:border-slate-800" data-reveal>
        {archive.map((item) => (
          <li key={item.title}>
            <a
              className="group flex min-h-14 flex-wrap items-center gap-x-4 gap-y-1 border-b border-slate-200 py-2 transition-colors hover:text-sky-700 dark:border-slate-800 dark:hover:text-sky-400"
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex-[1_1_220px] text-[15px]">{item.title}</span>
              <span className="font-mono text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.tags}</span>
              <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={14} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
