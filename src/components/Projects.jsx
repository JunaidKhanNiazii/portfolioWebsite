import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import clsx from 'clsx'

function Projects() {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
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
    } finally {
      setLoading(false)
    }
  }

  const openProjectDetails = (project) => {
    setSelectedProject(project)
  }

  const closeProjectDetails = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className={clsx('min-h-screen', 'bg-gray-100', 'dark:bg-gray-900', 'py-12', 'px-4', 'flex', 'items-center')}>
      <div className={clsx('max-w-6xl', 'mx-auto', 'w-full')}>
        <h1 className={clsx('text-4xl', 'font-bold', 'text-blue-600', 'dark:text-blue-400', 'mb-8', 'text-center')}>
          My Projects
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No projects available yet.</p>
          </div>
        ) : (
          <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6')}>
            {projects.map((project) => (
              <div 
                key={project.id}
                onClick={() => openProjectDetails(project)}
                className={clsx(
                  'bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-lg', 
                  'overflow-hidden', 'cursor-pointer', 'hover:shadow-xl', 'transition-shadow'
                )}
              >
                {project.imageUrl && (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className={clsx('text-xl', 'font-bold', 'text-gray-800', 'dark:text-white', 'mb-3')}>
                    {project.title}
                  </h3>
                  <p className={clsx('text-gray-600', 'dark:text-gray-400', 'line-clamp-3')}>
                    {project.description}
                  </p>
                  <div className="mt-4">
                    <span className={clsx('text-blue-500', 'text-sm', 'font-medium')}>
                      Click to view details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Details Modal */}
        {selectedProject && (
          <div 
            className={clsx('fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'flex', 'items-center', 'justify-center', 'z-50', 'p-4')}
            onClick={closeProjectDetails}
          >
            <div 
              className={clsx('bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-2xl', 'max-w-3xl', 'w-full', 'max-h-[90vh]', 'overflow-y-auto')}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedProject.imageUrl && (
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-8">
                <h2 className={clsx('text-3xl', 'font-bold', 'text-gray-800', 'dark:text-white', 'mb-4')}>
                  {selectedProject.title}
                </h2>
                <p className={clsx('text-gray-600', 'dark:text-gray-400', 'mb-6', 'leading-relaxed')}>
                  {selectedProject.description}
                </p>

                <div className={clsx('flex', 'gap-4', 'mb-6')}>
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(
                        'bg-gray-800', 'hover:bg-gray-900', 'text-white', 'font-bold',
                        'py-2', 'px-6', 'rounded', 'inline-flex', 'items-center', 'gap-2'
                      )}
                    >
                      <span>GitHub</span>
                      <span>→</span>
                    </a>
                  )}
                  {selectedProject.websiteLink && (
                    <a
                      href={selectedProject.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(
                        'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold',
                        'py-2', 'px-6', 'rounded', 'inline-flex', 'items-center', 'gap-2'
                      )}
                    >
                      <span>Visit Website</span>
                      <span>→</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={closeProjectDetails}
                  className={clsx(
                    'bg-gray-500', 'hover:bg-gray-700', 'text-white', 'font-bold',
                    'py-2', 'px-6', 'rounded'
                  )}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
