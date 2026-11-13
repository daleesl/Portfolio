import { useEffect, useState } from 'react'

const prefix = '#/work/'

export const caseStudyHref = (slug: string) => `${prefix}${slug}`
export const allProjectsHref = '#/projects'

export type Route = { page: 'home' } | { page: 'projects' } | { page: 'case-study'; slug: string }

// The site has no router: #/projects opens the full project list, and a hash like
// #/work/tingi opens that project's case study. Anything else is the home page.
export function useProjectRoute(): Route {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash)

    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  const slug = hash.startsWith(prefix) ? hash.slice(prefix.length) : null
  const isProjects = hash === allProjectsHref

  // Inner pages open at the top; going back to the home page returns to the linked section.
  useEffect(() => {
    if (slug || isProjects) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    if (/^#[\w-]+$/.test(hash)) document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' })
  }, [slug, isProjects, hash])

  if (slug) return { page: 'case-study', slug }
  if (isProjects) return { page: 'projects' }
  return { page: 'home' }
}
