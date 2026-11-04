import type { ArchiveProject, Project } from '@/types'

// Add `image: './assets/images/...'` or `links: [{ label: 'GitHub', href: '...' }]` to any project to show them on its card.
export const projects: Project[] = [
  {
    number: '01',
    title: 'RainGuard',
    label: 'Capstone · Team lead',
    description:
      'A community flood monitoring system for Barangay Quiling, with weather forecasts, GPS-tagged reports, a live risk map and push alerts.',
    result: 'Cut 3-hour forecast error by up to 18% with an XGBoost model.',
    tags: ['Flutter', 'Firebase', 'FastAPI', 'XGBoost', 'React'],
  },
  {
    number: '02',
    title: 'Konektado',
    label: 'Hackathon · Front-end dev',
    description:
      'An AI-powered service marketplace that connects customers with skilled local workers. I built the mobile interface for both the customer and worker flows.',
    result: '3rd Runner-Up of 40 teams, Top 10 finalist.',
    tags: ['React Native', 'TypeScript', 'Node.js', 'OpenAI API'],
  },
  {
    number: '03',
    title: 'Coffee Lens',
    label: 'Computer vision · ML',
    description:
      'An image classifier that identifies coffee bean roast levels (green, light and medium) from photos, trained on a dataset I cleaned and preprocessed.',
    tags: ['Python', 'scikit-learn', 'Image classification'],
  },
  {
    number: '04',
    title: 'Horologe',
    label: 'Full-stack web',
    description:
      'An e-commerce store for luxury timepieces with product listings, search filtering and a cart, running on a PHP backend.',
    result: 'Normalized MySQL schema for inventory, accounts and sales.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
  },
]

export const archive: ArchiveProject[] = [
  { title: 'Apple Landing Page', tags: 'HTML · CSS · Responsive', link: 'https://daleesl.github.io/WD-02/' },
  { title: 'Japan Travel Guide', tags: 'HTML · CSS · Bootstrap', link: 'https://daleesl.github.io/WD-03/' },
  { title: 'Straw Hat Gallery', tags: 'JavaScript · JSON · DOM', link: 'https://daleesl.github.io/WD-04/' },
  { title: 'Random User Explorer', tags: 'JavaScript · REST API · Async', link: 'https://daleesl.github.io/WD-05/' },
]
