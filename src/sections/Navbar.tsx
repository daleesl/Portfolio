import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { container } from '@/lib/ui'

type NavbarProps = {
  darkMode: boolean
  onToggleTheme: () => void
}

export default function Navbar({ darkMode, onToggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateNavShadow = () => setIsScrolled(window.scrollY > 8)

    updateNavShadow()
    window.addEventListener('scroll', updateNavShadow, { passive: true })
    return () => window.removeEventListener('scroll', updateNavShadow)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 backdrop-blur-md transition-all duration-300 dark:border-white/10 ${
        isScrolled
          ? 'bg-white/80 shadow-lg shadow-slate-900/5 dark:bg-[#111318]/80 dark:shadow-black/25'
          : 'bg-white/90 dark:bg-[#111318]/90'
      }`}
    >
      <nav className={`${container} flex min-h-16 items-center`} aria-label="Primary navigation">
        <a className="mr-auto grid size-11 place-items-center" href="#top" aria-label="Dale Lee, home">
          <img
            className="size-8 object-contain"
            src={darkMode ? './assets/Logo/white-logo.svg' : './assets/Logo/black-logo.svg'}
            alt=""
            aria-hidden="true"
          />
        </a>

        <div className="flex font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <a className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-slate-950 dark:hover:text-white" href="#work">Work</a>
          <a className="hidden min-h-11 items-center px-2 transition-colors hover:text-slate-950 dark:hover:text-white min-[470px]:inline-flex" href="#education">Education</a>
          <a className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-slate-950 dark:hover:text-white" href="#contact">Contact</a>
        </div>

        <div className="ml-3 flex items-center gap-2 before:h-7 before:w-px before:bg-slate-200 dark:before:bg-slate-800 sm:ml-4">
          <button
            className="grid size-11 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:hover:bg-slate-800 dark:hover:text-white"
            type="button"
            onClick={onToggleTheme}
            aria-label={darkMode ? 'Use light theme' : 'Use dark theme'}
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </nav>
    </header>
  )
}
