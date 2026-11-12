import { ArrowUpRight } from 'lucide-react'
import ImageCarousel from '@/components/ImageCarousel'
import { caseStudyHref } from '@/hooks/useProjectRoute'
import type { Project } from '@/types'

export default function ProjectCard({ project }: { project: Project }) {
  const href = caseStudyHref(project.slug)

  return (
    <article
      className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:p-5"
      data-reveal
    >
      {project.images && project.images.length > 0 ? (
        <ImageCarousel images={project.images} title={project.title} href={href} />
      ) : (
        <a
          className="dot-pattern grid aspect-video place-items-center rounded-lg bg-slate-100 dark:bg-slate-800"
          href={href}
          aria-label={`Open ${project.title} case study`}
        >
          <span className="font-pixel text-2xl text-slate-400 dark:text-slate-500">{project.title}</span>
        </a>
      )}

      <div className="flex flex-1 flex-col pt-5">
        <p className="flex gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.11em] text-slate-500 dark:text-slate-400">
          <span className="text-sky-700 dark:text-sky-400">{project.number}</span>
          {project.label}
        </p>
        <h3 className="mt-3 mb-2.5 text-xl font-semibold md:text-2xl">
          <a className="transition-colors hover:text-sky-700 dark:hover:text-sky-400" href={href}>{project.title}</a>
        </h3>
        <p className="text-[13.5px] leading-7 text-slate-600 dark:text-slate-400">{project.description}</p>
        {project.result && (
          <p className="mt-3.5 flex items-baseline gap-2 text-[13px] leading-6">
            <span className="size-1.5 shrink-0 -translate-y-px rounded-full bg-sky-500" />
            {project.result}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              className="rounded-full border border-slate-300 px-2 py-1 font-mono text-[9.5px] uppercase tracking-wide text-slate-600 dark:border-slate-600 dark:text-slate-400"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-6">
          <div className="flex justify-between border-t border-slate-200 font-mono text-[10px] font-medium uppercase tracking-wide dark:border-slate-800">
            <a className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-sky-700 dark:hover:text-sky-400" href={href}>
              Case study <ArrowUpRight size={14} />
            </a>
            {project.links?.map((link) => (
              <a
                className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-sky-700 dark:hover:text-sky-400"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                key={link.label}
              >
                {link.label} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
