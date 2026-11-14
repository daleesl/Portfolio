import { ChevronRight } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'
import { allProjectsHref } from '@/hooks/useProjectRoute'
import { eyebrow, section } from '@/lib/ui'

// How many projects the home page shows before "View all projects".
const featuredCount = 3

export default function Work() {
  return (
    <section className={section} id="work" aria-labelledby="work-title">
      <AnimatedContent className="mb-10" blur={4}>
        <p className={eyebrow}>Selected work</p>
        <h2 className="mt-3 font-pixel text-3xl font-normal lowercase md:text-[40px]" id="work-title">
          Projects
        </h2>
      </AnimatedContent>

      <AnimatedContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3" stagger={0.06}>
        {projects.slice(0, featuredCount).map((project) => (
          <ProjectCard project={project} compact key={project.slug} />
        ))}
      </AnimatedContent>

      {projects.length > featuredCount && (
        <AnimatedContent className="mt-10 flex justify-center">
          <a
            className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            href={allProjectsHref}
          >
            View all projects <ChevronRight size={16} />
          </a>
        </AnimatedContent>
      )}
    </section>
  )
}
