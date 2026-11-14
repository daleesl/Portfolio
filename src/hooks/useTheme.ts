import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

// Only set when the visitor picks a theme with the toggle (index.html reads it too, before the page draws).
const storageKey = 'dale-theme-choice'

function readChoice() {
  try {
    return window.localStorage.getItem(storageKey)
  } catch {
    return null
  }
}

function saveChoice(dark: boolean) {
  try {
    window.localStorage.setItem(storageKey, dark ? 'dark' : 'light')
  } catch {
    // Storage can be blocked (private mode); the theme still switches for this visit.
  }
}

// Light/dark theme. Dark by default; a theme the visitor picks with the toggle is remembered.
export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => readChoice() !== 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  // Wipes the new theme in from the top where View Transitions are supported (animation in styles.css).
  const toggleTheme = () => {
    const next = !darkMode
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    saveChoice(next)

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
