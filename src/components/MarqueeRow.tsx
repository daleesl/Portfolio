import ToolPill from '@/components/ToolPill'
import type { ToolRow } from '@/types'

// Renders the tools twice so the row can loop seamlessly; styles live in styles.css (.marquee-*).
export default function MarqueeRow({ tools, duration, reverse = false }: ToolRow) {
  return (
    <div className="marquee overflow-hidden py-1">
      <div
        className={`marquee-track flex w-max ${reverse ? 'marquee-reverse' : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[false, true].map((isCopy) => (
          <ul className="marquee-set flex gap-2.5 pr-2.5" aria-hidden={isCopy || undefined} key={String(isCopy)}>
            {tools.map((tool) => (
              <li key={tool.name}>
                <ToolPill tool={tool} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
