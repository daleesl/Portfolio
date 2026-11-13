import { ChevronRight } from 'lucide-react'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'
import { allProjectsHref } from '@/hooks/useProjectRoute'
import { eyebrow, section } from '@/lib/ui'

// How many projects the home page shows before "View all projects".
const featuredCount = 3

export default function Work() {
  return (
    <section className={section} id="work" aria-labelledby="work-title">
      <div className="mb-10" data-reveal>
        <p className={eyebrow}>Selected work</p>
        <h2 className="mt-3 font-pixel text-3xl font-normal lowercase md:text-[40px]" id="work-title">
          Projects
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {projects.slice(0, featuredCount).map((project) => (
          <ProjectCard project={project} compact key={project.slug} />
        ))}
      </div>

      {projects.length > featuredCount && (
        <div className="mt-10 flex justify-center" data-reveal>
          <a
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            href={allProjectsHref}
          >
            View all projects <ChevronRight size={16} />
          </a>
        </div>
      )}
    </section>
  )
}
