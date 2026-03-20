import { useState, useEffect, useRef } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useTheme } from '../context/ThemeContext'

const A  = 'hsl(217,80%,55%)'
const A2 = 'hsl(217,80%,68%)'

function tok(dark) {
  return {
    bg:        dark ? 'hsl(230,15%,5%)'        : 'hsl(220,25%,97%)',
    cardBg:    dark ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.9)',
    border:    dark ? 'rgba(255,255,255,0.07)'  : 'rgba(59,130,246,0.1)',
    borderHov: dark ? 'rgba(59,130,246,0.45)'   : 'rgba(59,130,246,0.35)',
    heading:   dark ? 'hsl(220,12%,98%)'        : 'hsl(230,20%,8%)',
    sub:       dark ? 'hsl(217,80%,65%)'        : 'hsl(217,80%,48%)',
    body:      dark ? 'hsl(220,12%,60%)'        : 'hsl(220,10%,38%)',
    muted:     dark ? 'hsl(220,12%,38%)'        : 'hsl(220,10%,58%)',
    tag:       dark ? 'rgba(59,130,246,0.15)'   : 'rgba(59,130,246,0.08)',
    tagText:   dark ? 'hsl(217,80%,72%)'        : 'hsl(217,80%,38%)',
    shadow:    dark ? '0 2px 20px rgba(0,0,0,0.45)'  : '0 2px 20px rgba(59,130,246,0.07)',
    shadowHov: dark ? '0 24px 64px rgba(0,0,0,0.7)'  : '0 24px 64px rgba(59,130,246,0.18)',
    divider:   dark ? 'rgba(255,255,255,0.06)'  : 'rgba(0,0,0,0.06)',
    pill:      dark ? 'rgba(255,255,255,0.06)'  : 'rgba(0,0,0,0.04)',
  }
}

// navigate to project detail page via hash
export function openProjectDetail(projectId) {
  window.location.hash = `project/${projectId}`
  window.scrollTo({ top: 0 })
}

export default function Projects() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const t = tok(dark)

  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState('All')

  useEffect(() => {
    getDocs(collection(db, 'projects'))
      .then(snap => setProjects(
        snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
      ))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const allTags  = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags || [])))]
  const filtered = filter === 'All' ? projects : projects.filter(p => (p.tags || []).includes(filter))

  return (
    <section id="projects" style={{ backgroundColor: t.bg, padding: '6rem 0 5rem', transition: 'background-color 0.3s' }}>
      <div style={{ maxWidth: '78rem', margin: '0 auto', padding: '0 1.5rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ display: 'inline-block', padding: '0.3rem 1rem', borderRadius: '3rem', backgroundColor: dark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.08)', border: `1px solid ${dark ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.2)'}`, color: t.sub, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            My Work
          </span>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: t.heading, margin: '0 0 1rem', lineHeight: 1.12 }}>
            Featured Projects
          </h2>
          <p style={{ color: t.body, fontSize: '1.05rem', maxWidth: '42rem', margin: '0 auto', lineHeight: 1.8 }}>
            From full-stack web apps to AI-powered tools — built with real-world impact in mind.
          </p>
        </div>

        {allTags.length > 1 && (
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setFilter(tag)} style={{
                padding: '0.42rem 1.15rem', borderRadius: '3rem', fontSize: '0.82rem', fontWeight: 600,
                border: `1.5px solid ${filter === tag ? A : t.border}`,
                backgroundColor: filter === tag ? A : t.pill,
                color: filter === tag ? '#fff' : t.body,
                cursor: 'pointer', transition: 'all 0.22s', fontFamily: 'inherit',
              }}>{tag}</button>
            ))}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', border: `3px solid ${A}`, borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 1rem', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ color: t.body }}>Loading projects…</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</p>
            <p style={{ color: t.body, fontSize: '1.1rem' }}>No projects found.</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="proj-grid">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} t={t} dark={dark} index={i}
                onClick={() => openProjectDetail(p.id)} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .proj-grid { display:grid; grid-template-columns:1fr; gap:2rem; }
        @media(min-width:640px){ .proj-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1024px){ .proj-grid { grid-template-columns:repeat(3,1fr); } }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </section>
  )
}

// ── Card (unchanged look) ──
function ProjectCard({ project, t, dark, index, onClick }) {
  const [hov, setHov] = useState(false)
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        backgroundColor: t.cardBg,
        border: `1px solid ${hov ? t.borderHov : t.border}`,
        borderRadius: '1.25rem',
        overflow: 'hidden',
        cursor: 'pointer',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: hov ? t.shadowHov : t.shadow,
        transform: hov ? 'translateY(-10px) scale(1.015)' : 'translateY(0) scale(1)',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        opacity: vis ? 1 : 0,
        animation: vis ? `fadeUp 0.55s ease ${index * 0.08}s both` : 'none',
      }}>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${A}, ${A2}, hsl(200,80%,65%))`, opacity: hov ? 1 : 0, transition: 'opacity 0.3s', zIndex: 2 }} />

      <div style={{ position: 'relative', height: '13.5rem', overflow: 'hidden', backgroundColor: dark ? 'hsl(230,15%,10%)' : 'hsl(220,20%,92%)' }}>
        {project.imageUrl
          ? <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hov ? 'scale(1.09)' : 'scale(1)', transition: 'transform 0.65s ease', display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, hsl(217,80%,22%), hsl(217,80%,48%))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>💻</div>
        }
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.08) 55%)', opacity: hov ? 1 : 0.45, transition: 'opacity 0.35s' }} />

        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: hov ? 1 : 0, transform: hov ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.3s ease' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: `linear-gradient(135deg, ${A}, hsl(217,80%,45%))`, color: '#fff', padding: '0.45rem 1.1rem', borderRadius: '3rem', fontSize: '0.82rem', fontWeight: 700, boxShadow: '0 4px 16px rgba(59,130,246,0.4)' }}>
            View Details →
          </span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={iconBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
            )}
            {project.websiteLink && (
              <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={iconBtn}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: '1.35rem' }}>
        <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: t.heading, marginBottom: '0.45rem', lineHeight: 1.3 }}>{project.title}</h3>
        <p style={{ color: t.body, fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>
        {(project.tags || []).length > 0 && (
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {(project.tags || []).slice(0, 4).map(tag => (
              <span key={tag} style={{ padding: '0.2rem 0.6rem', borderRadius: '3rem', fontSize: '0.72rem', fontWeight: 600, backgroundColor: t.tag, color: t.tagText }}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const iconBtn = {
  width: '2rem', height: '2rem', borderRadius: '50%',
  backgroundColor: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(4px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#fff', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)',
}
