import type { ReactNode } from 'react'

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-slate-300 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide dark:border-slate-600">
      <span className="size-1.5 rounded-full bg-sky-500" />
      {children}
    </span>
  )
}
