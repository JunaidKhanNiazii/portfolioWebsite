import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import clsx from 'clsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [firebaseStatus, setFirebaseStatus] = useState('Connecting...')

  useEffect(() => {
    const testFirebaseConnection = async () => {
      try {
        // Try to read from a test collection
        const testCollection = collection(db, 'test')
        await getDocs(testCollection)
        setFirebaseStatus('✅ Firebase Connected Successfully!')
      } catch (error) {
        console.error('Firebase connection error:', error)
        setFirebaseStatus('❌ Firebase Connection Failed')
      }
    }

    testFirebaseConnection()
  }, [])

  return (
    <div className={clsx('min-h-screen', 'bg-gray-100', 'dark:bg-gray-900', 'flex', 'items-center', 'justify-center')}>
      <div className={clsx('text-center', 'p-8', 'bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-lg', 'max-w-md')}>
        <h1 className={clsx('text-4xl', 'font-bold', 'text-blue-600', 'dark:text-blue-400', 'mb-4')}>
          Portfolio Website
        </h1>
        <p className={clsx('text-gray-700', 'dark:text-gray-300', 'mb-6')}>
          React + Tailwind + Firebase
        </p>
        
        {/* Firebase Status */}
        <div className={clsx('p-4', 'bg-gray-50', 'dark:bg-gray-700', 'rounded-lg', 'mb-6')}>
          <p className={clsx('text-lg', 'font-medium', 'text-gray-800', 'dark:text-gray-200')}>
            {firebaseStatus}
          </p>
        </div>

        {/* Counter */}
        <button 
          onClick={() => setCount(count + 1)}
          className={clsx('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'mb-4')}
        >
          Count: {count}
        </button>

        {/* Project Info */}
        <div className={clsx('mt-6', 'text-sm', 'text-gray-500', 'dark:text-gray-400')}>
          <p>Project ID: {import.meta.env.VITE_FIREBASE_PROJECT_ID}</p>
        </div>
      </div>
    </div>
  )
}

export default App