import { useTheme } from '../context/ThemeContext'

export default function TermsAndConditions({ onBack }) {
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
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 700, color: t.heading, margin: '0 0 0.75rem' }}>Terms & Conditions</h1>
          <p style={{ color: t.muted, fontSize: '0.9rem' }}>Last updated: March 16, 2026</p>
        </div>

        {/* Card */}
        <div style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '1rem', padding: '2.5rem' }}>

          <Section title="1. Acceptance of Terms">
            <p>By accessing and using this portfolio website operated by <strong style={{ color: t.heading }}>Junaid Ameer Khan</strong>, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use this website.</p>
          </Section>

          <Section title="2. Use of the Website">
            <p>This website is provided for informational and professional purposes only. You agree to use it only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Use the site in any way that violates applicable local, national, or international laws or regulations.</li>
              <li>Attempt to gain unauthorized access to any part of the website or its underlying systems.</li>
              <li>Transmit any unsolicited or unauthorized advertising or promotional material (spam).</li>
              <li>Reproduce, duplicate, or copy any content from this site without prior written permission.</li>
            </ul>
          </Section>

          <Section title="3. Intellectual Property">
            <p>All content on this website — including but not limited to text, code, graphics, logos, and project descriptions — is the intellectual property of Junaid Ameer Khan unless otherwise stated. You may not reproduce, distribute, or create derivative works without explicit written consent.</p>
            <p style={{ marginTop: '0.75rem' }}>Open-source projects linked from this site are governed by their respective licenses as stated in their repositories.</p>
          </Section>

          <Section title="4. Project Portfolio & Work Samples">
            <p>Projects displayed on this website are shown for demonstration purposes. Some projects may have been built for clients or as part of academic work. Client-specific details have been omitted or anonymized where required by confidentiality agreements.</p>
          </Section>

          <Section title="5. Contact Form & Communications">
            <p>By submitting the contact form, you consent to being contacted by Junaid Ameer Khan via the email address you provide. I will only use your contact details to respond to your inquiry and will not add you to any mailing list without your explicit consent.</p>
          </Section>

          <Section title="6. Third-Party Links">
            <p>This website contains links to external platforms including GitHub, LinkedIn, YouTube, and Fiverr. These links are provided for convenience only. I have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>
          </Section>

          <Section title="7. Disclaimer of Warranties">
            <p>This website is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. I do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>To the fullest extent permitted by law, Junaid Ameer Khan shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of (or inability to access or use) this website or its content.</p>
          </Section>

          <Section title="9. Freelance Services">
            <p>If you engage Junaid Ameer Khan for freelance development services (via Fiverr or direct contact), separate service agreements will govern that engagement. These Terms & Conditions apply solely to the use of this portfolio website and do not constitute a service contract.</p>
          </Section>

          <Section title="10. Changes to Terms">
            <p>I reserve the right to modify these Terms & Conditions at any time. Changes take effect immediately upon posting to this page. The "Last updated" date will reflect the most recent revision. Continued use of the website after changes constitutes your acceptance of the new terms.</p>
          </Section>

          <Section title="11. Governing Law">
            <p>These Terms & Conditions are governed by and construed in accordance with the laws of Pakistan. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Pakistan.</p>
          </Section>

          <Section title="12. Contact">
            <p>For any questions regarding these Terms & Conditions, please contact:</p>
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
