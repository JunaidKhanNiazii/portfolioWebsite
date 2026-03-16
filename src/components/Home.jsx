import profileImage from '../resume/blackbackground.jpeg'
import resumePDF from '../resume/onepagresume.pdf'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const socials = [
  { href: '#', label: 'Facebook',  Icon: FaFacebookF },
  { href: '#', label: 'Instagram', Icon: FaInstagram },
  { href: '#', label: 'Twitter',   Icon: FaTwitter },
  { href: '#', label: 'YouTube',   Icon: FaYoutube },
]

export default function Home() {
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
      {/* Social icons — fixed to right edge of section, above everything */}
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
        <span style={{ width: '1.5px', height: '3rem', backgroundColor: 'hsl(220,12%,45%)' }} />
        {socials.map(({ href, label, Icon }) => (
          <a key={label} href={href} title={label}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'hsl(220,12%,75%)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            <Icon size={16} />
          </a>
        ))}
        <span style={{ width: '1.5px', height: '3rem', backgroundColor: 'hsl(220,12%,45%)' }} />
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
            <h1 style={{
              fontFamily: 'inherit',
              fontSize: 'clamp(2.65rem, 6vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: 'hsl(220,12%,98%)',
              margin: 0,
            }}>
              Experience Media<br />Like Never Before
            </h1>

            <p style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'hsl(220,12%,65%)',
              maxWidth: '28rem',
              margin: 0,
            }}>
              Enjoy award-winning stereo beats with wireless listening freedom and sleek,
              streamlined with premium padded and delivering first-rate playback.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                style={btnDark}
              >
                Our Products &nbsp;→
              </button>
              <button onClick={handleDownload} style={btnPrimary}>
                Download CV
              </button>
            </div>
          </div>

          {/* ── Right: image inside circle ── */}
          <div className="banner-image-wrap" style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
        .banner-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .banner-grid {
            grid-template-columns: 1fr 1fr;
            margin-top: 2rem;
          }
        }
        @media (min-width: 1024px) {
          .banner-grid {
            grid-template-columns: 1fr max-content;
            column-gap: 4rem;
          }
          .banner-socials {
            visibility: visible !important;
          }
          .banner-image-wrap img {
            width: 420px !important;
            height: 420px !important;
          }
        }
        @media (max-width: 767px) {
          .banner-image-wrap img {
            width: 260px !important;
            height: 260px !important;
          }
          .banner-image-wrap > div {
            width: 290px !important;
            height: 290px !important;
          }
        }
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
