import { ACCENT } from './adminTheme'

export default function MessageCard({ contact, t, dark, onMarkRead, onDelete }) {
  return (
    <div style={{
      backgroundColor: t.card,
      border: `1px solid ${contact.status === 'unread' ? ACCENT : t.border}`,
      borderRadius: '0.875rem', padding: '1.25rem', boxShadow: t.shadow,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: t.heading, margin: 0 }}>{contact.name}</h3>
            {contact.status === 'unread' && (
              <span style={{ fontSize: '0.7rem', fontWeight: 700, backgroundColor: '#ef4444', color: '#fff', padding: '0.15rem 0.5rem', borderRadius: '3rem' }}>
                NEW
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.85rem', color: t.body, margin: '0 0 0.15rem' }}>📧 {contact.email}</p>
          <p style={{ fontSize: '0.78rem', color: t.muted, margin: 0 }}>🕒 {new Date(contact.createdAt).toLocaleString()}</p>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
          {contact.status === 'unread' && (
            <button onClick={onMarkRead} style={{ padding: '0.4rem 0.75rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#22c55e', color: '#fff', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit' }}>
              ✓ Read
            </button>
          )}
          <button onClick={onDelete} style={{ padding: '0.4rem 0.75rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#ef4444', color: '#fff', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            Delete
          </button>
        </div>
      </div>

      {/* Message body */}
      <div style={{ backgroundColor: dark ? 'hsl(240,10%,12%)' : 'hsl(220,20%,96%)', borderLeft: `3px solid ${ACCENT}`, borderRadius: '0 0.5rem 0.5rem 0', padding: '0.75rem 1rem' }}>
        <p style={{ color: t.body, fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{contact.message}</p>
      </div>
    </div>
  )
}
