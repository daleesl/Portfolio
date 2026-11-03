import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Moon,
  Sun,
} from 'lucide-react'
import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa'
import DotGrid from '@/components/DotGrid'

type Project = {
  number: string
  title: string
  label: string
  description: string
  image: string
  link: string
  tags: string[]
}

const container = 'mx-auto w-full max-w-[800px] px-4 sm:px-5'
const eyebrow = 'font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400'

const projects: Project[] = [
  {
    number: '01',
    title: 'Apple Landing Page',
    label: 'Responsive product page',
    description:
      'A focused landing-page exercise exploring product hierarchy, clean spacing, and responsive layouts with semantic HTML and CSS.',
    image: './assets/images/WD-02.png',
    link: 'https://daleesl.github.io/WD-02/',
    tags: ['HTML', 'CSS', 'Responsive'],
  },
  {
    number: '02',
    title: 'Japan Travel Guide',
    label: 'Culture and travel experience',
    description:
      'A visual travel guide highlighting Japanese attractions, culture, and cuisine through an inviting, content-led interface.',
    image: './assets/images/WD-03.png',
    link: 'https://daleesl.github.io/WD-03/',
    tags: ['HTML', 'CSS', 'Bootstrap'],
  },
  {
    number: '03',
    title: 'Straw Hat Gallery',
    label: 'Data-driven character gallery',
    description:
      'A dynamic One Piece gallery that renders character profiles and imagery from structured JSON using JavaScript.',
    image: './assets/images/WD-04.png',
    link: 'https://daleesl.github.io/WD-04/',
    tags: ['JavaScript', 'JSON', 'DOM'],
  },
  {
    number: '04',
    title: 'Random User Explorer',
    label: 'External API integration',
    description:
      'A small web application that fetches, processes, and presents random user data from an external API.',
    image: './assets/images/WD-05.png',
    link: 'https://daleesl.github.io/WD-05/',
    tags: ['JavaScript', 'REST API', 'Async'],
  },
]

