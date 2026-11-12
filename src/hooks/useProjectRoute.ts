import { useEffect, useState } from 'react'

const prefix = '#/work/'

export const caseStudyHref = (slug: string) => `${prefix}${slug}`

// The site has no router: a hash like #/work/tingi opens that project's case study.
// Returns the project's slug, or null for the home page.
export function useProjectRoute() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash)

    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  const slug = hash.startsWith(prefix) ? hash.slice(prefix.length) : null

  // Case studies open at the top; going back to the home page returns to the linked section.
  useEffect(() => {
    if (slug) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    if (/^#[\w-]+$/.test(hash)) document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' })
  }, [slug, hash])

  return slug
}
