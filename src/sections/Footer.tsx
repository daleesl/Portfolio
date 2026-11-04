import { container } from '@/lib/ui'

export default function Footer() {
  return (
    <footer className={`${container} flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-slate-200 py-7 font-mono text-[10px] uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400`}>
      <p>© {new Date().getFullYear()} Dale Lee</p>
      <a className="inline-flex min-h-11 items-center" href="#top">Back to top</a>
    </footer>
  )
}
