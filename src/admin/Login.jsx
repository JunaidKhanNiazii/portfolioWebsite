import { useState } from 'react'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import { useTheme } from '../context/ThemeContext'

// ── view states: 'login' | 'forgot' | 'forgot-sent'
export default function Login({ onLoginSuccess }) {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'

  const [view, setView]         = useState('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const t = {
    page:    dark ? '#111827' : '#f9fafb',
    card:    dark ? '#1f2937' : '#ffffff',
    border:  dark ? '#374151' : '#e5e7eb',
    input:   dark ? '#374151' : '#f9fafb',
    inputTx: dark ? '#ffffff' : '#111827',
    label:   dark ? '#ffffff' : '#111827',
    muted:   dark ? '#9ca3af' : '#6b7280',
    ph:      dark ? '#6b7280' : '#9ca3af',
    heading: dark ? '#ffffff' : '#111827',
  }

  // ── Login submit
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      if (remember) localStorage.setItem('adminEmail', email)
      else localStorage.removeItem('adminEmail')
      onLoginSuccess()
    } catch {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Forgot password submit
  const handleForgot = async (e) => {
    e.preventDefault()
    if (!email) { setError('Please enter your email address.'); return }
    setLoading(true); setError('')
    try {
      await sendPasswordResetEmail(auth, email)
      setView('forgot-sent')
    } catch (err) {
      if (err.code === 'auth/user-not-found') setError('No account found with this email.')
      else setError('Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: t.page, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative', transition: 'background-color 0.3s' }}>

      {/* Theme toggle */}
      <button onClick={toggleTheme} style={{
        position: 'absolute', top: '1rem', right: '1rem',
        background: dark ? '#374151' : '#e5e7eb',
        border: 'none', borderRadius: '0.5rem',
        padding: '0.5rem 0.75rem', cursor: 'pointer', fontSize: '1rem',
      }}>
        {dark ? '☀️' : '🌙'}
      </button>

      {/* Brand */}
      <a href="#" onClick={e => { e.preventDefault(); window.location.hash = '' }}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', textDecoration: 'none' }}>
        <span style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'hsl(217,80%,55%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>J</span>
        <span style={{ fontSize: '1.4rem', fontWeight: 700, color: t.heading, letterSpacing: '0.03em' }}>Junaid Khan</span>
      </a>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: '28rem', backgroundColor: t.card, borderRadius: '0.75rem', boxShadow: dark ? '0 4px 24px rgba(0,0,0,0.5)' : '0 4px 24px rgba(0,0,0,0.08)', border: `1px solid ${t.border}`, padding: '2rem' }}>

        {/* ── LOGIN VIEW ── */}
        {view === 'login' && (
          <>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: t.heading, marginBottom: '1.5rem', lineHeight: 1.3 }}>
              Sign in to Admin
            </h1>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Field label="Your email" t={t}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="admin@example.com" required
                  style={inputStyle(t)} />
              </Field>

              <Field label="Password" t={t}>
                <div style={{ position: 'relative' }}>
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" required
                    style={{ ...inputStyle(t), paddingRight: '3rem' }} />
                  <button type="button" onClick={() => setShowPw(p => !p)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: t.muted, fontSize: '0.85rem' }}>
                    {showPw ? 'Hide' : 'Show'}
                  </button>
                </div>
              </Field>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: t.muted }}>
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                    style={{ width: '1rem', height: '1rem', accentColor: 'hsl(217,80%,55%)' }} />
                  Remember me
                </label>
                <button type="button" onClick={() => { setView('forgot'); setError('') }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', color: 'hsl(217,80%,55%)', fontWeight: 500 }}>
                  Forgot password?
                </button>
              </div>

              {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center', margin: 0 }}>{error}</p>}

              <button type="submit" disabled={loading} style={btnPrimary(loading)}>
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </>
        )}

        {/* ── FORGOT PASSWORD VIEW ── */}
        {view === 'forgot' && (
          <>
            <button onClick={() => { setView('login'); setError('') }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(217,80%,55%)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1.25rem', padding: 0 }}>
              ← Back to sign in
            </button>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: t.heading, marginBottom: '0.5rem' }}>Reset your password</h1>
            <p style={{ fontSize: '0.9rem', color: t.muted, marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Enter the email address linked to your admin account. We'll send you a secure reset link via Firebase.
            </p>

            <form onSubmit={handleForgot} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <Field label="Your email" t={t}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="admin@example.com" required
                  style={inputStyle(t)} />
              </Field>

              {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center', margin: 0 }}>{error}</p>}

              <button type="submit" disabled={loading} style={btnPrimary(loading)}>
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </form>
          </>
        )}

        {/* ── RESET EMAIL SENT VIEW ── */}
        {view === 'forgot-sent' && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: t.heading, marginBottom: '0.75rem' }}>Check your inbox</h2>
            <p style={{ color: t.muted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              A password reset link has been sent to <strong style={{ color: t.heading }}>{email}</strong>. Follow the link in the email to set a new password. The link expires in 1 hour.
            </p>
            <p style={{ color: t.muted, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Didn't receive it? Check your spam folder or try again.
            </p>
            <button onClick={() => { setView('forgot'); setError('') }} style={{ ...btnPrimary(false), width: 'auto', padding: '0.6rem 1.5rem' }}>
              Try again
            </button>
            <button onClick={() => { setView('login'); setError('') }}
              style={{ display: 'block', margin: '1rem auto 0', background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(217,80%,55%)', fontSize: '0.875rem', fontWeight: 500 }}>
              Back to sign in
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

function Field({ label, t, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: t.label, marginBottom: '0.4rem' }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle = (t) => ({
  width: '100%', boxSizing: 'border-box',
  padding: '0.625rem 0.75rem',
  backgroundColor: t.input,
  border: `1px solid ${t.border}`,
  borderRadius: '0.5rem',
  color: t.inputTx,
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: 'inherit',
})

const btnPrimary = (disabled) => ({
  width: '100%',
  padding: '0.65rem 1rem',
  backgroundColor: disabled ? 'hsl(217,80%,40%)' : 'hsl(217,80%,55%)',
  color: '#fff',
  border: 'none',
  borderRadius: '0.5rem',
  fontSize: '0.95rem',
  fontWeight: 600,
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontFamily: 'inherit',
  transition: 'background-color 0.2s',
  opacity: disabled ? 0.7 : 1,
})
