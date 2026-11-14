import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/projects'
import { caseStudyHref } from '@/hooks/useProjectRoute'
import { container, eyebrow, section } from '@/lib/ui'

const backLink = 'inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'

export default function CaseStudy({ slug }: { slug: string }) {
  const index = projects.findIndex((project) => project.slug === slug)

  if (index === -1) {
    return (
      <section className={`${container} py-24`}>
        <h1 className="font-pixel text-3xl font-normal lowercase">Project not found.</h1>
        <a className={`${backLink} mt-4`} href="/#work"><ArrowLeft size={16} /> All work</a>
      </section>
    )
  }

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  const screens = project.screens ?? []
  const isPhone = project.screenType === 'phone'

  return (
    <>
      <section className={`${container} pt-8 pb-12`}>
        <a className={backLink} href="/#work"><ArrowLeft size={16} /> All work</a>

        <p className={`${eyebrow} mt-6 flex gap-2`}>
          <span className="text-sky-700 dark:text-sky-400">{project.number}</span>
          {project.label}
        </p>
        <h1 className="mt-4 font-pixel text-[44px] leading-none font-normal md:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-[640px] text-lg leading-8 font-light text-slate-600 dark:text-slate-400">{project.description}</p>

        <dl className="mt-9 grid gap-x-8 gap-y-5 border-t border-slate-200 pt-6 dark:border-slate-800 sm:grid-cols-2">
          <div>
            <dt className={eyebrow}>Role</dt>
            <dd className="mt-2 text-sm leading-6">{project.role}</dd>
          </div>
          <div>
            <dt className={eyebrow}>Stack</dt>
            <dd className="mt-2 text-sm leading-6">{project.tags.join(' · ')}</dd>
          </div>
          {project.result && (
            <div className="sm:col-span-2">
              <dt className={eyebrow}>Result</dt>
              <dd className="mt-2 text-sm leading-6">{project.result}</dd>
            </div>
          )}
        </dl>

        {project.links && project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-6 font-mono text-[11px] font-medium uppercase tracking-wide">
            {project.links.map((link) => (
              <a className="inline-flex min-h-11 items-center gap-1.5 hover:text-sky-700 dark:hover:text-sky-400" href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                {link.label} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}
      </section>

      <section className={section} aria-labelledby="built-title">
        <h2 className={`${eyebrow} mb-6`} id="built-title">What I built</h2>
        <ol className="border-t border-slate-200 dark:border-slate-800">
          {project.highlights.map((highlight, itemIndex) => (
            <li className="flex gap-4 border-b border-slate-200 py-4 text-[15px] leading-7 text-slate-600 dark:border-slate-800 dark:text-slate-400" key={highlight}>
              <span className="pt-0.5 font-mono text-[11px] text-sky-700 dark:text-sky-400">{String(itemIndex + 1).padStart(2, '0')}</span>
              {highlight}
            </li>
          ))}
        </ol>
      </section>

      <section className={section} aria-labelledby="screens-title">
        <h2 className={`${eyebrow} mb-6`} id="screens-title">Screens</h2>
        {screens.length > 0 ? (
          <div className={`grid gap-x-4 gap-y-6 ${isPhone ? 'grid-cols-2 sm:grid-cols-3' : 'md:grid-cols-2'}`}>
            {screens.map((screen) => (
              <figure key={screen.src}>
                <img
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800"
                  src={screen.src}
                  alt={`${project.title}: ${screen.label}`}
                  loading="lazy"
                />
                <figcaption className="mt-2 text-[13px] text-slate-600 dark:text-slate-400">{screen.label}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="dot-pattern rounded-lg bg-slate-100 px-5 py-10 text-center font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            Screenshots coming soon
          </p>
        )}
      </section>

      <section className={`${container} py-12`} aria-label="Next project">
        <a className="group flex items-center justify-between gap-6 border-y border-slate-200 py-7 dark:border-slate-800" href={caseStudyHref(next.slug)}>
          <span>
            <span className={`${eyebrow} block`}>Next project</span>
            <span className="mt-2 block font-pixel text-3xl">{next.title}</span>
          </span>
          <ArrowRight className="transition-transform group-hover:translate-x-1" size={22} />
        </a>
      </section>
    </>
  )
}
