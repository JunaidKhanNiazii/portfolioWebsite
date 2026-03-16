import { useTheme } from '../context/ThemeContext'

export default function PrivacyPolicy({ onBack }) {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const t = {
    bg:       dark ? 'hsl(240,10%,5%)'  : 'hsl(220,20%,97%)',
    card:     dark ? 'hsl(240,10%,9%)'  : '#ffffff',
    border:   dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    heading:  dark ? 'hsl(220,12%,98%)' : 'hsl(240,10%,8%)',
    sub:      dark ? 'hsl(217,80%,65%)' : 'hsl(217,80%,50%)',
    body:     dark ? 'hsl(220,12%,65%)' : 'hsl(220,10%,38%)',
    muted:    dark ? 'hsl(220,12%,45%)' : 'hsl(220,10%,55%)',
  }

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: t.heading, marginBottom: '0.75rem' }}>{title}</h2>
      <div style={{ color: t.body, lineHeight: 1.8, fontSize: '0.97rem' }}>{children}</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: t.bg, padding: '5rem 1.5rem 4rem', transition: 'background-color 0.3s' }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto' }}>

        {/* Back */}
        <button onClick={onBack} style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: 'none', border: 'none', cursor: 'pointer',
          color: t.sub, fontSize: '0.9rem', fontWeight: 500, marginBottom: '2rem', padding: 0,
        }}>
          ← Back to Portfolio
        </button>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ color: t.sub, fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Legal</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 700, color: t.heading, margin: '0 0 0.75rem' }}>Privacy Policy</h1>
          <p style={{ color: t.muted, fontSize: '0.9rem' }}>Last updated: March 16, 2026</p>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '1rem', padding: '2.5rem' }}>

          <Section title="1. Introduction">
            <p>Welcome to the portfolio website of <strong style={{ color: t.heading }}>Junaid Ameer Khan</strong> ("I", "me", or "my"). This Privacy Policy explains how I collect, use, and protect any information you provide when you visit this website or contact me through it.</p>
            <p style={{ marginTop: '0.75rem' }}>By using this website, you agree to the practices described in this policy. If you do not agree, please discontinue use of the site.</p>
          </Section>

          <Section title="2. Information I Collect">
            <p>I may collect the following types of information:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong style={{ color: t.heading }}>Contact form data</strong> — name, email address, and message content submitted via the contact form.</li>
              <li><strong style={{ color: t.heading }}>Usage data</strong> — browser type, pages visited, time spent, and referring URLs collected automatically via standard web analytics.</li>
              <li><strong style={{ color: t.heading }}>Cookies</strong> — small files stored on your device to remember preferences such as theme selection (light/dark mode).</li>
            </ul>
          </Section>

          <Section title="3. How I Use Your Information">
            <p>Information collected is used solely to:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Respond to your inquiries and messages.</li>
              <li>Improve the website's content and user experience.</li>
              <li>Understand how visitors interact with the site.</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>I do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </Section>

          <Section title="4. Firebase & Third-Party Services">
            <p>This website uses <strong style={{ color: t.heading }}>Google Firebase</strong> (Firestore) to store contact form submissions securely. Firebase is governed by Google's Privacy Policy. By submitting the contact form, you acknowledge that your data may be stored on Firebase servers.</p>
            <p style={{ marginTop: '0.75rem' }}>External links to GitHub, LinkedIn, YouTube, and Fiverr are provided for convenience. I am not responsible for the privacy practices of those platforms.</p>
          </Section>

          <Section title="5. Data Retention">
            <p>Contact form submissions are retained only as long as necessary to respond to your inquiry. You may request deletion of your data at any time by emailing <a href="mailto:junaidameerkhan555@gmail.com" style={{ color: t.sub }}>junaidameerkhan555@gmail.com</a>.</p>
          </Section>

          <Section title="6. Security">
            <p>I take reasonable technical measures to protect your information. However, no method of transmission over the internet is 100% secure. I cannot guarantee absolute security of data transmitted to this site.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the right to:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Request access to the personal data I hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Withdraw consent at any time where processing is based on consent.</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>To exercise any of these rights, contact me at <a href="mailto:junaidameerkhan555@gmail.com" style={{ color: t.sub }}>junaidameerkhan555@gmail.com</a>.</p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>I may update this Privacy Policy from time to time. Changes will be reflected by updating the "Last updated" date at the top of this page. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="9. Contact">
            <p>If you have any questions about this Privacy Policy, please reach out:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Email: <a href="mailto:junaidameerkhan555@gmail.com" style={{ color: t.sub }}>junaidameerkhan555@gmail.com</a></li>
              <li>Phone: +92 311 2467786</li>
              <li>Location: Namal University Mianwali, Pakistan</li>
            </ul>
          </Section>

        </div>
      </div>
    </div>
  )
}
