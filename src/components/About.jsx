import { useTheme } from '../context/ThemeContext'
import { useEffect, useRef, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import aboutImage from '../assets/agile.webp'
const aboutImage2 = 'https://www.amazing7.com/images/infographic%207%20step-01.jpg'

const stats = [
  {
    label: 'Years of Experience', target: 2, suffix: '+',
    icon: (<svg width="36" height="36" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" fill="currentColor" fillOpacity="0.15"/><path d="M3 9h18M8 2v4M16 2v4M7 13h4v4H7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  },
  {
    label: 'Projects Completed', target: 15, suffix: '+',
    icon: (<svg width="36" height="36" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" fillOpacity="0.15"/><path d="M9 12l2 2 4-4M8 7h8M8 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  },
  {
    label: 'Technologies', target: 10, suffix: '+',
    icon: (<svg width="36" height="36" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.15"/><path d="M8 12l-3 3 3 3M16 6l3 3-3 3M13 6l-2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  },
  {
    label: 'Certifications', target: 5, suffix: '+',
    icon: (<svg width="36" height="36" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="6" fill="currentColor" fillOpacity="0.15"/><path d="M12 3a6 6 0 100 12A6 6 0 0012 3zM8.5 21l1.5-4h4l1.5 4M10 17l2 2 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  },
]

const skills = [
  { name: 'React.js',        level: 85 },
  { name: 'JavaScript',      level: 80 },
  { name: 'Node.js',         level: 70 },
  { name: 'Python',          level: 75 },
  { name: 'Machine Learning',level: 65 },
  { name: 'Firebase',        level: 75 },
  { name: 'Tailwind CSS',    level: 90 },
]

function useCounter(target, duration, triggered) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!triggered) return
    let current = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      current += step
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(current)
    }, 16)
    return () => clearInterval(timer)
  }, [triggered, target, duration])
  return count
}

function StatCard({ stat, triggered, t }) {
  const count = useCounter(stat.target, 1200, triggered)
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.75rem', textAlign: 'center',
        padding: '1.5rem 1rem',
        borderRadius: '0.75rem',
        backgroundColor: t.cardBg,
        border: `1px solid ${t.border}`,
        boxShadow: hovered ? t.statShadowHover : t.statShadow,
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
    >
      <span style={{ color: t.iconColor }}>{stat.icon}</span>
      <span style={{ fontSize: '2rem', fontWeight: 700, color: t.statValue, lineHeight: 1 }}>
        {count}{stat.suffix}
      </span>
      <p style={{ color: t.body, fontSize: '0.88rem', margin: 0, lineHeight: 1.4 }}>{stat.label}</p>
    </div>
  )
}

const TYPE_COLORS = {
  certification: 'hsl(217,80%,55%)',
  achievement:   'hsl(142,70%,45%)',
  award:         'hsl(38,90%,55%)',
  course:        'hsl(280,70%,60%)',
}

function CertCard({ cert, t }) {
  const [hovered, setHovered] = useState(false)
  const color = TYPE_COLORS[cert.type] || TYPE_COLORS.certification
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: t.cardBg, border: `1px solid ${t.border}`,
        borderRadius: '0.75rem', overflow: 'hidden',
        boxShadow: hovered ? t.statShadowHover : t.statShadow,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column',
      }}
    >
      {cert.imageUrl && (
        <img src={cert.imageUrl} alt={cert.title}
          style={{ width: '100%', height: '10rem', objectFit: 'cover', display: 'block' }} />
      )}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.6rem', borderRadius: '99px', backgroundColor: color + '22', color, textTransform: 'capitalize' }}>
            {cert.type || 'certification'}
          </span>
          {cert.date && <span style={{ fontSize: '0.75rem', color: t.body }}>{cert.date}</span>}
        </div>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: t.heading, margin: 0, lineHeight: 1.3 }}>{cert.title}</h3>
        <p style={{ fontSize: '0.85rem', color: t.subheading, margin: 0, fontWeight: 600 }}>{cert.issuer}</p>
        {cert.description && (
          <p style={{ fontSize: '0.82rem', color: t.body, margin: 0, lineHeight: 1.5 }}>{cert.description}</p>
        )}
        {cert.credentialUrl && (
          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
            style={{ marginTop: 'auto', paddingTop: '0.5rem', fontSize: '0.82rem', color: t.subheading, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            View Credential →
          </a>
        )}
      </div>
    </div>
  )
}

