import { ChevronRight, Mail } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import AnimatedContent from '@/components/AnimatedContent'
import { email, linkedinUrl } from '@/data/profile'
import { eyebrow, section } from '@/lib/ui'

const contactCards = [
  { label: 'Email', value: email, href: `mailto:${email}`, icon: Mail },
  { label: "Let's connect", value: 'LinkedIn', href: linkedinUrl, icon: FaLinkedin },
]

export default function Contact() {
  return (
    <section className={`${section} mb-8`} id="contact" aria-labelledby="contact-title">
      <AnimatedContent className="grid items-center gap-10 md:grid-cols-[1fr_320px]" stagger={0.06}>
        <div>
          <p className={eyebrow}>Contact</p>
          <h2 className="mt-3 font-pixel text-3xl font-normal lowercase md:text-[40px]" id="contact-title">
            Let's work together.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-7 text-slate-600 dark:text-slate-400">
            I'm looking for a software engineering or web development internship. Whether you're hiring, building
            something new or want to talk about a project, I'd love to hear from you.
          </p>
        </div>

        <ul className="grid gap-3">
          {contactCards.map(({ label, value, href, icon: Icon }) => (
            <li key={label}>
              <a
                className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-slate-700 dark:hover:bg-slate-900"
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`${eyebrow} block`}>{label}</span>
                  <span className="mt-0.5 block truncate text-sm">{value}</span>
                </span>
                <ChevronRight
                  className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5"
                  size={16}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </AnimatedContent>
    </section>
  )
}
