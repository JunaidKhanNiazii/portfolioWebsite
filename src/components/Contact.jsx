import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useTheme } from '../context/ThemeContext'

export default function Contact() {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const t = {
    sectionBg:   dark ? 'hsl(240,10%,5%)'  : '#f9fafb',
    cardBg:      dark ? 'hsla(240,10%,9%,0.85)'  : 'hsla(0,0%,100%,0.85)',
    cardBorder:  dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
    heading:     dark ? 'hsl(220,12%,98%)' : 'hsl(240,10%,8%)',
    body:        dark ? 'hsl(220,12%,65%)' : 'hsl(220,10%,40%)',
    label:       dark ? 'hsl(220,12%,85%)' : 'hsl(240,10%,15%)',
    inputBg:     dark ? 'hsl(240,10%,14%)' : '#ffffff',
    inputBorder: dark ? 'hsl(240,10%,25%)' : 'hsl(220,13%,80%)',
    inputText:   dark ? 'hsl(220,12%,95%)' : 'hsl(240,10%,8%)',
    iconBg:      dark ? 'hsl(217,80%,20%)' : 'hsl(217,80%,92%)',
    iconColor:   dark ? 'hsl(217,80%,65%)' : 'hsl(217,80%,50%)',
    divider:     dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, 'contacts'), {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: formData.message,
        createdAt: new Date().toISOString(),
        status: 'unread',
      })
      setFormData({ firstName: '', lastName: '', email: '', message: '' })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      console.error(err)
      alert('Error sending message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    display: 'block', width: '100%',
    backgroundColor: t.inputBg,
    color: t.inputText,
    border: `2px solid ${t.inputBorder}`,
    borderRadius: '0.375rem',
    padding: '0.4rem 0.875rem',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: t.label,
    marginBottom: '0.375rem',
  }

  const infoItem = (icon, title, lines) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
      <div style={{ flexShrink: 0, backgroundColor: t.iconBg, borderRadius: '0.5rem', padding: '0.75rem', color: t.iconColor }}>
        {icon}
      </div>
      <div>
        <p style={{ fontWeight: 700, color: t.heading, marginBottom: '0.25rem', fontSize: '0.95rem' }}>{title}</p>
        {lines.map((l, i) => (
          <p key={i} style={{ color: t.body, fontSize: '0.875rem', margin: 0 }}>{l}</p>
        ))}
      </div>
    </div>
  )

  return (
    <section id="contact" style={{ backgroundColor: t.sectionBg, paddingBottom: '5rem', transition: 'background-color 0.3s ease' }}>

      {/* Section heading */}
      <div style={{ textAlign: 'center', padding: '5rem 1.5rem 2rem' }}>
        <p style={{ color: t.iconColor, fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          Get In Touch
        </p>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 700, color: t.heading, margin: '0 0 1rem', lineHeight: 1.2 }}>
          Contact Us
        </h2>
        <p style={{ color: t.body, fontSize: '1.05rem', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.7 }}>
          Feel free to reach out for any inquiries, collaborations, or just to say hi. I'm here to help!
        </p>
      </div>

      {/* Google Map — Namal University Mianwali */}
      <div style={{ height: '320px', overflow: 'hidden', position: 'relative' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3358.160798422008!2d71.78895521474157!3d32.68176938100086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f6b7b4b4b4b4b%3A0x1234567890abcdef!2sNamal%20University%2C%20Mianwali%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
          width="100%"
          height="480"
          style={{ border: 0, marginTop: '-80px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Namal University Mianwali"
        />
      </div>

      {/* Glassmorphism card overlapping map */}
      <div style={{ maxWidth: '75rem', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{
          backgroundColor: t.cardBg,
          border: `1px solid ${t.cardBorder}`,
          borderRadius: '0.75rem',
          boxShadow: '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          marginTop: '-80px',
          padding: '3rem 2rem',
          transition: 'background-color 0.3s ease',
        }}>
          <div className="contact-inner">

            {/* Left — form */}
            <form onSubmit={handleSubmit}>
              {success && (
                <div style={{ backgroundColor: 'hsl(142,76%,93%)', color: 'hsl(142,76%,25%)', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  ✅ Message sent! I'll get back to you soon.
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem 1.5rem', marginBottom: '1.25rem' }}>
                <div>
                  <label htmlFor="firstName" style={labelStyle}>First name</label>
                  <input type="text" id="firstName" name="firstName" autoComplete="given-name"
                    value={formData.firstName} onChange={handleChange} required style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="lastName" style={labelStyle}>Last name</label>
                  <input type="text" id="lastName" name="lastName" autoComplete="family-name"
                    value={formData.lastName} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="email" style={labelStyle}>Email address</label>
                  <input type="email" id="email" name="email" autoComplete="email"
                    value={formData.email} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="message" style={labelStyle}>Message</label>
                  <textarea id="message" name="message" rows={4}
                    value={formData.message} onChange={handleChange} required
                    style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
              </div>

              <button type="submit" disabled={loading} style={{
                width: '100%', padding: '0.6rem 1.5rem',
                fontSize: '0.8rem', fontWeight: 600, fontFamily: 'inherit',
                textTransform: 'uppercase', letterSpacing: '0.05em',
                color: '#fff', backgroundColor: 'hsl(199,89%,48%)',
                border: 'none', borderRadius: '0.25rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'background-color 0.15s ease',
              }}>
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>

            {/* Right — contact info */}
            <div>
              {infoItem(
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                </svg>,
                'Technical Support',
                ['junaidameerkhan555@gmail.com', '+92 311 2467786']
              )}

              {infoItem(
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>,
                'Address',
                ['Namal University, Mianwali,', 'Punjab, Pakistan']
              )}

              {infoItem(
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>,
                'Mobile',
                ['+92 311 2467786']
              )}

              {infoItem(
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ width: '1.5rem', height: '1.5rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>,
                'Email',
                ['junaidameerkhan555@gmail.com', 'linkedin.com/in/junaidameerkhan']
              )}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .contact-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 1024px) {
          .contact-inner {
            grid-template-columns: 5fr 7fr;
          }
        }
      `}</style>
    </section>
  )
}
