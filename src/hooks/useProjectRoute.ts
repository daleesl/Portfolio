import { useEffect, useRef, useState } from 'react'
import { scrollToElement, scrollToTop } from '@/lib/smoothScroll'

const prefix = '/work/'

export const caseStudyHref = (slug: string) => `${prefix}${slug}`
export const allProjectsHref = '/projects'
export const toolkitHref = '/toolkit'
export const eventsHref = '/events'
export const eventHref = (slug: string) => `${eventsHref}/${slug}`

export type Route =
  | { page: 'home' }
  | { page: 'projects' }
  | { page: 'toolkit' }
  | { page: 'events' }
  | { page: 'case-study'; slug: string }
  | { page: 'event'; slug: string }

type Location = { path: string; hash: string }

// Old links used the hash (#/projects, #/work/tingi); move them to the matching clean URL so shared links keep working.
function readLocation(): Location {
  const { hash } = window.location
  if (hash.startsWith('#/')) window.history.replaceState(null, '', hash.slice(1))

  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  return { path, hash: window.location.hash }
}

function toRoute(path: string): Route {
  if (path.startsWith(prefix) && path.length > prefix.length) return { page: 'case-study', slug: decodeURIComponent(path.slice(prefix.length)) }
  if (path === allProjectsHref) return { page: 'projects' }
  if (path === toolkitHref) return { page: 'toolkit' }
  if (path === eventsHref) return { page: 'events' }
  if (path.startsWith(`${eventsHref}/`)) return { page: 'event', slug: decodeURIComponent(path.slice(eventsHref.length + 1)) }
  return { page: 'home' }
}

// no router library: the path picks the page, unknown paths show home
export function useProjectRoute(): Route {
  const [location, setLocation] = useState(readLocation)
  const route = toRoute(location.path)
  // Set when a section link on the current page has already glided there, so the jump below doesn't repeat it.
  const skipNextScrollRef = useRef(false)

  useEffect(() => {
    const update = () => setLocation(readLocation())

    const followLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const link = (event.target as Element | null)?.closest('a')
      if (!link || link.target || link.hasAttribute('download')) return

      const url = new URL(link.href, window.location.href)
      // Leave other sites and real files (like the resume PDF) to the browser.
      if (url.origin !== window.location.origin || /\.\w+$/.test(url.pathname)) return
      // A section on the current page glides into view.
      if (url.pathname === window.location.pathname && url.hash) {
        const target = /^#[\w-]+$/.test(url.hash) ? document.querySelector(url.hash) : null
        if (!target) return

        event.preventDefault()
        scrollToElement(target, true)
        if (url.hash !== window.location.hash) {
          window.history.pushState(null, '', url.pathname + url.search + url.hash)
          skipNextScrollRef.current = true
          update()
        }
        return
      }

      event.preventDefault()
      window.history.pushState(null, '', url.pathname + url.search + url.hash)
      update()
    }

    window.addEventListener('popstate', update)
    window.addEventListener('hashchange', update)
    document.addEventListener('click', followLink)
    return () => {
      window.removeEventListener('popstate', update)
      window.removeEventListener('hashchange', update)
      document.removeEventListener('click', followLink)
    }
  }, [])

  // A link with a section (/#work, /events#pup-hackathon-2026) jumps to it; other inner pages open at the top.
  useEffect(() => {
    if (skipNextScrollRef.current) {
      skipNextScrollRef.current = false
      return
    }

    const target = /^#[\w-]+$/.test(location.hash) ? document.querySelector(location.hash) : null

    if (target) scrollToElement(target, false)
    else if (route.page !== 'home') scrollToTop()
  }, [route.page, location.path, location.hash])

  return route
}
