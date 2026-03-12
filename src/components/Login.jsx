import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import clsx from 'clsx'

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      onLoginSuccess()
    } catch (error) {
      setError('Invalid email or password')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={clsx('min-h-screen', 'bg-gray-100', 'dark:bg-gray-900', 'flex', 'items-center', 'justify-center')}>
      <div className={clsx('bg-white', 'dark:bg-gray-800', 'p-8', 'rounded-lg', 'shadow-lg', 'w-full', 'max-w-md')}>
        <h2 className={clsx('text-2xl', 'font-bold', 'text-center', 'text-gray-800', 'dark:text-white', 'mb-6')}>
          Admin Login
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className={clsx('block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mb-2')}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={clsx(
                'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md',
                'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500',
                'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white'
              )}
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className={clsx('block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mb-2')}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={clsx(
                'w-full', 'px-3', 'py-2', 'border', 'border-gray-300', 'rounded-md',
                'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500',
                'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white'
              )}
              placeholder="Enter your password"
            />
          </div>
          
          {error && (
            <div className={clsx('text-red-500', 'text-sm', 'text-center')}>
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className={clsx(
              'w-full', 'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold',
              'py-2', 'px-4', 'rounded', 'focus:outline-none', 'focus:shadow-outline',
              'disabled:opacity-50', 'disabled:cursor-not-allowed'
            )}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login