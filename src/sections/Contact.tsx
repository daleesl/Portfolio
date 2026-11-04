import { ArrowUpRight, Download } from 'lucide-react'
import { email, githubUrl, resumeUrl } from '@/data/profile'
import { container } from '@/lib/ui'

export default function Contact() {
  return (
    <section className={`${container} mb-20`} id="contact" aria-labelledby="contact-title">
      <div className="rounded-2xl bg-slate-950 p-7 text-white sm:p-10 md:p-14 dark:bg-slate-100 dark:text-slate-950" data-reveal>
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
          Have something in mind?
        </p>
        <h2 className="mt-5 max-w-2xl text-3xl leading-tight font-medium md:text-5xl" id="contact-title">
          Let's build something clear, useful, and memorable.
        </h2>
        <p className="mt-5 max-w-lg text-[15px] leading-7 text-slate-300 dark:text-slate-600">
          Have a project, role or idea in mind? Email is the fastest way to reach me.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 font-mono text-xs font-medium uppercase tracking-wide">
          <a className="inline-flex min-h-11 items-center gap-2 border-b border-current" href={`mailto:${email}`}>
            {email} <ArrowUpRight size={16} />
          </a>
          <a
            className="inline-flex min-h-11 items-center gap-2 text-slate-300 hover:text-white dark:text-slate-600 dark:hover:text-slate-950"
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ArrowUpRight size={16} />
          </a>
          <a
            className="inline-flex min-h-11 items-center gap-2 text-slate-300 hover:text-white dark:text-slate-600 dark:hover:text-slate-950"
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Résumé (PDF) <Download size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
