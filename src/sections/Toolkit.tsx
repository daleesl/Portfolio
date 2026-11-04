import MarqueeRow from '@/components/MarqueeRow'
import ToolPill from '@/components/ToolPill'
import { learning, toolRows } from '@/data/tools'
import { eyebrow, section } from '@/lib/ui'

export default function Toolkit() {
  return (
    <section className={section} id="toolkit" aria-labelledby="stack-title">
      <div data-reveal>
        <p className={eyebrow}>Toolkit</p>
        <h2 className="mt-3 mb-9 font-pixel text-3xl font-normal lowercase md:text-[38px]" id="stack-title">
          What I build with.
        </h2>
      </div>
      <div className="flex flex-col gap-3" data-reveal>
        {toolRows.map((row) => (
          <MarqueeRow tools={row.tools} duration={row.duration} reverse={row.reverse} key={row.tools[0].name} />
        ))}
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-3" data-reveal>
        <p className={eyebrow}>Currently learning</p>
        {learning.map((tool) => <ToolPill tool={tool} learning key={tool.name} />)}
      </div>
    </section>
  )
}
