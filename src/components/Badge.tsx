import type { ReactNode } from 'react'

// `className` sets the spacing around the badge; by default it sits below a line of text.
export default function Badge({ children, className = 'mt-3.5' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`${className} inline-flex items-center gap-2 rounded-full border border-slate-300 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide dark:border-slate-600`}>
      <span className="size-1.5 rounded-full bg-sky-500" />
      {children}
    </span>
  )
}
