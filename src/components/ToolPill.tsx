import type { Tool } from '@/types'

export default function ToolPill({ tool, learning = false }: { tool: Tool; learning?: boolean }) {
  const Icon = tool.icon
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-dashed bg-white px-3.5 py-2 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300 ${
        learning ? 'border-slate-400 dark:border-slate-500' : 'border-slate-300 dark:border-slate-700'
      }`}
    >
      <Icon className="size-4 text-slate-500 dark:text-slate-400" aria-hidden="true" />
      {tool.name}
    </span>
  )
}
