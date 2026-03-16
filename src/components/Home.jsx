import { useEffect, useState } from 'react'
import profileImage from '../resume/blackbackground.jpeg'
import resumePDF from '../resume/onepagresume.pdf'
import { FaGithub, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { SiFiverr } from 'react-icons/si'

const socials = [
  { href: 'https://github.com/JunaidKhanNiazii',                  label: 'GitHub',   Icon: FaGithub },
  { href: 'https://www.linkedin.com/in/junaidameerkhan/',          label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: 'https://www.youtube.com/@jdseller',                     label: 'YouTube',  Icon: FaYoutube },
  { href: 'https://www.fiverr.com/users/junaiddevpro/',            label: 'Fiverr',   Icon: SiFiverr },
]

export default function Home() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = resumePDF
    a.download = 'Junaid_Resume.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <section id="home" style={{
      minHeight: '100vh',
      backgroundColor: 'hsl(240,10%,3%)',
      display: 'flex',
      alignItems: 'center',
      padding: '6rem 0 3rem',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* Subtle radial glow behind image */}
      <div style={{
        position: 'absolute',
        right: '15%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '520px',
        height: '520px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, hsl(217,80%,30%) 0%, transparent 70%)',
        opacity: 0.18,
        pointerEvents: 'none',
      }} />

      {/* Social icons — right edge */}
      <div className="banner-socials" style={{
        position: 'absolute',
        right: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        zIndex: 10,
        visibility: 'hidden',
      }}>
        <span style={{ width: '1.5px', height: '3rem', backgroundColor: 'hsl(220,12%,30%)' }} />
        {socials.map(({ href, label, Icon }, i) => (
          <a key={label} href={href} title={label}
            target="_blank" rel="noopener noreferrer"
            className="social-icon-link"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'hsl(220,12%,60%)', textDecoration: 'none',
              transition: 'color 0.2s, transform 0.2s',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(20px)',
              transitionDelay: `${0.6 + i * 0.1}s`,
            }}
          >
            <Icon size={16} />
          </a>
        ))}
        <span style={{ width: '1.5px', height: '3rem', backgroundColor: 'hsl(220,12%,30%)' }} />
      </div>

      <div style={{ maxWidth: '75rem', margin: '0 auto', padding: '0 4rem 0 1.5rem', width: '100%' }}>
        <div className="banner-grid" style={{
          display: 'grid',
          alignItems: 'center',
          rowGap: '3rem',
          columnGap: '2rem',
        }}>

          {/* ── Left: text ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Pill badge */}
            <span style={{
              alignSelf: 'flex-start',
              padding: '0.3rem 1rem',
              borderRadius: '3rem',
              border: '1px solid hsl(217,80%,40%)',
              color: 'hsl(217,80%,65%)',
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              transitionDelay: '0.1s',
            }}>
              👋 Available for work
            </span>

            <h1 style={{
              fontFamily: 'inherit',
              fontSize: 'clamp(2.65rem, 6vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: 'hsl(220,12%,98%)',
              margin: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              transitionDelay: '0.2s',
            }}>
              Building Intelligent<br />Solutions & Scalable<br />Web Apps
            </h1>

            <p style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'hsl(220,12%,65%)',
              maxWidth: '28rem',
              margin: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              transitionDelay: '0.35s',
            }}>
              Full-Stack Developer & AI Engineer passionate about crafting smart, scalable applications — from clean front-end interfaces to intelligent back-end systems.
            </p>

            <div style={{
              display: 'flex', gap: '1rem', flexWrap: 'wrap',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              transitionDelay: '0.45s',
            }}>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={btnDark}
              >
                View My Work &nbsp;→
              </button>
              <button onClick={handleDownload} style={btnPrimary}>
                Download CV
              </button>
            </div>

            {/* Inline social row — mobile only */}
            <div className="mobile-socials" style={{
              display: 'flex', gap: '1.25rem', flexWrap: 'wrap',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.6s ease',
              transitionDelay: '0.55s',
            }}>
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} title={label}
                  target="_blank" rel="noopener noreferrer"
                  style={{ color: 'hsl(220,12%,60%)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'hsl(217,80%,65%)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'hsl(220,12%,60%)'}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: image inside circle ── */}
          <div className="banner-image-wrap" style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.92)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '0.3s',
          }}>
            {/* Rotating ring */}
            <div style={{
              position: 'absolute',
              width: '440px',
              height: '440px',
              borderRadius: '50%',
              border: '2px dashed hsl(217,80%,30%)',
              animation: 'spin-slow 18s linear infinite',
            }} />
            <div style={{
              position: 'absolute',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              backgroundColor: 'hsl(240,10%,10%)',
            }} />
            <img
              src={profileImage}
              alt="Junaid Ameer"
              style={{
                position: 'relative',
                width: '380px',
                height: '380px',
                objectFit: 'cover',
                objectPosition: 'top center',
                borderRadius: '50%',
                display: 'block',
              }}
            />
          </div>

        </div>
      </div>

      <style>{`
        .banner-grid { grid-template-columns: 1fr; }
        .mobile-socials { display: flex; }

        @media (min-width: 768px) {
          .banner-grid { grid-template-columns: 1fr 1fr; margin-top: 2rem; }
        }
        @media (min-width: 1024px) {
          .banner-grid { grid-template-columns: 1fr max-content; column-gap: 4rem; }
          .banner-socials { visibility: visible !important; }
          .banner-image-wrap img { width: 420px !important; height: 420px !important; }
          .banner-image-wrap > div:nth-child(1) { width: 440px !important; height: 440px !important; }
          .banner-image-wrap > div:nth-child(2) { width: 420px !important; height: 420px !important; }
          .mobile-socials { display: none !important; }
        }
        @media (max-width: 767px) {
          .banner-image-wrap img { width: 260px !important; height: 260px !important; }
          .banner-image-wrap > div:nth-child(2) { width: 290px !important; height: 290px !important; }
          .banner-image-wrap > div:nth-child(1) { width: 310px !important; height: 310px !important; }
        }

        .social-icon-link:hover { color: hsl(217,80%,65%) !important; transform: scale(1.2) !important; }

        @keyframes spin-slow { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  )
}

const btnDark = {
  display: 'inline-flex', alignItems: 'center',
  fontFamily: 'inherit', fontSize: '1rem', fontWeight: 500,
  color: 'hsl(220,12%,98%)',
  backgroundColor: 'hsl(240,10%,15%)',
  padding: '0.55rem 1.4rem', borderRadius: '3rem',
  border: 'none', cursor: 'pointer',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,.3)',
  transition: 'all 0.25s ease',
  whiteSpace: 'nowrap',
}

const btnPrimary = {
  display: 'inline-flex', alignItems: 'center',
  fontFamily: 'inherit', fontSize: '1rem', fontWeight: 500,
  color: '#fff',
  backgroundColor: 'hsl(217,80%,55%)',
  padding: '0.55rem 1.4rem', borderRadius: '3rem',
  border: 'none', cursor: 'pointer',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,.3)',
  transition: 'all 0.25s ease',
  whiteSpace: 'nowrap',
}
