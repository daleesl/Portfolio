import type { LucideIcon } from 'lucide-react'
import type { IconType } from 'react-icons'

export type Project = {
  number: string
  title: string
  label: string
  description: string
  result?: string
  tags: string[]
  image?: string
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
