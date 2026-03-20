import { ACCENT } from './adminTheme'

const TYPE_COLORS = {
  certification: 'hsl(217,80%,55%)',
  achievement:   'hsl(142,70%,45%)',
  award:         'hsl(38,90%,55%)',
  course:        'hsl(280,70%,60%)',
}

export default function CertRow({ cert, t, onEdit, onDelete }) {
  const color = TYPE_COLORS[cert.type] || ACCENT

  return (
    <div style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '0.75rem', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: t.shadow }}>

      {/* Badge image or icon */}
      {cert.imageUrl ? (
        <img src={cert.imageUrl} alt={cert.title}
          style={{ width: '3.5rem', height: '3.5rem', objectFit: 'cover', borderRadius: '0.5rem', flexShrink: 0 }} />
      ) : (
        <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.5rem', backgroundColor: t.tag, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
          🏆
        </div>
      )}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, color: t.heading, fontSize: '0.95rem' }}>{cert.title}</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '99px', backgroundColor: color + '22', color }}>
            {cert.type || 'certification'}
          </span>
          {cert.order !== undefined && (
            <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '99px', backgroundColor: t.tag, color: t.tagText }}>
              #{cert.order}
            </span>
          )}
        </div>
        <p style={{ margin: '0.2rem 0 0', color: t.muted, fontSize: '0.82rem' }}>
          {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
        </p>
        {cert.description && (
          <p style={{ margin: '0.25rem 0 0', color: t.body, fontSize: '0.82rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '40rem' }}>
            {cert.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
        {cert.credentialUrl && (
          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
            style={{ padding: '0.4rem 0.75rem', borderRadius: '0.5rem', border: `1px solid ${t.border}`, color: t.body, fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}>
            View
          </a>
        )}
        <button onClick={onEdit} style={{ padding: '0.4rem 0.75rem', borderRadius: '0.5rem', border: `1px solid ${t.border}`, backgroundColor: 'transparent', color: t.body, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
          Edit
        </button>
        <button onClick={onDelete} style={{ padding: '0.4rem 0.75rem', borderRadius: '0.5rem', border: 'none', backgroundColor: t.danger, color: '#fff', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>
          Delete
        </button>
      </div>

    </div>
  )
}
