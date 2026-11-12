import { useEffect } from 'react'

// Fades in every element marked with `data-reveal` the first time it scrolls into view.
// Pass something that changes with the page so newly rendered elements are picked up.
export function useRevealOnScroll(page: string | null) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [page])
}
