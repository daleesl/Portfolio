import { Database, Network, Webhook } from 'lucide-react'
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
