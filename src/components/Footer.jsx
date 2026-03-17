import { FaGithub, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { SiFiverr } from 'react-icons/si'

const links = {
  Resources: [
    { label: 'Home',       href: '#home' },
    { label: 'About',      href: '#about' },
    { label: 'Projects',   href: '#projects' },
    { label: 'Contact',    href: '#contact' },
  ],
  'Follow Us': [
    { label: 'GitHub',     href: 'https://github.com/JunaidKhanNiazii' },
    { label: 'LinkedIn',   href: 'https://www.linkedin.com/in/junaidameerkhan/' },
    { label: 'YouTube',    href: 'https://www.youtube.com/@jdseller' },
    { label: 'Fiverr',     href: 'https://www.fiverr.com/users/junaiddevpro/' },
  ],
  Legal: [
    { label: 'Privacy Policy',     href: '#privacy' },
    { label: 'Terms & Conditions', href: '#terms' },
  ],
}

const socials = [
  { Icon: FaGithub,     href: 'https://github.com/JunaidKhanNiazii',                 label: 'GitHub'   },
  { Icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/junaidameerkhan/',         label: 'LinkedIn' },
  { Icon: FaYoutube,    href: 'https://www.youtube.com/@jdseller',                    label: 'YouTube'  },
  { Icon: SiFiverr,     href: 'https://www.fiverr.com/users/junaiddevpro/',           label: 'Fiverr'   },
]

const scrollTo = (href) => {
  if (href === '#privacy' || href === '#terms') {
    window.location.hash = href.slice(1)
    window.scrollTo({ top: 0 })
    return
  }
  if (href.startsWith('#')) {
    const id = href.slice(1)
    // if we're on a sub-page (project detail etc.), go home first then scroll
    const isSubPage = window.location.hash.startsWith('#project/')
    if (isSubPage) {
      window.location.hash = ''
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    window.open(href, '_blank', 'noopener noreferrer')
  }
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: 'hsl(240,10%,3%)', borderTop: '1px solid hsl(240,10%,10%)' }}>
      <div style={{ maxWidth: '75rem', margin: '0 auto', padding: '2.5rem 1.5rem 2rem' }}>

        {/* Top row */}
        <div className="footer-top">
          {/* Brand */}
          <div style={{ marginBottom: '1.5rem' }}>
            <a href="#home" onClick={e => { e.preventDefault(); scrollTo('#home') }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <span style={{
                width: '2rem', height: '2rem', borderRadius: '50%',
                backgroundColor: 'hsl(217,80%,55%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '0.9rem',
              }}>J</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'hsl(220,12%,98%)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Portfolio
              </span>
            </a>
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'hsl(220,12%,55%)', maxWidth: '18rem', lineHeight: 1.6 }}>
              Full-Stack Developer & AI Engineer based in Pakistan. Building intelligent, scalable web solutions.
            </p>
          </div>

          {/* Link columns */}
          <div className="footer-links">
            {Object.entries(links).map(([heading, items]) => (
              <div key={heading}>
                <h2 style={{ marginBottom: '1.25rem', fontSize: '0.8rem', fontWeight: 700, color: 'hsl(220,12%,98%)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {heading}
                </h2>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {items.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href}
                        onClick={e => { if (href.startsWith('#')) { e.preventDefault(); scrollTo(href) } }}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.875rem', color: 'hsl(220,12%,55%)', textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = 'hsl(220,12%,90%)'}
                        onMouseLeave={e => e.target.style.color = 'hsl(220,12%,55%)'}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid hsl(240,10%,12%)' }} />

        {/* Bottom row */}
        <div className="footer-bottom">
          <span style={{ fontSize: '0.875rem', color: 'hsl(220,12%,45%)' }}>
            © {year}{' '}
            <a href="#home" onClick={e => { e.preventDefault(); scrollTo('#home') }}
              style={{ color: 'hsl(220,12%,55%)', textDecoration: 'none' }}
              onMouseEnter={e => e.target.style.color = 'hsl(220,12%,90%)'}
              onMouseLeave={e => e.target.style.color = 'hsl(220,12%,55%)'}>
              Junaid Ameer Khan™
            </a>. All Rights Reserved.
          </span>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {socials.map(({ Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{ color: 'hsl(220,12%,50%)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'hsl(220,12%,90%)'}
                onMouseLeave={e => e.currentTarget.style.color = 'hsl(220,12%,50%)'}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-top {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .footer-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .footer-bottom {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        @media (min-width: 640px) {
          .footer-links { grid-template-columns: repeat(3, 1fr); }
          .footer-bottom { flex-direction: row; align-items: center; justify-content: space-between; }
          .footer-bottom > div { margin-top: 0 !important; }
        }
        @media (min-width: 768px) {
          .footer-top { flex-direction: row; justify-content: space-between; }
        }
      `}</style>
    </footer>
  )
}
