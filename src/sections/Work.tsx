import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'
import { eyebrow, section } from '@/lib/ui'

export default function Work() {
  return (
    <section className={section} id="work" aria-labelledby="work-title">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-4" data-reveal>
        <div className="flex-[1_1_380px]">
          <p className={eyebrow}>Selected work</p>
          <h2 className="mt-3 font-pixel text-3xl font-normal lowercase md:text-[40px]" id="work-title">
            Projects I've led and shipped.
          </h2>
        </div>
        <p className="flex-[0_1_280px] text-[13px] leading-6 text-slate-600 dark:text-slate-400">
          A capstone, a hackathon finalist and coursework across mobile, web and machine learning.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => <ProjectCard project={project} key={project.title} />)}
      </div>
    </section>
  )
}
