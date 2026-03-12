import { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useTheme } from '../context/ThemeContext'
import clsx from 'clsx'

function AdminPage() {
  const { theme, toggleTheme } = useTheme()
  const [projects, setProjects] = useState([])
  const [contacts, setContacts] = useState([])
  const [activeTab, setActiveTab] = useState('projects')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubLink: '',
    websiteLink: '',
    imageFile: null,
    imagePreview: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProjects()
    fetchContacts()
  }, [])

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'))
      const projectsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setProjects(projectsList)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const fetchContacts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'contacts'))
      const contactsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setContacts(contactsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      window.location.hash = ''
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ 
        ...prev, 
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (formData.imageFile) {
        const reader = new FileReader()
        reader.onloadend = async () => {
          await addDoc(collection(db, 'projects'), {
            title: formData.title,
            description: formData.description,
            githubLink: formData.githubLink,
            websiteLink: formData.websiteLink,
            imageUrl: reader.result,
            createdAt: new Date().toISOString()
          })

          setFormData({
            title: '',
            description: '',
            githubLink: '',
            websiteLink: '',
            imageFile: null,
            imagePreview: ''
          })
          setShowForm(false)
          fetchProjects()
          alert('Project added successfully!')
          setLoading(false)
        }
        reader.readAsDataURL(formData.imageFile)
      } else {
        await addDoc(collection(db, 'projects'), {
          title: formData.title,
          description: formData.description,
          githubLink: formData.githubLink,
          websiteLink: formData.websiteLink,
          imageUrl: '',
          createdAt: new Date().toISOString()
        })

        setFormData({
          title: '',
          description: '',
          githubLink: '',
          websiteLink: '',
          imageFile: null,
          imagePreview: ''
        })
        setShowForm(false)
        fetchProjects()
        alert('Project added successfully!')
        setLoading(false)
      }
    } catch (error) {
      console.error('Error adding project:', error)
      alert('Error adding project: ' + error.message)
      setLoading(false)
    }
  }

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', projectId))
        fetchProjects()
        alert('Project deleted successfully!')
      } catch (error) {
        console.error('Error deleting project:', error)
        alert('Error deleting project: ' + error.message)
      }
    }
  }

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'contacts', contactId))
        fetchContacts()
        alert('Message deleted successfully!')
      } catch (error) {
        console.error('Error deleting message:', error)
        alert('Error deleting message: ' + error.message)
      }
    }
  }

  const markAsRead = async (contactId) => {
    try {
      await updateDoc(doc(db, 'contacts', contactId), {
        status: 'read'
      })
      fetchContacts()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const unreadCount = contacts.filter(c => c.status === 'unread').length

  return (
    <div className={clsx('min-h-screen', 'bg-gray-100', 'dark:bg-gray-900')}>
      {/* Admin Navbar */}
      <nav className={clsx('bg-white', 'dark:bg-gray-800', 'shadow-md', 'sticky', 'top-0', 'z-50')}>
        <div className={clsx('max-w-7xl', 'mx-auto', 'px-4')}>
          <div className={clsx('flex', 'justify-between', 'items-center', 'h-16')}>
            <div className={clsx('flex', 'items-center', 'gap-8')}>
              <h1 className={clsx('text-xl', 'font-bold', 'text-blue-600', 'dark:text-blue-400')}>
                Admin Panel
              </h1>
              
              <div className={clsx('flex', 'gap-2')}>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={clsx(
                    'py-2', 'px-4', 'rounded', 'font-medium', 'transition-colors',
                    activeTab === 'projects' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  📁 Projects ({projects.length})
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={clsx(
                    'py-2', 'px-4', 'rounded', 'font-medium', 'transition-colors', 'relative',
                    activeTab === 'contacts' 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  💬 Messages
                  {unreadCount > 0 && (
                    <span className={clsx('absolute', '-top-1', '-right-1', 'bg-red-500', 'text-white', 'text-xs', 'font-bold', 'rounded-full', 'w-5', 'h-5', 'flex', 'items-center', 'justify-center')}>
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
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
              
              <button
                onClick={handleLogout}
                className={clsx(
                  'bg-red-500', 'hover:bg-red-700', 'text-white', 'font-bold',
                  'py-2', 'px-4', 'rounded', 'transition-colors'
                )}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className={clsx('max-w-7xl', 'mx-auto', 'p-8')}>
        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <>
            <div className={clsx('mb-8')}>
              <button
                onClick={() => setShowForm(!showForm)}
                className={clsx(
                  'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold',
                  'py-3', 'px-6', 'rounded', 'shadow-lg', 'transition-colors'
                )}
              >
                {showForm ? '✕ Cancel' : '+ Add New Project'}
              </button>
            </div>

            {showForm && (
              <div className={clsx('bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-lg', 'p-8', 'mb-8')}>
                <h2 className={clsx('text-2xl', 'font-bold', 'text-gray-800', 'dark:text-white', 'mb-6')}>
                  Add New Project
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={clsx('block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mb-2')}>
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className={clsx(
                        'w-full', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md',
                        'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500',
                        'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white'
                      )}
                      placeholder="Project title"
                    />
                  </div>

                  <div>
                    <label className={clsx('block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mb-2')}>
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className={clsx(
                        'w-full', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md',
                        'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500',
                        'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white'
                      )}
                      placeholder="Project description"
                    ></textarea>
                  </div>

                  <div>
                    <label className={clsx('block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mb-2')}>
                      Project Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={clsx(
                        'w-full', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md',
                        'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500',
                        'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white'
                      )}
                    />
                    {formData.imagePreview && (
                      <div className="mt-2">
                        <img 
                          src={formData.imagePreview} 
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className={clsx('block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mb-2')}>
                      GitHub Link
                    </label>
                    <input
                      type="url"
                      name="githubLink"
                      value={formData.githubLink}
                      onChange={handleInputChange}
                      className={clsx(
                        'w-full', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md',
                        'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500',
                        'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white'
                      )}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>

                  <div>
                    <label className={clsx('block', 'text-sm', 'font-medium', 'text-gray-700', 'dark:text-gray-300', 'mb-2')}>
                      Website Link
                    </label>
                    <input
                      type="url"
                      name="websiteLink"
                      value={formData.websiteLink}
                      onChange={handleInputChange}
                      className={clsx(
                        'w-full', 'px-4', 'py-2', 'border', 'border-gray-300', 'rounded-md',
                        'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500',
                        'dark:bg-gray-700', 'dark:border-gray-600', 'dark:text-white'
                      )}
                      placeholder="https://yourproject.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={clsx(
                      'w-full', 'bg-green-500', 'hover:bg-green-700', 'text-white', 'font-bold',
                      'py-3', 'px-4', 'rounded', 'disabled:opacity-50', 'disabled:cursor-not-allowed'
                    )}
                  >
                    {loading ? 'Adding Project...' : 'Add Project'}
                  </button>
                </form>
              </div>
            )}

            <div className={clsx('bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-lg', 'p-8')}>
              <h2 className={clsx('text-2xl', 'font-bold', 'text-gray-800', 'dark:text-white', 'mb-6')}>
                All Projects ({projects.length})
              </h2>
              
              {projects.length === 0 ? (
                <p className={clsx('text-gray-600', 'dark:text-gray-400', 'text-center', 'py-8')}>
                  No projects yet. Add your first project!
                </p>
              ) : (
                <div className={clsx('space-y-4')}>
                  {projects.map((project) => (
                    <div 
                      key={project.id}
                      className={clsx('border', 'border-gray-200', 'dark:border-gray-700', 'rounded-lg', 'p-4', 'hover:shadow-md', 'transition-shadow')}
                    >
                      <div className="flex gap-4">
                        {project.imageUrl && (
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-24 h-24 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className={clsx('text-lg', 'font-bold', 'text-gray-800', 'dark:text-white', 'mb-2')}>
                            {project.title}
                          </h3>
                          <p className={clsx('text-gray-600', 'dark:text-gray-400', 'text-sm', 'mb-2')}>
                            {project.description}
                          </p>
                          <div className={clsx('flex', 'gap-4', 'text-sm')}>
                            {project.githubLink && (
                              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                🔗 GitHub
                              </a>
                            )}
                            {project.websiteLink && (
                              <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                🌐 Website
                              </a>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className={clsx(
                            'bg-red-500', 'hover:bg-red-700', 'text-white', 'font-bold',
                            'py-2', 'px-4', 'rounded', 'h-fit'
                          )}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className={clsx('bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-lg', 'p-8')}>
            <h2 className={clsx('text-2xl', 'font-bold', 'text-gray-800', 'dark:text-white', 'mb-6')}>
              Contact Messages ({contacts.length})
              {unreadCount > 0 && (
                <span className={clsx('ml-3', 'text-sm', 'bg-red-500', 'text-white', 'px-3', 'py-1', 'rounded-full')}>
                  {unreadCount} New
                </span>
              )}
            </h2>
            
            {contacts.length === 0 ? (
              <p className={clsx('text-gray-600', 'dark:text-gray-400', 'text-center', 'py-8')}>
                No messages yet.
              </p>
            ) : (
              <div className={clsx('space-y-4')}>
                {contacts.map((contact) => (
                  <div 
                    key={contact.id}
                    className={clsx(
                      'border', 'rounded-lg', 'p-6', 'transition-all',
                      contact.status === 'unread' 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 shadow-md' 
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700'
                    )}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={clsx('text-lg', 'font-bold', 'text-gray-800', 'dark:text-white')}>
                            {contact.name}
                          </h3>
                          {contact.status === 'unread' && (
                            <span className={clsx('bg-red-500', 'text-white', 'text-xs', 'font-bold', 'px-2', 'py-1', 'rounded')}>
                              NEW
                            </span>
                          )}
                        </div>
                        <p className={clsx('text-sm', 'text-gray-600', 'dark:text-gray-400', 'mb-1')}>
                          📧 {contact.email}
                        </p>
                        <p className={clsx('text-xs', 'text-gray-500', 'dark:text-gray-500')}>
                          🕒 {new Date(contact.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {contact.status === 'unread' && (
                          <button
                            onClick={() => markAsRead(contact.id)}
                            className={clsx(
                              'bg-green-500', 'hover:bg-green-700', 'text-white', 'font-bold',
                              'py-2', 'px-4', 'rounded', 'text-sm', 'transition-colors'
                            )}
                          >
                            ✓ Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className={clsx(
                            'bg-red-500', 'hover:bg-red-700', 'text-white', 'font-bold',
                            'py-2', 'px-4', 'rounded', 'text-sm', 'transition-colors'
                          )}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className={clsx('bg-gray-50', 'dark:bg-gray-600', 'p-4', 'rounded', 'border-l-4', 'border-blue-500')}>
                      <p className={clsx('text-gray-700', 'dark:text-gray-200', 'leading-relaxed')}>
                        {contact.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
