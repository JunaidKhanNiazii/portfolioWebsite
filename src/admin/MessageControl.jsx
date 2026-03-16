import MessageCard from './MessageCard'

export default function MessageControl({ contacts, unreadCount, t, dark, markRead, deleteContact }) {
  return (
    <>
      {/* Header */}
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: t.heading, marginBottom: '1.5rem' }}>
        Messages
        {unreadCount > 0 && (
          <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', backgroundColor: '#ef4444', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '3rem' }}>
            {unreadCount} new
          </span>
        )}
      </h1>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {contacts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: t.muted }}>No messages yet.</div>
        )}
        {contacts.map(c => (
          <MessageCard
            key={c.id} contact={c} t={t} dark={dark}
            onMarkRead={() => markRead(c.id)}
            onDelete={() => deleteContact(c.id)}
          />
        ))}
      </div>
    </>
  )
}
