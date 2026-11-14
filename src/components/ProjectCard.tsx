import { ArrowUpRight } from 'lucide-react'
import ImageCarousel from '@/components/ImageCarousel'
import { techIcons } from '@/data/tools'
import { caseStudyHref } from '@/hooks/useProjectRoute'
import type { Project } from '@/types'

const footerLink = 'inline-flex min-h-11 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'

// `compact` cuts the description to three lines, for the smaller cards on the home page.
export default function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const href = caseStudyHref(project.slug)

  return (
    <article className="flex h-full flex-col rounded-xl border border-dashed border-slate-300 p-2.5 dark:border-slate-700">
      {project.images && project.images.length > 0 ? (
        <ImageCarousel images={project.images} title={project.title} href={href} />
      ) : (
        <a
          className="grid aspect-video place-items-center rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800"
          href={href}
          aria-label={`Open ${project.title} case study`}
        >
          <span className="font-pixel text-2xl text-slate-400 dark:text-slate-500">{project.title}</span>
        </a>
      )}

      <div className="flex flex-1 flex-col px-2 pt-4">
        <h3 className="text-lg font-semibold md:text-xl">
          <a className="transition-colors hover:text-sky-700 dark:hover:text-sky-400" href={href}>{project.title}</a>
        </h3>
        <p className="mt-1 text-[13px] leading-5 font-semibold text-slate-800 dark:text-slate-200">{project.role}</p>
        <p className={`mt-2 text-[14px] leading-6 text-slate-600 dark:text-slate-400 ${compact ? 'line-clamp-3' : ''}`}>
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap items-center gap-3" aria-label="Built with">
          {project.tags.map((tag) => {
            const tech = techIcons[tag]
            const Icon = tech?.icon

            return (
              <li className="text-slate-700 dark:text-slate-300" title={tag} key={tag}>
                {Icon ? (
                  <>
                    <Icon size={18} color={tech.color} aria-hidden="true" />
                    <span className="sr-only">{tag}</span>
                  </>
                ) : (
                  <span className="font-mono text-[10px] uppercase tracking-wide">{tag}</span>
                )}
              </li>
            )
          })}
        </ul>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap justify-between gap-x-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex gap-x-4">
              {project.links?.map((link) => (
                <a className={footerLink} href={link.href} target="_blank" rel="noreferrer" key={link.label}>
                  {link.label} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
            <a className={footerLink} href={href}>
              Read case study <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
