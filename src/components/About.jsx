import clsx from 'clsx'

function About() {
  return (
    <section id="about" className={clsx('min-h-screen', 'bg-white', 'dark:bg-gray-800', 'py-12', 'px-4', 'flex', 'items-center')}>
      <div className={clsx('max-w-4xl', 'mx-auto', 'w-full')}>
        <h1 className={clsx('text-4xl', 'font-bold', 'text-blue-600', 'dark:text-blue-400', 'mb-8', 'text-center')}>
          About Me
        </h1>

        <div className={clsx('bg-gray-50', 'dark:bg-gray-700', 'rounded-lg', 'shadow-lg', 'p-8', 'mb-8')}>
          <h2 className={clsx('text-2xl', 'font-bold', 'text-gray-800', 'dark:text-white', 'mb-4')}>
            My Story
          </h2>
          <p className={clsx('text-gray-600', 'dark:text-gray-400', 'mb-4', 'leading-relaxed')}>
            I'm a dedicated full-stack developer with a passion for creating innovative web solutions. 
            My journey in software development started with a curiosity about how things work, 
            and has evolved into a career focused on building impactful applications.
          </p>
          <p className={clsx('text-gray-600', 'dark:text-gray-400', 'leading-relaxed')}>
            I specialize in modern web technologies including React, Node.js, and Firebase, 
            and I'm always eager to learn new tools and frameworks to deliver the best solutions.
          </p>
        </div>

        <div className={clsx('bg-gray-50', 'dark:bg-gray-700', 'rounded-lg', 'shadow-lg', 'p-8')}>
          <h2 className={clsx('text-2xl', 'font-bold', 'text-gray-800', 'dark:text-white', 'mb-6')}>
            Skills
          </h2>
          <div className={clsx('grid', 'grid-cols-2', 'md:grid-cols-3', 'gap-4')}>
            {['React', 'JavaScript', 'Node.js', 'Firebase', 'Tailwind CSS', 'Git'].map((skill) => (
              <div 
                key={skill}
                className={clsx('bg-blue-50', 'dark:bg-blue-900', 'p-4', 'rounded-lg', 'text-center')}
              >
                <span className={clsx('text-blue-800', 'dark:text-blue-200', 'font-semibold')}>
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
