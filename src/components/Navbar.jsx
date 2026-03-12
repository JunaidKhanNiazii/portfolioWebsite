import clsx from 'clsx'
import { useTheme } from '../context/ThemeContext'

function Navbar({ onNavigate }) {
  const { theme, toggleTheme } = useTheme()
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={clsx('bg-white', 'dark:bg-gray-800', 'shadow-md', 'fixed', 'w-full', 'top-0', 'z-50')}>
      <div className={clsx('max-w-6xl', 'mx-auto', 'px-4')}>
        <div className={clsx('flex', 'justify-between', 'items-center', 'h-16')}>
          <div className={clsx('text-xl', 'font-bold', 'text-blue-600', 'dark:text-blue-400')}>
            Portfolio
          </div>
          
          <div className={clsx('flex', 'items-center', 'gap-6')}>
            <div className={clsx('flex', 'space-x-6')}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={clsx(
                    'text-gray-700', 'dark:text-gray-300', 'hover:text-blue-600', 'dark:hover:text-blue-400',
                    'font-medium', 'transition-colors'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={clsx(
                'p-2', 'rounded-lg', 'bg-gray-200', 'dark:bg-gray-700',
                'hover:bg-gray-300', 'dark:hover:bg-gray-600', 'transition-colors'
              )}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
