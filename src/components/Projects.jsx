import { useState, useEffect, useRef } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useTheme } from '../context/ThemeContext'

const ACCENT = 'hsl(217,80%,55%)'

function useThemeTokens(dark) {
  return {
    bg:          dark ? 'hsl(240,10%,4%)'        : 'hsl(220,20%,97%)',
    cardBg:      dark ? 'hsl(240,10%,8%)'        : '#ffffff',
    border:      dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
    heading:     dark ? 'hsl(220,12%,98%)'       : 'hsl(240,10%,8%)',
    sub:         dark ? 'hsl(217,80%,65%)'       : 'hsl(217,80%,50%)',
    body:        dark ? 'hsl(220,12%,60%)'       : 'hsl(220,10%,40%)',
    muted:       dark ? 'hsl(220,12%,40%)'       : 'hsl(220,10%,60%)',
    tag:         dark ? 'hsl(217,60%,18%)'       : 'hsl(217,80%,93%)',
    tagText:     dark ? 'hsl(217,80%,72%)'       : 'hsl(217,80%,38%)',
    shadow:      dark ? '0 4px 24px rgba(0,0,0,0.45)' : '0 4px 24px rgba(0,0,0,0.07)',
    shadowHover: dark ? '0 16px 48px rgba(0,0,0,0.7)' : '0 16px 48px rgba(59,130,246,0.18)',
    modalBg:     dark ? 'hsl(240,10%,7%)'        : '#ffffff',
    overlay:     dark ? 'rgba(0,0,0,0.85)'       : 'rgba(0,0,0,0.75)',
    inputBg:     dark ? 'hsl(240,10%,12%)'       : 'hsl(220,20%,97%)',
  }
}

export default function Projects() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const t = useThemeTokens(dark)

  const [projects, setProjects]   = useState([])
  const [selected, setSelected]   = useState(null)
  const [loading, setLoading]     = useState(true)
  const [filter, setFilter]       = useState('All')

  useEffect(() => {
    getDocs(collection(db, 'projects'))
      .then(snap => setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  // collect all unique tags
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags || [])))]
  const filtered = filter === 'All' ? projects : projects.filter(p => (p.tags || []).includes(filter))

  return (
    <section id="projects" style={{ backgroundColor: t.bg, padding: '6rem 0 5rem', transition: 'background-color 0.3s' }}>
      <div style={{ maxWidth: '75rem', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: t.sub, fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>My Work</p>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', fontWeight: 700, color: t.heading, margin: '0 0 1rem', lineHeight: 1.2 }}>Projects</h2>
          <p style={{ color: t.body, fontSize: '1.05rem', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.7 }}>
            From full-stack web apps to AI-powered tools — built with real-world impact in mind.
          </p>
        </div>

        {/* Filter pills */}
        {allTags.length > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setFilter(tag)} style={{
                padding: '0.35rem 1rem', borderRadius: '3rem', fontSize: '0.85rem', fontWeight: 500,
                border: `1px solid ${filter === tag ? ACCENT : t.border}`,
                backgroundColor: filter === tag ? ACCENT : 'transparent',
                color: filter === tag ? '#fff' : t.body,
                cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit',
              }}>{tag}</button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', border: `3px solid ${ACCENT}`, borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 1rem', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ color: t.body }}>Loading projects…</p>
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚀</p>
            <p style={{ color: t.body, fontSize: '1.1rem' }}>No projects found.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div className="proj-grid">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} t={t} index={i} onClick={() => setSelected(p)} />
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <ProjectModal project={selected} t={t} dark={dark} related={projects.filter(p => p.id !== selected.id && (p.tags||[]).some(tag => (selected.tags||[]).includes(tag))).slice(0,3)} onClose={() => setSelected(null)} onSelect={setSelected} />
      )}

      <style>{`
        .proj-grid { display: grid; grid-template-columns: 1fr; gap: 1.75rem; }
        @media(min-width:640px){ .proj-grid { grid-template-columns: repeat(2,1fr); } }
        @media(min-width:1024px){ .proj-grid { grid-template-columns: repeat(3,1fr); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes modalIn { from { opacity:0; transform:scale(0.96) translateY(16px); } to { opacity:1; transform:scale(1) translateY(0); } }
      `}</style>
    </section>
  )
}