export default function About() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const statsRef = useRef(null)
  const [triggered, setTriggered] = useState(false)
  const [certs, setCerts] = useState([])

  useEffect(() => {
    getDocs(collection(db, 'certifications')).then(snap => {
      setCerts(
        snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      )
    })
  }, [])

  const t = {
    bg:              dark ? 'hsl(240,10%,5%)'  : 'hsl(220,20%,96%)',
    cardBg:          dark ? 'hsl(240,10%,9%)'  : '#ffffff',
    border:          dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    heading:         dark ? 'hsl(220,12%,98%)' : 'hsl(240,10%,8%)',
    subheading:      dark ? 'hsl(217,80%,65%)' : 'hsl(217,80%,50%)',
    body:            dark ? 'hsl(220,12%,65%)' : 'hsl(220,10%,40%)',
    skillBg:         dark ? 'hsl(240,10%,15%)' : 'hsl(220,15%,88%)',
    skillFill:       'hsl(217,80%,55%)',
    statValue:       'hsl(217,80%,55%)',
    iconColor:       'hsl(217,80%,55%)',
    shadow:          dark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.08)',
    statShadow:      dark ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)',
    statShadowHover: dark ? '0 12px 32px rgba(0,0,0,0.5)' : '0 12px 32px rgba(59,130,246,0.15)',
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" style={{ backgroundColor: t.bg, padding: '6rem 0 5rem', transition: 'background-color 0.3s ease' }}>
      <div style={{ maxWidth: '75rem', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: t.subheading, fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Who I Am</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 700, color: t.heading, margin: '0 0 1rem', lineHeight: 1.2 }}>About Me</h2>
          <p style={{ color: t.body, fontSize: '1.05rem', maxWidth: '42rem', margin: '0 auto', lineHeight: 1.7 }}>
            A passionate Full-Stack Developer & AI Engineer from Pakistan, building intelligent web applications, solving real-world problems with clean code and modern technology.
          </p>
        </div>

        {/* Images — two side by side */}
        <div className="images-grid" style={{ marginBottom: '2rem' }}>
          <div style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: t.shadow }}>
            <img src={aboutImage} alt="7-Step Web Design Process" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: t.shadow }}>
            <img src={aboutImage2} alt="5 Key Stages of Web Design" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>

        {/* Stats cards */}
        <div ref={statsRef} className="stats-grid" style={{ marginBottom: '4rem' }}>
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} triggered={triggered} t={t} />
          ))}
        </div>

        {/* Bio + Skills */}
        <div className="about-grid" style={{ display: 'grid', gap: '3rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: t.heading, margin: 0 }}>Full-Stack Developer & AI Engineer</h3>
            <p style={{ color: t.body, lineHeight: 1.8, margin: 0 }}>
              I'm <strong style={{ color: t.heading }}>Junaid Ameer Khan</strong>, a Computer Science student at Namal University Mianwali with a strong focus on full-stack web development and AI engineering. I build intelligent, scalable applications that solve real-world problems.
            </p>
            <p style={{ color: t.body, lineHeight: 1.8, margin: 0 }}>
              I work with React, Node.js, Python, and Firebase — and I'm deeply interested in machine learning and AI-driven solutions. I enjoy breaking down complex problems into clean, maintainable code.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Email',    value: 'junaidameerkhan555@gmail.com' },
                { label: 'Phone',    value: '+92 311 2467786' },
                { label: 'LinkedIn', value: 'linkedin.com/in/junaidameerkhan' },
                { label: 'Location', value: 'Namal University Mianwali, Pakistan' },
              ].map(({ label, value }) => (
                <p key={label} style={{ margin: 0, color: t.body, fontSize: '0.95rem' }}>
                  <span style={{ color: t.heading, fontWeight: 600, minWidth: '5rem', display: 'inline-block' }}>{label}:</span> {value}
                </p>
              ))}
            </div>
            <a href="https://www.linkedin.com/in/junaidameerkhan/" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start', color: '#fff', backgroundColor: 'hsl(217,80%,55%)', padding: '0.6rem 1.5rem', borderRadius: '3rem', textDecoration: 'none', fontWeight: 500, fontSize: '1rem', boxShadow: '0 4px 12px rgba(59,130,246,0.3)', transition: 'all 0.25s ease' }}>
              Read More &nbsp;→
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: t.heading, margin: '0 0 0.5rem' }}>Technical Skills</h3>
            {skills.map(({ name, level }) => (
              <div key={name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ color: t.heading, fontWeight: 500, fontSize: '0.95rem' }}>{name}</span>
                  <span style={{ color: t.subheading, fontWeight: 600, fontSize: '0.9rem' }}>{level}%</span>
                </div>
                <div style={{ height: '6px', borderRadius: '99px', backgroundColor: t.skillBg, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: triggered ? `${level}%` : '0%', borderRadius: '99px', backgroundColor: t.skillFill, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* Certifications & Achievements */}
        {certs.length > 0 && (
          <div style={{ maxWidth: '75rem', margin: '4rem auto 0', padding: '0 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p style={{ color: t.subheading, fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Credentials</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: t.heading, margin: 0 }}>Certifications & Achievements</h2>
            </div>
            <div className="certs-grid">
              {certs.map(cert => (
                <CertCard key={cert.id} cert={cert} t={t} />
              ))}
            </div>
          </div>
        )}

      <style>{`
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
        .images-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
        .about-grid { grid-template-columns: 1fr; }
        .certs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr)); gap: 1.25rem; }
        @media (min-width: 640px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 768px) {
          .about-grid { grid-template-columns: 1fr 1fr; }
          .images-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  )
}
