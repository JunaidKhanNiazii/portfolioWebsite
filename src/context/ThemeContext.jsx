import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const root = document.documentElement
    
    // Remove both classes first
    root.classList.remove('light', 'dark')
    
    // Add the current theme class
    root.classList.add(theme)
    
    // Save to localStorage
    localStorage.setItem('theme', theme)
    
    console.log('Theme changed to:', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      console.log('Toggling theme from', prev, 'to', newTheme)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
