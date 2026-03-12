import { useState } from 'react'
import clsx from 'clsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={clsx('min-h-screen', 'bg-gray-100', 'flex', 'items-center', 'justify-center')}>
      <div className="text-center">
        <h1 className={clsx('text-4xl', 'font-bold', 'text-blue-600', 'mb-4')}>
          React + Tailwind + Vite
        </h1>
        <p className={clsx('text-gray-700', 'mb-6')}>Your setup is working correctly!</p>
        <button 
          onClick={() => setCount(count + 1)}
          className={clsx('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded')}
        >
          Count: {count}
        </button>
      </div>
    </div>
  )
}

export default App