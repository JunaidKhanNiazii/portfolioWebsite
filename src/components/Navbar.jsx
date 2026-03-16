import { useState, useEffect } from 'react'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 75)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, zIndex: 100, width: '100%',
        transition: 'background 0.35s ease, box-shadow 0.35s ease',
        backgroundColor: scrolled ? 'hsl(240,10%,6%)' : 'transparent',
        boxShadow: scrolled ? '0 4px 6px -1px rgba(0,0,0,.3)' : 'none',
      }}>
        <nav style={{
          display: 'flex', alignItems: 'center', height: '4rem',
          maxWidth: '75rem', margin: '0 auto', padding: '0 1.5rem',
        }}>
          {/* Burger — mobile only */}
          <button onClick={() => setMenuOpen(p => !p)} aria-label="Toggle menu" style={{
            display: 'none', order: -1, position: 'relative', zIndex: 10,
            width: '1.5rem', height: '1rem', background: 'none', border: 'none',
            padding: 0, cursor: 'pointer', flexShrink: 0,
          }} className="burger-btn">
            <span style={{ ...line, top: 0, transform: menuOpen ? 'rotate(135deg)' : 'none', marginTop: menuOpen ? '0.5rem' : 0 }} />
            <span style={{ ...line, top: '0.5rem', width: menuOpen ? '100%' : '70%', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...line, top: menuOpen ? '0.5rem' : '1rem', transform: menuOpen ? 'rotate(-135deg)' : 'none' }} />
          </button>

          {/* Brand */}
          <a href="#" onClick={e => { e.preventDefault(); scrollTo('home') }} style={{
            fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase',
            color: '#fff', textDecoration: 'none', letterSpacing: '0.05em',
          }}>
            Portfolio
          </a>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {navItems.map(item => (
                <li key={item.id}>
                  <button onClick={() => scrollTo(item.id)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '1rem', fontWeight: 500, color: 'hsl(220,12%,98%)',
                    fontFamily: 'inherit', padding: 0,
                  }}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => scrollTo('contact')} style={{
              fontSize: '1rem', fontWeight: 500, fontFamily: 'inherit',
              color: '#fff', backgroundColor: 'hsl(217,80%,55%)',
              padding: '0.45rem 1.25rem', borderRadius: '3rem',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,.2)',
            }}>
              Discover
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div className="mobile-nav" style={{
          position: 'fixed', top: menuOpen ? 0 : '-100%', left: 0,
          width: '100%', paddingBlock: '5rem 2rem',
          backgroundColor: 'hsl(240,10%,6%)',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,.3)',
          transition: 'top 0.3s ease', zIndex: 9,
        }}>
          <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {navItems.map(item => (
              <li key={item.id}>
                <button onClick={() => scrollTo(item.id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '1rem', fontWeight: 500, color: 'hsl(220,12%,98%)',
                  textTransform: 'uppercase', fontFamily: 'inherit',
                }}>
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => scrollTo('contact')} style={{
                fontSize: '1rem', fontWeight: 500, fontFamily: 'inherit',
                color: '#fff', backgroundColor: 'hsl(217,80%,55%)',
                padding: '0.45rem 1.25rem', borderRadius: '3rem',
                border: 'none', cursor: 'pointer',
              }}>
                Discover
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 8,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }} />
      )}

      <style>{`
        @media (max-width: 767px) {
          .burger-btn { display: block !important; }
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 768px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </>
  )
}

const line = {
  position: 'absolute', left: 0, display: 'block',
  width: '100%', height: '2px',
  backgroundColor: 'hsl(220,12%,98%)',
  transition: 'all 0.25s ease',
}