const skills = [
  'React',
  'TypeScript',
  'JavaScript',
  'HTML & CSS',
  'Bootstrap',
  'Git & GitHub',
  'Figma',
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/daleesl', icon: FaGithub },
  { label: 'Instagram', href: 'https://www.instagram.com/daleesl_/', icon: FaInstagram },
  { label: 'Facebook', href: 'https://www.facebook.com/daleandrewslee/', icon: FaFacebook },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(15,23,42,0.28)] dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none md:p-5"
      data-reveal
    >
      <a
        className="relative aspect-video overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800"
        href={project.link}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title}`}
      >
        <img
          className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
          src={project.image}
          alt={`${project.title} website preview`}
          loading="lazy"
        />
        <span className="absolute right-3.5 bottom-3.5 grid size-10 place-items-center rounded-full bg-white text-slate-950 opacity-100 shadow-lg transition md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <ArrowUpRight size={20} />
        </span>
      </a>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.11em] text-slate-400">
          <span className="text-sky-500">{project.number}</span>
          <span>{project.label}</span>
        </div>
        <h3 className="mt-3 mb-2.5 text-xl font-semibold md:text-2xl">
          {project.title}
        </h3>
        <p className="text-[13px] leading-7 text-slate-500 dark:text-slate-400">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              className="rounded-full border border-slate-300 px-2 py-1 font-mono text-[9px] uppercase tracking-wide text-slate-500 dark:border-slate-600 dark:text-slate-400"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          className="mt-6 inline-flex items-center justify-between gap-1 border-t border-slate-200 pt-4 font-mono text-[10px] font-medium uppercase tracking-wide dark:border-slate-800"
          href={project.link}
          target="_blank"
          rel="noreferrer"
        >
          View live project <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={14} />
        </a>
      </div>
    </article>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isNavScrolled, setIsNavScrolled] = useState(false)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('dale-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    window.localStorage.setItem('dale-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const updateNavShadow = () => setIsNavScrolled(window.scrollY > 8)

    updateNavShadow()
    window.addEventListener('scroll', updateNavShadow, { passive: true })
    return () => window.removeEventListener('scroll', updateNavShadow)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen overflow-hidden border-t-4 border-slate-800 bg-white text-slate-950 transition-colors dark:bg-[#111318] dark:text-slate-100">
      {/* Navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
          isNavScrolled
            ? 'border-slate-200/70 bg-white/80 shadow-lg shadow-slate-900/5 dark:border-white/10 dark:bg-slate-950/80 dark:shadow-black/25'
            : 'border-transparent bg-white/90 dark:bg-slate-950/90'
        }`}
      >
        <nav className={`${container} flex min-h-16 items-center`} aria-label="Primary navigation">
          <a className="mr-auto grid size-9 place-items-center" href="#top" aria-label="Dale Lee, home">
            <img
              className="size-8 object-contain"
              src={darkMode ? './assets/Logo/white-logo.svg' : './assets/Logo/black-logo.svg'}
              alt=""
              aria-hidden="true"
            />
          </a>

          <div className="flex gap-4 font-mono text-[11px] uppercase tracking-wide text-slate-400 sm:gap-6">
            <a className="transition-colors hover:text-slate-950 dark:hover:text-white" href="#work">Projects</a>
            <a className="hidden transition-colors hover:text-slate-950 dark:hover:text-white min-[470px]:block" href="#about">About</a>
            <a className="transition-colors hover:text-slate-950 dark:hover:text-white" href="#contact">Contact</a>
          </div>

          <div className="ml-3 flex items-center gap-2 before:h-7 before:w-px before:bg-slate-200 dark:before:bg-slate-800 sm:ml-5 sm:gap-3">
            <button
              className="grid size-10 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:hover:bg-slate-800 dark:hover:text-white"
              type="button"
              onClick={() => setDarkMode((current) => !current)}
              aria-label={darkMode ? 'Use light theme' : 'Use dark theme'}
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </nav>
      </header>

      <main id="top" className="pt-16">
        {/* Hero */}
        <section className="relative isolate min-h-[calc(100vh-84px)] overflow-hidden" aria-labelledby="hero-title">
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

          <div className={`${container} pt-8 pb-16 md:pt-10 md:pb-20 lg:pt-12 lg:pb-24`}>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8" data-reveal>
            <img
              className="size-32 shrink-0 rounded-full object-cover shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 md:size-44"
              src="./assets/images/profile-pic.jpg"
              alt="Dale Lee"
            />

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-pixel text-3xl font-normal md:text-[42px]" id="hero-title">
                  Dale Lee
                </h1>
                <span className="grid size-6 place-items-center rounded-full bg-sky-500 text-white" title="This is Dale">
                  <Check size={13} strokeWidth={3} />
                </span>
              </div>
              <div className="mt-3 flex gap-3 text-slate-500">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    className="transition hover:-translate-y-0.5 hover:text-sky-500"
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7" data-reveal>
            <h2 className="text-3xl leading-tight font-normal md:text-[38px]">
              Full-Stack Web Developer{' '}
              <span className="font-light text-slate-500">- React &amp; Modern Web</span>
            </h2>
            <p className="mt-6 leading-8 text-slate-500 dark:text-slate-400 md:text-lg md:leading-9">
              I'm a third-year BSIT student at PUP Sto. Tomas building clear and responsive
              websites with React, TypeScript and JavaScript.
              I'm currently strengthening my backend development fundamentals to create systems that are useful, reliable, and secure.
            </p>
            <a
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-slate-950 px-7 font-mono text-xs font-medium uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-slate-100 dark:text-slate-950 sm:w-auto"
              href="#work"
            >
              View Projects <ArrowDownRight size={18} />
            </a>
          </div>
          </div>
        </section>

        {/* Projects */}
        <section className={`${container} border-t border-slate-200 py-20 dark:border-slate-800 md:py-24`} id="work" aria-labelledby="work-title">
          <div className="mb-12 grid gap-4 md:grid-cols-[1fr_285px] md:items-end" data-reveal>
            <div>
              <p className={eyebrow}>Selected work</p>
              <h2 className="mt-3 font-pixel text-3xl font-normal lowercase md:text-[42px]" id="work-title">
                Projects built while learning.
              </h2>
            </div>
            <p className="text-[13px] leading-6 text-slate-500 dark:text-slate-400">
              Four experiments across responsive design, dynamic data, and APIs.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => <ProjectCard project={project} key={project.title} />)}
          </div>
        </section>

        {/* About */}
        <section className={`${container} border-t border-slate-200 py-20 dark:border-slate-800 md:py-24`} id="about" aria-labelledby="about-title">
          <p className={`${eyebrow} mb-9`} data-reveal>About / 02</p>
          <div className="grid gap-8 md:grid-cols-[.95fr_1.05fr] md:gap-16">
            <h2 className="font-pixel text-3xl leading-tight font-normal lowercase md:text-[40px]" id="about-title" data-reveal>
              Curious about the full picture - from the interface to the infrastructure.
            </h2>
            <div className="space-y-5 text-[15px] leading-7 text-slate-500 dark:text-slate-400" data-reveal>
              <p>
                I'm building a strong foundation in web applications, data, and system
                functionality. My goal is to make digital products feel considered on the
                surface and remain dependable underneath.
              </p>
              <p>
                Alongside web development, I'm exploring cybersecurity so the systems I create
                can be efficient, reliable, and secure by design.
              </p>
            </div>
          </div>
        </section>

        {/* Toolkit */}
        <section className={`${container} grid gap-9 border-t border-slate-200 py-20 dark:border-slate-800 md:grid-cols-[.8fr_1.2fr] md:items-center md:gap-14 md:py-24`} id="stack" aria-labelledby="stack-title">
          <div data-reveal>
            <p className={eyebrow}>Current toolkit</p>
            <h2 className="mt-3 font-pixel text-3xl font-normal lowercase md:text-[40px]" id="stack-title">
              Tools I use and skills I'm growing.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" data-reveal>
            {skills.map((skill) => (
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-2 font-mono text-[9px] uppercase tracking-wide text-slate-500 transition hover:border-slate-950 hover:text-slate-950 dark:border-slate-600 dark:text-slate-400 dark:hover:border-white dark:hover:text-white" key={skill}>
                <span className="size-1.5 rounded-full bg-sky-500" /> {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className={`${container} my-16 rounded-2xl bg-slate-950 p-7 text-white sm:p-10 md:my-20 md:p-14 dark:bg-slate-100 dark:text-slate-950`} id="contact" aria-labelledby="contact-title" data-reveal>
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] opacity-50">Have something in mind?</p>
          <h2 className="mt-5 max-w-2xl text-3xl leading-tight font-medium md:text-5xl" id="contact-title">
            Let's build something clear, useful, and memorable.
          </h2>
          <a className="mt-8 inline-flex items-center gap-2 border-b border-current pb-1 font-mono text-xs font-medium uppercase tracking-wide" href="https://www.instagram.com/daleesl_/" target="_blank" rel="noreferrer">
            Message me on Instagram <ArrowUpRight size={18} />
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className={`${container} grid grid-cols-[1fr_auto] gap-4 border-t border-slate-200 py-8 font-mono text-[10px] uppercase tracking-wide text-slate-500 dark:border-slate-800 md:grid-cols-[1fr_auto_1fr]`}>
        <p>Copyright {new Date().getFullYear()} Dale Lee</p>
        <p className="hidden md:block">Designed and built in Calamba.</p>
        <a className="justify-self-end" href="#top">Back to top</a>
      </footer>
    </div>
  )
}

export default App