function ProjectCard({ project, t, index, onClick }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: t.cardBg, border: `1px solid ${t.border}`,
        borderRadius: '1rem', overflow: 'hidden', cursor: 'pointer',
        boxShadow: hovered ? t.shadowHover : t.shadow,
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        opacity: visible ? 1 : 0,
        animation: visible ? `fadeUp 0.5s ease ${index * 0.08}s both` : 'none',
      }}>

      {/* Image with overlay */}
      <div style={{ position: 'relative', height: '13rem', overflow: 'hidden' }}>
        {project.imageUrl
          ? <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.5s ease', display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, hsl(217,80%,40%), hsl(217,80%,60%))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>💻</div>
        }
        {/* Gradient overlay on hover */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }} />
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.3s ease' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: ACCENT, color: '#fff', padding: '0.4rem 1rem', borderRadius: '3rem', fontSize: '0.85rem', fontWeight: 600 }}>
            View Project →
          </span>
        </div>
      </div>

      <div style={{ padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: t.heading, marginBottom: '0.5rem', lineHeight: 1.3 }}>{project.title}</h3>
        <p style={{ color: t.body, fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>
        {/* Tech badges */}
        {(project.tags || []).length > 0 && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {(project.tags || []).slice(0, 4).map(tag => (
              <span key={tag} style={{ padding: '0.2rem 0.6rem', borderRadius: '3rem', fontSize: '0.75rem', fontWeight: 500, backgroundColor: t.tag, color: t.tagText }}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectModal({ project, t, dark, related, onClose, onSelect }) {
  const [imgIndex, setImgIndex] = useState(0)
  const images = project.images?.length ? project.images : (project.imageUrl ? [{ url: project.imageUrl, caption: '' }] : [])

  // close on Escape
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 300, backgroundColor: t.overlay, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: t.modalBg, borderRadius: '1.25rem', maxWidth: '56rem', width: '100%', maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', animation: 'modalIn 0.3s ease both' }}>

        {/* Image gallery */}
        {images.length > 0 && (
          <div style={{ position: 'relative' }}>
            <img src={images[imgIndex].url} alt={images[imgIndex].caption || project.title}
              style={{ width: '100%', height: '22rem', objectFit: 'cover', borderRadius: '1.25rem 1.25rem 0 0', display: 'block' }} />
            {/* Caption */}
            {images[imgIndex].caption && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.75rem 1.25rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: '#fff', fontSize: '0.875rem', borderRadius: '0 0 0 0' }}>
                {images[imgIndex].caption}
              </div>
            )}
            {/* Prev/Next */}
            {images.length > 1 && (
              <>
                <button onClick={() => setImgIndex(i => (i - 1 + images.length) % images.length)}
                  style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: '2.25rem', height: '2.25rem', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
                <button onClick={() => setImgIndex(i => (i + 1) % images.length)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: '2.25rem', height: '2.25rem', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
                {/* Dots */}
                <div style={{ position: 'absolute', bottom: '0.75rem', right: '1rem', display: 'flex', gap: '0.35rem' }}>
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setImgIndex(i)} style={{ width: i === imgIndex ? '1.5rem' : '0.5rem', height: '0.5rem', borderRadius: '3rem', backgroundColor: i === imgIndex ? ACCENT : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', padding: 0 }} />
                  ))}
                </div>
              </>
            )}
            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1.25rem', overflowX: 'auto', backgroundColor: dark ? 'hsl(240,10%,6%)' : 'hsl(220,20%,94%)' }}>
                {images.map((img, i) => (
                  <img key={i} src={img.url} alt={img.caption || `Image ${i+1}`} onClick={() => setImgIndex(i)}
                    style={{ width: '4rem', height: '3rem', objectFit: 'cover', borderRadius: '0.4rem', cursor: 'pointer', border: `2px solid ${i === imgIndex ? ACCENT : 'transparent'}`, opacity: i === imgIndex ? 1 : 0.6, transition: 'all 0.2s', flexShrink: 0 }} />
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ padding: '2rem' }}>
          {/* Title + close */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: t.heading, margin: 0, lineHeight: 1.2 }}>{project.title}</h2>
            <button onClick={onClose} style={{ background: dark ? 'hsl(240,10%,15%)' : 'hsl(220,15%,92%)', border: 'none', borderRadius: '50%', width: '2rem', height: '2rem', cursor: 'pointer', color: t.body, fontSize: '1rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>

          {/* Tech badges */}
          {(project.tags || []).length > 0 && (
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {(project.tags || []).map(tag => (
                <span key={tag} style={{ padding: '0.25rem 0.75rem', borderRadius: '3rem', fontSize: '0.8rem', fontWeight: 600, backgroundColor: t.tag, color: t.tagText }}>{tag}</span>
              ))}
            </div>
          )}

          {/* Description */}
          <p style={{ color: t.body, lineHeight: 1.85, marginBottom: '1.5rem', fontSize: '0.97rem' }}>{project.description}</p>

          {/* Features */}
          {(project.features || []).length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: t.heading, marginBottom: '0.75rem' }}>Key Features</h3>
              <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {project.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: t.body, fontSize: '0.92rem' }}>
                    <span style={{ color: ACCENT, marginTop: '0.1rem', flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: related.length ? '2rem' : 0 }}>
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.25rem', borderRadius: '0.6rem', border: `1px solid ${t.border}`, backgroundColor: dark ? 'hsl(240,10%,14%)' : 'hsl(220,15%,94%)', color: t.heading, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                GitHub
              </a>
            )}
            {project.websiteLink && (
              <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.25rem', borderRadius: '0.6rem', border: 'none', backgroundColor: ACCENT, color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
            )}
          </div>

          {/* Related projects */}
          {related.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: t.heading, marginBottom: '1rem', paddingTop: '1.5rem', borderTop: `1px solid ${t.border}` }}>Related Projects</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))', gap: '0.75rem' }}>
                {related.map(rp => (
                  <div key={rp.id} onClick={() => { onSelect(rp); setImgIndex(0) }} style={{ borderRadius: '0.75rem', overflow: 'hidden', cursor: 'pointer', border: `1px solid ${t.border}`, transition: 'transform 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                    <div style={{ height: '5rem', backgroundColor: dark ? 'hsl(240,10%,14%)' : 'hsl(220,15%,92%)', overflow: 'hidden' }}>
                      {rp.imageUrl && <img src={rp.imageUrl} alt={rp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    </div>
                    <div style={{ padding: '0.5rem 0.6rem' }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 600, color: t.heading, margin: 0, lineHeight: 1.3 }}>{rp.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
