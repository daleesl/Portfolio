import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export const email = 'daleandrewslee@gmail.com'
export const githubUrl = 'https://github.com/daleesl'
export const linkedinUrl = 'https://www.linkedin.com/in/daleandrewlee/'
// Drop the PDF into public/assets/ to make the resume buttons work.
export const resumeUrl = '/assets/Dale_Andrew_Lee_Resume.pdf'

export const facts = [
  { label: 'Focus', value: 'Web, mobile & ML' },
  { label: 'Stack', value: 'Flutter · React · Python' },
  { label: 'Based in', value: 'Calamba, PH' },
]

export const currentlyBuilding = 'Building RainGuard'

// `hover` is the icon colour on hover; GitHub turns white in dark mode so it stays visible.
export const socialLinks = [
  { label: 'GitHub', href: githubUrl, icon: FaGithub, hover: 'hover:text-slate-950 dark:hover:text-white' },
  { label: 'LinkedIn', href: linkedinUrl, icon: FaLinkedin, hover: 'hover:text-[#0A66C2] dark:hover:text-[#4D9FEA]' },
  { label: 'Email', href: `mailto:${email}`, icon: Mail, hover: 'hover:text-red-600 dark:hover:text-red-400' },
]
