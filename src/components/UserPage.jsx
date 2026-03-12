import { useState } from 'react'
import clsx from 'clsx'

function UserPage() {
  const [count, setCount] = useState(0)

  return (
    <div className={clsx('min-h-screen', 'bg-gray-100', 'dark:bg-gray-900', 'flex', 'items-center', 'justify-center')}>
      <div className={clsx('text-center', 'p-8', 'bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-lg', 'max-w-md')}>
        <h1 className={clsx('text-4xl', 'font-bold', 'text-blue-600', 'dark:text-blue-400', 'mb-4')}>
          Portfolio Website
        </h1>
        <p className={clsx('text-gray-700', 'dark:text-gray-300', 'mb-6')}>
          Welcome to my portfolio! This is the public user interface.
        </p>
        
        {/* Interactive Counter */}
        <div className={clsx('p-4', 'bg-gray-50', 'dark:bg-gray-700', 'rounded-lg', 'mb-6')}>
          <button 
            onClick={() => setCount(count + 1)}
            className={clsx('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'mb-4')}
          >
            Count: {count}
          </button>
        </div>

        {/* Portfolio Sections */}
        <div className={clsx('space-y-4', 'text-left')}>
          <div className={clsx('p-4', 'bg-blue-50', 'dark:bg-blue-900', 'rounded-lg')}>
            <h3 className={clsx('font-semibold', 'text-blue-800', 'dark:text-blue-200')}>About Me</h3>
            <p className={clsx('text-sm', 'text-blue-600', 'dark:text-blue-300')}>
              Full-stack developer passionate about creating amazing web experiences.
            </p>
          </div>
          
          <div className={clsx('p-4', 'bg-green-50', 'dark:bg-green-900', 'rounded-lg')}>
            <h3 className={clsx('font-semibold', 'text-green-800', 'dark:text-green-200')}>Projects</h3>
            <p className={clsx('text-sm', 'text-green-600', 'dark:text-green-300')}>
              Check out my latest projects and contributions.
            </p>
          </div>
          
          <div className={clsx('p-4', 'bg-purple-50', 'dark:bg-purple-900', 'rounded-lg')}>
            <h3 className={clsx('font-semibold', 'text-purple-800', 'dark:text-purple-200')}>Contact</h3>
            <p className={clsx('text-sm', 'text-purple-600', 'dark:text-purple-300')}>
              Get in touch for collaborations and opportunities.
            </p>
          </div>
        </div>

        {/* Admin Access Link */}
        <div className={clsx('mt-6', 'pt-4', 'border-t', 'border-gray-200', 'dark:border-gray-600')}>
          <a 
            href="/admin" 
            className={clsx('text-sm', 'text-gray-500', 'dark:text-gray-400', 'hover:text-blue-500')}
          >
            Admin Access
          </a>
        </div>
      </div>
    </div>
  )
}

export default UserPage