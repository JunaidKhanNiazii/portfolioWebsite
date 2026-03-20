import { ACCENT } from './adminTheme'
import { useTheme } from '../context/ThemeContext'

export default function AdminNavbar({ tab, setTab, projectCount, unreadCount, certCount, onLogout, t }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav style={{ backgroundColor: t.nav, borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 0, zIndex: 50, boxShadow: t.shadow }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '3.75rem' }}>

        {/* Left: brand + tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: ACCENT }}>⚡ Admin Panel</span>

          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[
              ['projects', `Projects (${projectCount})`],
              ['certs',    `Certs (${certCount})`],
              ['contacts', 'Messages'],
            ].map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)} style={{
                position: 'relative', padding: '0.4rem 0.9rem', borderRadius: '0.5rem',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: '0.875rem', fontWeight: 600,
                backgroundColor: tab === key ? ACCENT : 'transparent',
                color: tab === key ? '#fff' : t.body,
                transition: 'all 0.2s',
              }}>
                {label}
                {key === 'contacts' && unreadCount > 0 && (
                  <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: t.danger, color: '#fff', fontSize: '0.65rem', fontWeight: 700, borderRadius: '50%', width: '1.1rem', height: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: theme toggle + logout */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={toggleTheme} style={{ background: theme === 'dark' ? 'hsl(240,10%,15%)' : 'hsl(220,15%,92%)', border: 'none', borderRadius: '0.5rem', padding: '0.4rem 0.6rem', cursor: 'pointer', fontSize: '1rem' }}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button onClick={onLogout} style={{ padding: '0.4rem 1rem', borderRadius: '0.5rem', border: 'none', backgroundColor: t.danger, color: '#fff', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            Logout
          </button>
        </div>

      </div>
    </nav>
  )
}
