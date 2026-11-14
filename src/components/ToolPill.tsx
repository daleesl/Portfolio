import type { Tool } from '@/types'

export default function ToolPill({ tool }: { tool: Tool }) {
  const Icon = tool.icon
  return (
    <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-dashed border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-solid hover:border-slate-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:shadow-black/40">
      <Icon
        className={`size-4 ${tool.color ? '' : 'text-slate-500 dark:text-slate-400'}`}
        style={tool.color ? { color: tool.color } : undefined}
        aria-hidden="true"
      />
      {tool.name}
    </span>
  )
}
