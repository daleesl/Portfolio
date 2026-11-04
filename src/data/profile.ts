import { Mail } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

export const email = 'daleandrewslee@gmail.com'
export const githubUrl = 'https://github.com/daleesl'
// Drop the PDF into public/assets/ to make the resume buttons work.
export const resumeUrl = './assets/Dale_Andrew_Lee_Resume.pdf'

export const facts = [
  { label: 'Focus', value: 'Web, mobile & ML' },
  { label: 'Stack', value: 'Flutter · React · Python' },
  { label: 'Based in', value: 'Calamba, PH' },
]

export const currentlyBuilding = 'Building RainGuard'

export const socialLinks = [
  { label: 'GitHub', href: githubUrl, icon: FaGithub },
  { label: 'Email', href: `mailto:${email}`, icon: Mail },
]
