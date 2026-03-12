import clsx from 'clsx'
import resumePDF from '../resume/onepagresume.pdf'

function Home() {
  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = resumePDF
    link.download = 'Junaid_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="home" className={clsx('min-h-screen', 'bg-gray-100', 'dark:bg-gray-900', 'py-12', 'px-4', 'flex', 'items-center', 'pt-16')}>
      <div className={clsx('max-w-4xl', 'mx-auto', 'w-full')}>
        <div className={clsx('text-center', 'mb-12')}>
          <h1 className={clsx('text-5xl', 'font-bold', 'text-blue-600', 'dark:text-blue-400', 'mb-4')}>
            Welcome to My Portfolio
          </h1>
          <p className={clsx('text-xl', 'text-gray-700', 'dark:text-gray-300', 'mb-6')}>
            Full-Stack Developer | Designer | Problem Solver
          </p>
          
          {/* Download Resume Button */}
          <button
            onClick={handleDownloadResume}
            className={clsx(
              'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold',
              'py-3', 'px-8', 'rounded-lg', 'shadow-lg', 'transition-all',
              'hover:shadow-xl', 'inline-flex', 'items-center', 'gap-2'
            )}
          >
            <span>📄</span>
            <span>Download Resume</span>
          </button>
        </div>

        <div className={clsx('bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-lg', 'p-8', 'mb-8')}>
          <h2 className={clsx('text-3xl', 'font-bold', 'text-gray-800', 'dark:text-white', 'mb-4')}>
            Hi, I'm Junaid
          </h2>
          <p className={clsx('text-gray-600', 'dark:text-gray-400', 'text-lg', 'leading-relaxed')}>
            I'm a passionate developer who loves creating beautiful and functional web applications. 
            With expertise in modern web technologies, I bring ideas to life through clean code and elegant design.
          </p>
        </div>

        <div className={clsx('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-6')}>
          <div className={clsx('bg-blue-50', 'dark:bg-blue-900', 'p-6', 'rounded-lg', 'text-center')}>
            <div className={clsx('text-4xl', 'mb-3')}>💻</div>
            <h3 className={clsx('text-xl', 'font-semibold', 'text-blue-800', 'dark:text-blue-200', 'mb-2')}>
              Development
            </h3>
            <p className={clsx('text-blue-600', 'dark:text-blue-300')}>
              Building modern web applications
            </p>
          </div>

          <div className={clsx('bg-green-50', 'dark:bg-green-900', 'p-6', 'rounded-lg', 'text-center')}>
            <div className={clsx('text-4xl', 'mb-3')}>🎨</div>
            <h3 className={clsx('text-xl', 'font-semibold', 'text-green-800', 'dark:text-green-200', 'mb-2')}>
              Design
            </h3>
            <p className={clsx('text-green-600', 'dark:text-green-300')}>
              Creating beautiful user experiences
            </p>
          </div>

          <div className={clsx('bg-purple-50', 'dark:bg-purple-900', 'p-6', 'rounded-lg', 'text-center')}>
            <div className={clsx('text-4xl', 'mb-3')}>🚀</div>
            <h3 className={clsx('text-xl', 'font-semibold', 'text-purple-800', 'dark:text-purple-200', 'mb-2')}>
              Innovation
            </h3>
            <p className={clsx('text-purple-600', 'dark:text-purple-300')}>
              Solving problems with technology
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
