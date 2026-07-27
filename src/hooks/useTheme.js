import { useEffect, useState } from 'react'

const STORAGE_KEY = 'somni-theme'

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

  return { theme, toggleTheme }
}
