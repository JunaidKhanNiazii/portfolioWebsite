import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import clsx from 'clsx'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      await addDoc(collection(db, 'contacts'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: new Date().toISOString(),
        status: 'unread'
      })

      setFormData({ name: '', email: '', message: '' })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Error sending message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className={clsx('min-h-screen', 'bg-white', 'dark:bg-gray-800', 'py-12', 'px-4', 'flex', 'items-center')}>
      <div className={clsx('max-w-2xl', 'mx-auto', 'w-full')}>
        <h1 className={clsx('text-4xl', 'font-bold', 'text-blue-600', 'dark:text-blue-400', 'mb-8', 'text-center')}>
          Contact Us
        </h1>

        <div className={clsx('bg-gray-50', 'dark:bg-gray-700', 'rounded-lg', 'shadow-lg', 'p-8')}>
          {success && (
            <div className={clsx('bg-green-100', 'dark:bg-green-900', 'text-green-800', 'dark:text-green-200', 'p-4', 'rounded-md', 'mb-6')}>
              ✅ Message sent successfully! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={clsx('block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mb-2')}>
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={clsx(
                  'w-full', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md',
                  'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500',
                  'dark:bg-gray-600', 'dark:border-gray-500', 'dark:text-white'
                )}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className={clsx('block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mb-2')}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={clsx(
                  'w-full', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md',
                  'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500',
                  'dark:bg-gray-600', 'dark:border-gray-500', 'dark:text-white'
                )}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className={clsx('block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mb-2')}>
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                className={clsx(
                  'w-full', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md',
                  'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500',
                  'dark:bg-gray-600', 'dark:border-gray-500', 'dark:text-white'
                )}
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={clsx(
                'w-full', 'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold',
                'py-3', 'px-4', 'rounded', 'focus:outline-none', 'focus:shadow-outline',
                'disabled:opacity-50', 'disabled:cursor-not-allowed'
              )}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className={clsx('mt-8', 'pt-8', 'border-t', 'border-gray-200', 'dark:border-gray-600')}>
            <h3 className={clsx('text-lg', 'font-semibold', 'text-gray-800', 'dark:text-white', 'mb-4')}>
              Other Ways to Reach Me
            </h3>
            <div className={clsx('space-y-2', 'text-gray-600', 'dark:text-gray-400')}>
              <p>📧 Email: junaidameerkhan555@gmail.com</p>
              <p>📱 Phone: +92 XXX XXXXXXX</p>
              <p>🌐 LinkedIn: linkedin.com/in/yourprofile</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
