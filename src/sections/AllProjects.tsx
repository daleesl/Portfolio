import { ArrowLeft } from 'lucide-react'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'
import { container } from '@/lib/ui'

// The full project list, opened from "View all projects" on the home page (#/projects).
export default function AllProjects() {
  return (
    <section className={`${container} pt-8 pb-20`} aria-labelledby="all-projects-title">
      <a
        className="inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-slate-500 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
        href="#work"
      >
        <ArrowLeft size={16} /> Back to home
      </a>

      <h1 className="mt-6 font-pixel text-[44px] leading-none font-normal md:text-6xl" id="all-projects-title">
        Selected projects
      </h1>
      <p className="mt-5 max-w-[640px] text-lg leading-8 font-light text-slate-600 dark:text-slate-400">
        A capstone, a hackathon finalist, an app for my family's store and coursework across mobile, web and machine learning.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => <ProjectCard project={project} key={project.slug} />)}
      </div>
    </section>
  )
}
