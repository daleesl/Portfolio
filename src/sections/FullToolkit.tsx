import { ArrowLeft } from 'lucide-react'
import ToolPill from '@/components/ToolPill'
import { toolCategories } from '@/data/tools'
import { container } from '@/lib/ui'

// Every tool grouped by category, opened from "View all" in the home page toolkit (/toolkit).
export default function FullToolkit() {
  return (
    <section className={`${container} pt-8 pb-20`} aria-labelledby="full-toolkit-title">
      <a
        className="inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
        href="/#toolkit"
      >
        <ArrowLeft size={16} /> Back to home
      </a>

      <h1 className="mt-6 font-pixel text-[44px] leading-none font-normal md:text-6xl" id="full-toolkit-title">
        Full tech stack
      </h1>
      <p className="mt-5 max-w-[640px] text-lg leading-8 font-light text-slate-600 dark:text-slate-400">
        The languages, frameworks and tools I use across web, mobile and machine learning.
      </p>

      <div className="mt-12 divide-y divide-dashed divide-slate-200 dark:divide-slate-800">
        {toolCategories.map((category) => (
          <div className="py-8 first:pt-0 last:pb-0" key={category.title}>
            <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">{category.title}</h2>
            <ul className="flex flex-wrap gap-2.5">
              {category.tools.map((tool) => (
                <li key={tool.name}>
                  <ToolPill tool={tool} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
