import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

const storageKey = 'dale-theme'

// Light/dark theme, saved in localStorage. Falls back to the visitor's system setting.
export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = window.localStorage.getItem(storageKey)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return savedTheme ? savedTheme === 'dark' : prefersDark
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    window.localStorage.setItem(storageKey, darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Wipes the new theme in from the top where View Transitions are supported (animation in styles.css).
  const toggleTheme = () => {
    const next = !darkMode
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!('startViewTransition' in document) || reduceMotion) {
      setDarkMode(next)
      return
    }

    document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark', next)
      flushSync(() => setDarkMode(next))
    })
  }

  return { darkMode, toggleTheme }
}
