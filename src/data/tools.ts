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
  SiGoogleearthengine,
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
import { VscAzure } from 'react-icons/vsc'
import type { Tool, ToolRow } from '@/types'

// Each row scrolls in the toolkit marquee; `duration` is seconds per loop (higher is slower).
export const toolRows: ToolRow[] = [
  {
    duration: 70,
    tools: [
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Dart', icon: SiDart },
      { name: 'Python', icon: SiPython },
      { name: 'PHP', icon: SiPhp },
      { name: 'SQL', icon: Database },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS', icon: SiCss },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Bootstrap', icon: SiBootstrap },
    ],
  },
  {
    duration: 85,
    reverse: true,
    tools: [
      { name: 'Flutter', icon: SiFlutter },
      { name: 'React', icon: SiReact },
      { name: 'React Native (Expo)', icon: SiExpo },
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'FastAPI', icon: SiFastapi },
      { name: 'Vite', icon: SiVite },
      { name: 'Firebase', icon: SiFirebase },
      { name: 'MySQL', icon: SiMysql },
      { name: 'Google Cloud Run', icon: SiGooglecloud },
      { name: 'REST APIs', icon: Webhook },
    ],
  },
  {
    duration: 78,
    tools: [
      { name: 'XGBoost', icon: Network },
      { name: 'scikit-learn', icon: SiScikitlearn },
      { name: 'pandas', icon: SiPandas },
      { name: 'OpenAI API', icon: BsOpenai },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Figma', icon: SiFigma },
      { name: 'Android Studio', icon: SiAndroidstudio },
      { name: 'Jupyter', icon: SiJupyter },
      { name: 'Google Earth Engine', icon: SiGoogleearthengine },
    ],
  },
]

export const learning: Tool[] = [{ name: 'Microsoft Azure', icon: VscAzure }]

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
