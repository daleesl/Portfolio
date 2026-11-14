import type { LucideIcon } from 'lucide-react'
import type { IconType } from 'react-icons'

export type Project = {
  slug: string
  number: string
  title: string
  label: string
  role: string
  description: string
  result?: string
  highlights: string[]
  tags: string[]
  // Pictures in the card's carousel.
  images?: string[]
  // Every screen, shown on the case study page.
  screens?: { src: string; label: string }[]
  screenType?: 'phone' | 'web'
  links?: { label: string; href: string }[]
}

export type Tool = {
  name: string
  icon: IconType | LucideIcon
  // Brand colour for the icon; leave it out for black logos so they follow light and dark mode.
  color?: string
}

export type CertificateImage = {
  src: string
  caption: string
  // Sets the preview's shape, so landscape and portrait certificates line up at the same height.
  shape: 'landscape' | 'portrait'
}

// A certification (a course or exam) or an award (a placing or recognition), shown in "Certifications & awards".
export type Certification = {
  kind: 'Certification' | 'Award'
  title: string
  issuer: string
  // An extra line under the issuer, such as who ran the course.
  detail?: string
  date: string
  // A PDF of the certificate (opens in a new tab) or a page on this site, such as the event.
  link: { label: string; href: string }
  // Pictures of the certificate, shown as previews that open full size.
  images?: CertificateImage[]
  logo?: IconType
  logoColor?: string
}

export type EventPhoto = {
  src: string
  caption: string
}

// A hackathon, presentation or feature shown on the home page and the events page (/events).
export type PortfolioEvent = {
  slug: string
  title: string
  date: string
  badge?: string
  role: string
  // One line for the home page card.
  summary: string
  description: string
  // Slug of a related project in projects.ts, linked as "Project: <title>".
  project?: string
  // Outside links, such as a post someone else published about the event.
  links?: { label: string; href: string }[]
  photos: EventPhoto[]
}

export type ToolCategory = {
  title: string
  tools: Tool[]
}

export type ToolRow = {
  tools: Tool[]
  duration: number
  reverse?: boolean
}
