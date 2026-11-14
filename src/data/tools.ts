import { Database, Network, ScanEye, Webhook } from 'lucide-react'
import { BsOpenai } from 'react-icons/bs'
import {
  SiAndroidstudio,
  SiBootstrap,
  SiCss,
  SiDart,
  SiExpo,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGooglecloud,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiMysql,
  SiNodedotjs,
  SiPandas,
  SiPhp,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si'
import type { Tool, ToolCategory, ToolRow } from '@/types'

// Each row scrolls in the toolkit marquee; `duration` is seconds per loop (higher is slower).
// `color` is the brand colour; tools without one (black logos) follow light and dark mode.
export const toolRows: ToolRow[] = [
  {
    duration: 70,
    tools: [
      { name: 'JavaScript', icon: SiJavascript, color: '#E8C900' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Dart', icon: SiDart, color: '#0175C2' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'PHP', icon: SiPhp, color: '#777BB4' },
      { name: 'SQL', icon: Database },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss, color: '#1572B6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
    ],
  },
  {
    duration: 85,
    reverse: true,
    tools: [
      { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
      { name: 'React', icon: SiReact, color: '#4FC3E8' },
      { name: 'React Native (Expo)', icon: SiExpo },
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFA000' },
      { name: 'Supabase', icon: SiSupabase, color: '#3FCF8E' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Google Cloud Run', icon: SiGooglecloud, color: '#4285F4' },
      { name: 'REST APIs', icon: Webhook },
    ],
  },
  {
    duration: 78,
    tools: [
      { name: 'XGBoost', icon: Network, color: '#189FDD' },
      { name: 'scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
      { name: 'pandas', icon: SiPandas, color: '#E70488' },
      { name: 'OpenAI API', icon: BsOpenai },
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Android Studio', icon: SiAndroidstudio, color: '#3DDC84' },
      { name: 'Jupyter', icon: SiJupyter, color: '#F37626' },
    ],
  },
]

// Looks tools up by name in `toolRows`, so each tool's icon and colour are set in one place.
const toolsByName = new Map(toolRows.flatMap((row) => row.tools).map((tool) => [tool.name, tool]))

const pick = (...names: string[]): Tool[] =>
  names.map((name) => {
    const tool = toolsByName.get(name)
    if (!tool) throw new Error(`Unknown tool "${name}" in toolCategories; add it to toolRows first.`)
    return tool
  })

// The grouped list on the full tech stack page (/toolkit).
export const toolCategories: ToolCategory[] = [
  { title: 'Languages', tools: pick('JavaScript', 'TypeScript', 'Dart', 'Python', 'PHP', 'SQL') },
  { title: 'Frontend', tools: pick('HTML5', 'CSS', 'Tailwind CSS', 'Bootstrap', 'React', 'Vite') },
  { title: 'Mobile', tools: pick('Flutter', 'React Native (Expo)', 'Android Studio') },
  {
    title: 'Backend & Database',
    tools: pick('Node.js', 'FastAPI', 'REST APIs', 'Firebase', 'Supabase', 'MySQL', 'Google Cloud Run'),
  },
  { title: 'Machine Learning & AI', tools: pick('XGBoost', 'scikit-learn', 'pandas', 'Jupyter', 'OpenAI API') },
  { title: 'Design & Tools', tools: pick('Figma', 'Git', 'GitHub') },
]

// Logos for the tags on project cards, keyed by the tag text in projects.ts.
// `color` is the brand colour; leave it out for black logos so they follow light and dark mode.
export const techIcons: Record<string, Pick<Tool, 'icon'> & { color?: string }> = {
  Flutter: { icon: SiFlutter, color: '#02569B' },
  Firebase: { icon: SiFirebase, color: '#FFA000' },
  FastAPI: { icon: SiFastapi, color: '#009688' },
  XGBoost: { icon: Network, color: '#189FDD' },
  React: { icon: SiReact, color: '#4FC3E8' },
  'React Native': { icon: SiReact, color: '#4FC3E8' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  'Node.js': { icon: SiNodedotjs, color: '#5FA04E' },
  'OpenAI API': { icon: BsOpenai },
  Python: { icon: SiPython, color: '#3776AB' },
  'scikit-learn': { icon: SiScikitlearn, color: '#F7931E' },
  'Image classification': { icon: ScanEye, color: '#64748B' },
  PHP: { icon: SiPhp, color: '#777BB4' },
  MySQL: { icon: SiMysql, color: '#4479A1' },
  JavaScript: { icon: SiJavascript, color: '#E8C900' },
  Bootstrap: { icon: SiBootstrap, color: '#7952B3' },
  Expo: { icon: SiExpo },
  Supabase: { icon: SiSupabase, color: '#3FCF8E' },
}
