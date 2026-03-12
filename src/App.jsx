import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Login from './components/Login'
import AdminPage from './components/AdminPage'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdminRoute, setIsAdminRoute] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    // Check if URL is admin route
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      setIsAdminRoute(hash === 'admin')
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleLoginSuccess = () => {
    window.location.hash = 'admin'
    setIsAdminRoute(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  // Admin route - requires authentication
  if (isAdminRoute) {
    if (!user) {
      return <Login onLoginSuccess={handleLoginSuccess} />
    }
    return <AdminPage />
  }

  // Public single-page scrollable website
  return (
    <div className="scroll-smooth">
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Contact />
    </div>
  )
}

export default App