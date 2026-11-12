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
}

export type ToolRow = {
  tools: Tool[]
  duration: number
  reverse?: boolean
}

export type ArchiveProject = {
  title: string
  tags: string
  link: string
}
