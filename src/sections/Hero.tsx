import { ChevronRight } from 'lucide-react'
import { MdVerified } from 'react-icons/md'
import DotGrid from '@/components/DotGrid'
import { currentlyBuilding, facts, resumeUrl, socialLinks } from '@/data/profile'
import { container, eyebrow } from '@/lib/ui'

export default function Hero({ darkMode }: { darkMode: boolean }) {
  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-title">
      {/* Interactive halftone texture */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <DotGrid
          className="hero-dot-grid"
          dotSize={3}
          gap={18}
          baseColor={darkMode ? '#252932' : '#e5e7eb'}
          activeColor={darkMode ? '#9ca3af' : '#64748b'}
          proximity={120}
          shockRadius={220}
          shockStrength={3}
        />
      </div>

      <div className={`${container} pt-12 pb-20 md:pt-16 md:pb-24`}>
        <p className="font-mono text-[13px] text-slate-500 dark:text-slate-400" data-reveal>
          <span className="text-sky-700 dark:text-sky-400">dale@calamba</span>:~$ whoami
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-6 md:gap-7" data-reveal>
          <img
            className="size-28 shrink-0 rounded-full object-cover shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 md:size-39"
            src="./assets/images/profile-pic.jpg"
            alt="Dale Lee"
          />
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <h1 className="font-pixel text-[44px] leading-none font-normal md:text-7xl" id="hero-title">
                Dale Lee
              </h1>
              {/* White dot behind the badge fills its check-mark cutout, so the check stays white in dark mode */}
              <span className="relative grid size-8 shrink-0 place-items-center md:size-10" title="This is Dale">
                <span className="absolute size-4 rounded-full bg-white md:size-5" />
                <MdVerified className="relative size-full text-sky-500" aria-hidden="true" />
              </span>
            </div>
            <p className="flex items-center gap-1 font-mono text-sm text-slate-600 dark:text-slate-400">
              web dev · mobile dev · machine learning
              <span className="terminal-cursor ml-1 inline-block h-4 w-2 bg-sky-500" aria-hidden="true" />
            </p>
          </div>
        </div>

        <div className="mt-12" data-reveal>
          <h2 className="text-[32px] leading-[1.12] font-[650] tracking-tight md:text-[46px]">
            I build apps,{' '}
            <span className="font-pixel font-normal tracking-normal text-sky-600 dark:text-sky-400">end to end.</span>
          </h2>
          <p className="mt-4 max-w-[680px] text-[17px] leading-[1.85] text-slate-600 dark:text-slate-400">
            I'm an IT student at PUP Santo Tomas who builds web and mobile apps. I use{' '}
            <strong className="font-semibold text-slate-700 dark:text-slate-200">AI-native development</strong> to build
            faster, and I treat every project as a chance to understand what's underneath. I'm still learning, and I
            enjoy turning real problems into apps people can actually use.
          </p>

          <dl className="mt-8 grid grid-cols-2 border-y border-slate-200 dark:border-slate-800 sm:grid-cols-4">
            {facts.map((fact, index) => (
              <div
                className={`py-4 ${index % 2 === 1 ? 'pl-4' : 'pr-4'} sm:px-4 sm:first:pl-0 ${
                  index > 0 ? 'sm:border-l sm:border-slate-200 sm:dark:border-slate-800' : ''
                }`}
                key={fact.label}
              >
                <dt className={eyebrow}>{fact.label}</dt>
                <dd className="mt-2 text-sm">{fact.value}</dd>
              </div>
            ))}
            <div className="py-4 pl-4 sm:border-l sm:border-slate-200 sm:px-4 sm:dark:border-slate-800">
              <dt className={eyebrow}>Now</dt>
              <dd className="mt-2 flex items-center gap-2 text-sm">
                <span className="size-1.5 rounded-full bg-sky-500" />
                {currentlyBuilding}
              </dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              className="inline-flex min-h-12 items-center gap-2.5 rounded-lg bg-slate-950 px-5.5 text-[15px] font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-slate-100 dark:text-slate-950"
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              View Resume <ChevronRight size={16} />
            </a>
            <span className="mx-1.5 h-7 w-px bg-slate-200 dark:bg-slate-800" />
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                className="grid size-11 place-items-center text-slate-500 transition hover:-translate-y-0.5 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400"
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                title={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
