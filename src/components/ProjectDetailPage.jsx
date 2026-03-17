import { useState, useEffect, useRef } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useTheme } from '../context/ThemeContext'
import Footer from './Footer'
import { openProjectDetail } from './Projects'

const A = 'hsl(217,80%,55%)'
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

// Navbar that navigates back to main site sections
function DetailNavbar({ onBack }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 75)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (section) => {
    window.location.hash = ''
    setMenuOpen(false)
    // small delay so App re-renders the main page first
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  const navItems = [
    { id: 'home',     label: 'Home' },
    { id: 'about',    label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact',  label: 'Contact' },
  ]

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, zIndex: 100, width: '100%',
        transition: 'background 0.35s ease, box-shadow 0.35s ease',
        backgroundColor: scrolled ? 'hsl(240,10%,6%)' : 'hsl(240,10%,6%)',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,.3)',
      }}>
        <nav style={{ display: 'flex', alignItems: 'center', height: '4rem', maxWidth: '75rem', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Burger mobile */}
          <button onClick={() => setMenuOpen(p => !p)} aria-label="Toggle menu" className="burger-btn-d"
            style={{ display: 'none', order: -1, position: 'relative', zIndex: 10, width: '1.5rem', height: '1rem', background: 'none', border: 'none', padding: 0, cursor: 'pointer', flexShrink: 0 }}>
            <span style={{ ...line, top: 0, transform: menuOpen ? 'rotate(135deg)' : 'none', marginTop: menuOpen ? '0.5rem' : 0 }} />
            <span style={{ ...line, top: '0.5rem', width: menuOpen ? '100%' : '70%', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...line, top: menuOpen ? '0.5rem' : '1rem', transform: menuOpen ? 'rotate(-135deg)' : 'none' }} />
          </button>

          {/* Brand */}
          <button onClick={() => goTo('home')} style={{ fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.05em', fontFamily: 'inherit' }}>
            Portfolio
          </button>

          {/* Desktop nav */}
          <div className="desktop-nav-d" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {navItems.map(item => (
                <li key={item.id}>
                  <button onClick={() => goTo(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 500, color: 'hsl(220,12%,98%)', fontFamily: 'inherit', padding: 0 }}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => goTo('contact')} style={{ fontSize: '1rem', fontWeight: 500, fontFamily: 'inherit', color: '#fff', backgroundColor: A, padding: '0.45rem 1.25rem', borderRadius: '3rem', border: 'none', cursor: 'pointer' }}>
              Discover
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div className="mobile-nav-d" style={{ position: 'fixed', top: menuOpen ? 0 : '-100%', left: 0, width: '100%', paddingBlock: '5rem 2rem', backgroundColor: 'hsl(240,10%,6%)', boxShadow: '0 4px 6px -1px rgba(0,0,0,.3)', transition: 'top 0.3s ease', zIndex: 9 }}>
          <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {navItems.map(item => (
              <li key={item.id}>
                <button onClick={() => goTo(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 500, color: 'hsl(220,12%,98%)', textTransform: 'uppercase', fontFamily: 'inherit' }}>
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => goTo('contact')} style={{ fontSize: '1rem', fontWeight: 500, fontFamily: 'inherit', color: '#fff', backgroundColor: A, padding: '0.45rem 1.25rem', borderRadius: '3rem', border: 'none', cursor: 'pointer' }}>
                Discover
              </button>
            </li>
          </ul>
        </div>
      </header>

      {menuOpen && <div onClick={() => setMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 8, backgroundColor: 'rgba(0,0,0,0.5)' }} />}

      <style>{`
        @media(max-width:767px){ .burger-btn-d { display:block !important; } .desktop-nav-d { display:none !important; } }
        @media(min-width:768px){ .mobile-nav-d { display:none !important; } }
      `}</style>
    </>
  )
}

const line = { position: 'absolute', left: 0, display: 'block', width: '100%', height: '2px', backgroundColor: 'hsl(220,12%,98%)', transition: 'all 0.25s ease' }

export default function ProjectDetailPage({ projectId, onBack }) {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const t = tok(dark)

  const [project, setProject] = useState(null)
  const [allProjects, setAll] = useState([])
  const [loading, setLoading] = useState(true)
  const [imgIdx, setImgIdx]   = useState(0)

  useEffect(() => {
    getDocs(collection(db, 'projects'))
      .then(snap => {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        setAll(list)
        setProject(list.find(p => p.id === projectId) || null)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [projectId])

  useEffect(() => { setImgIdx(0) }, [projectId])

  // other projects (excluding current)
  const otherProjects = allProjects.filter(p => p.id !== projectId)

  const images = project?.images?.length
    ? project.images
    : project?.imageUrl ? [{ url: project.imageUrl, caption: '' }] : []

  return (
    <div style={{ backgroundColor: t.bg, minHeight: '100vh', transition: 'background-color 0.3s' }}>
      <DetailNavbar onBack={onBack} />

      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', border: `3px solid ${A}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {!loading && !project && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', gap: '1rem' }}>
          <p style={{ fontSize: '3rem' }}>🔍</p>
          <p style={{ color: t.body, fontSize: '1.1rem' }}>Project not found.</p>
          <button onClick={onBack} style={backBtnStyle}>← Back to Projects</button>
        </div>
      )}

      {!loading && project && (
        <>
          {/* Hero */}
          <div style={{ position: 'relative', height: 'clamp(22rem,45vw,34rem)', overflow: 'hidden', marginTop: '4rem' }}>
            {images.length > 0
              ? <img src={images[0].url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              : <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, hsl(217,80%,18%), hsl(217,80%,45%))` }} />
            }
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)' }} />

            <button onClick={onBack} style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '3rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'inherit' }}>
              ← Back
            </button>

            <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '78rem', padding: '0 1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {(project.tags || []).map(tag => (
                  <span key={tag} style={{ padding: '0.2rem 0.7rem', borderRadius: '3rem', fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(59,130,246,0.35)', backdropFilter: 'blur(4px)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.4)' }}>{tag}</span>
                ))}
              </div>
              <h1 style={{ fontSize: 'clamp(1.75rem,4vw,3rem)', fontWeight: 800, color: '#fff', margin: '0 0 1.25rem', lineHeight: 1.15, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>{project.title}</h1>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={heroLink('ghost')}><GithubSVG /> GitHub</a>}
                {project.websiteLink && <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" style={heroLink('solid')}><ExternalSVG /> Live Demo</a>}
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ maxWidth: '78rem', margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>
            <div className="detail-layout">

              {/* Main */}
              <div>
                <div style={{ borderLeft: `4px solid ${A}`, paddingLeft: '1.25rem', marginBottom: '2.5rem' }}>
                  <p style={{ fontSize: '1.1rem', color: t.heading, lineHeight: 1.85, fontWeight: 500, margin: 0 }}>{project.description}</p>
                </div>

                {/* Gallery */}
                {images.length > 0 && (
                  <div style={{ marginBottom: '2.5rem' }}>
                    <SectionLabel t={t}>Image Gallery</SectionLabel>
                    <div style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', marginBottom: '0.75rem' }}>
                      <img src={images[imgIdx].url} alt={images[imgIdx].caption || `Image ${imgIdx + 1}`}
                        style={{ width: '100%', height: '22rem', objectFit: 'cover', display: 'block' }} />
                      {images[imgIdx].caption && (
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.75rem 1rem', background: 'linear-gradient(transparent,rgba(0,0,0,0.7))', color: '#fff', fontSize: '0.875rem' }}>
                          {images[imgIdx].caption}
                        </div>
                      )}
                      {images.length > 1 && (
                        <>
                          <button onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)} style={navBtnStyle('left')}>‹</button>
                          <button onClick={() => setImgIdx(i => (i + 1) % images.length)} style={navBtnStyle('right')}>›</button>
                          <div style={{ position: 'absolute', bottom: '0.75rem', right: '1rem', display: 'flex', gap: '0.3rem' }}>
                            {images.map((_, i) => (
                              <button key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? '1.5rem' : '0.45rem', height: '0.45rem', borderRadius: '3rem', backgroundColor: i === imgIdx ? A : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', padding: 0 }} />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    {images.length > 1 && (
                      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                        {images.map((img, i) => (
                          <img key={i} src={img.url} alt={img.caption || `img-${i}`} onClick={() => setImgIdx(i)}
                            style={{ width: '5rem', height: '3.5rem', objectFit: 'cover', borderRadius: '0.5rem', cursor: 'pointer', flexShrink: 0, border: `2px solid ${i === imgIdx ? A : 'transparent'}`, opacity: i === imgIdx ? 1 : 0.55, transition: 'all 0.2s' }} />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Detailed description */}
                {project.detailedDescription && (
                  <div style={{ marginBottom: '2.5rem' }}>
                    <SectionLabel t={t}>About This Project</SectionLabel>
                    <p style={{ color: t.body, lineHeight: 1.9, fontSize: '0.97rem', whiteSpace: 'pre-line', margin: 0 }}>{project.detailedDescription}</p>
                  </div>
                )}

                {/* Features */}
                {(project.features || []).length > 0 && (
                  <div style={{ marginBottom: '2.5rem' }}>
                    <SectionLabel t={t}>Key Features</SectionLabel>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(16rem,1fr))', gap: '0.75rem' }}>
                      {project.features.map((f, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.85rem 1rem', borderRadius: '0.75rem', backgroundColor: dark ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.05)', border: `1px solid ${t.border}` }}>
                          <span style={{ width: '1.4rem', height: '1.4rem', borderRadius: '50%', backgroundColor: A, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>✓</span>
                          <span style={{ color: t.body, fontSize: '0.9rem', lineHeight: 1.5 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div>
                <div style={{ position: 'sticky', top: '5.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ backgroundColor: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '1rem', padding: '1.5rem', backdropFilter: 'blur(12px)' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 1rem' }}>Project Links</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem 1rem', borderRadius: '0.6rem', border: `1px solid ${t.border}`, backgroundColor: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', color: t.heading, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                          <GithubSVG /> View on GitHub
                        </a>
                      )}
                      {project.websiteLink && (
                        <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem 1rem', borderRadius: '0.6rem', border: 'none', backgroundColor: A, color: '#fff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                          <ExternalSVG /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {(project.tags || []).length > 0 && (
                    <div style={{ backgroundColor: t.cardBg, border: `1px solid ${t.border}`, borderRadius: '1rem', padding: '1.5rem', backdropFilter: 'blur(12px)' }}>
                      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 0.85rem' }}>Tech Stack</p>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {project.tags.map(tag => (
                          <span key={tag} style={{ padding: '0.3rem 0.75rem', borderRadius: '3rem', fontSize: '0.78rem', fontWeight: 600, backgroundColor: t.tag, color: t.tagText }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* All other projects */}
          {otherProjects.length > 0 && (
            <div style={{ borderTop: `1px solid ${t.divider}`, padding: '4rem 0 5rem', backgroundColor: t.bg }}>
              <div style={{ maxWidth: '78rem', margin: '0 auto', padding: '0 1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <p style={{ color: t.sub, fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>More Work</p>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: t.heading, margin: 0 }}>Other Projects</h3>
                </div>
                <div className="all-proj-grid">
                  {otherProjects.map((p, i) => (
                    <FullCard key={p.id} project={p} t={t} dark={dark} index={i}
                      onClick={() => { openProjectDetail(p.id); window.scrollTo({ top: 0 }) }} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <Footer />

      <style>{`
        .detail-layout   { display:grid; grid-template-columns:1fr; gap:2.5rem; }
        .all-proj-grid   { display:grid; grid-template-columns:1fr; gap:2rem; }
        @media(min-width:640px){ .all-proj-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:768px){ .detail-layout { grid-template-columns:1fr 18rem; } }
        @media(min-width:1024px){ .detail-layout { grid-template-columns:1fr 20rem; } .all-proj-grid { grid-template-columns:repeat(3,1fr); } }
        @keyframes spin   { to { transform:rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  )
}

// Full card — identical look to Projects.jsx cards
function FullCard({ project, t, dark, index, onClick }) {
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
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', backgroundColor: t.cardBg,
        border: `1px solid ${hov ? t.borderHov : t.border}`,
        borderRadius: '1.25rem', overflow: 'hidden', cursor: 'pointer',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        boxShadow: hov ? t.shadowHov : t.shadow,
        transform: hov ? 'translateY(-10px) scale(1.015)' : 'translateY(0) scale(1)',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        opacity: vis ? 1 : 0,
        animation: vis ? `fadeUp 0.55s ease ${index * 0.08}s both` : 'none',
      }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg,${A},${A2},hsl(200,80%,65%))`, opacity: hov ? 1 : 0, transition: 'opacity 0.3s', zIndex: 2 }} />

      <div style={{ position: 'relative', height: '13.5rem', overflow: 'hidden', backgroundColor: dark ? 'hsl(230,15%,10%)' : 'hsl(220,20%,92%)' }}>
        {project.imageUrl
          ? <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hov ? 'scale(1.09)' : 'scale(1)', transition: 'transform 0.65s ease', display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg,hsl(217,80%,22%),hsl(217,80%,48%))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>💻</div>
        }
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.08) 55%)', opacity: hov ? 1 : 0.45, transition: 'opacity 0.35s' }} />
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: hov ? 1 : 0, transform: hov ? 'translateY(0)' : 'translateY(12px)', transition: 'all 0.3s ease' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: `linear-gradient(135deg,${A},hsl(217,80%,45%))`, color: '#fff', padding: '0.45rem 1.1rem', borderRadius: '3rem', fontSize: '0.82rem', fontWeight: 700, boxShadow: '0 4px 16px rgba(59,130,246,0.4)' }}>
            View Details →
          </span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={iconBtn}>
                <GithubSVG />
              </a>
            )}
            {project.websiteLink && (
              <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={iconBtn}>
                <ExternalSVG />
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

function SectionLabel({ children, t }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
      <span style={{ width: '3px', height: '1.25rem', backgroundColor: A, borderRadius: '2px', flexShrink: 0 }} />
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: t.heading, margin: 0 }}>{children}</h3>
    </div>
  )
}

const navBtnStyle = (side) => ({
  position: 'absolute', [side]: '0.75rem', top: '50%', transform: 'translateY(-50%)',
  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
  border: '1px solid rgba(255,255,255,0.15)', color: '#fff',
  width: '2.5rem', height: '2.5rem', borderRadius: '50%',
  cursor: 'pointer', fontSize: '1.4rem', fontFamily: 'inherit',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
})

const heroLink = (type) => ({
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  padding: '0.5rem 1.2rem', borderRadius: '3rem', textDecoration: 'none',
  fontSize: '0.875rem', fontWeight: 600,
  ...(type === 'solid'
    ? { backgroundColor: A, color: '#fff', border: 'none' }
    : { backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }),
})

const backBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  padding: '0.55rem 1.25rem', borderRadius: '3rem',
  backgroundColor: A, color: '#fff', border: 'none',
  cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'inherit',
}

const iconBtn = {
  width: '2rem', height: '2rem', borderRadius: '50%',
  backgroundColor: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(4px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#fff', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)',
}

function GithubSVG() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
}

function ExternalSVG() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
}
