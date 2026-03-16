import { useState } from 'react'
import { ACCENT } from './adminTheme'

export default function ProjectRow({ project, t, onEdit, onDelete }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '0.875rem', overflow: 'hidden', boxShadow: t.shadow }}>

      {/* Summary row */}
      <div style={{ display: 'flex', gap: '1rem', padding: '1rem', alignItems: 'center' }}>
        {project.imageUrl
          ? <img src={project.imageUrl} alt={project.title} style={{ width: '5rem', height: '3.75rem', objectFit: 'cover', borderRadius: '0.5rem', flexShrink: 0 }} />
          : <div style={{ width: '5rem', height: '3.75rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, hsl(217,80%,40%), hsl(217,80%,60%))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>💻</div>
        }

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: t.heading, margin: '0 0 0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '0.82rem', color: t.body, margin: '0 0 0.4rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {(project.tags || []).map(tag => (
              <span key={tag} style={{ padding: '0.15rem 0.5rem', borderRadius: '3rem', fontSize: '0.72rem', fontWeight: 600, backgroundColor: t.tag, color: t.tagText }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
          <button onClick={() => setOpen(o => !o)} style={{ padding: '0.4rem 0.75rem', borderRadius: '0.5rem', border: `1px solid ${t.border}`, backgroundColor: 'transparent', color: t.body, cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>
            {open ? 'Hide' : 'Details'}
          </button>
          <button onClick={onEdit} style={{ padding: '0.4rem 0.75rem', borderRadius: '0.5rem', border: 'none', backgroundColor: ACCENT, color: '#fff', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'inherit' }}>
            Edit
          </button>
          <button onClick={onDelete} style={{ padding: '0.4rem 0.75rem', borderRadius: '0.5rem', border: 'none', backgroundColor: '#ef4444', color: '#fff', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'inherit' }}>
            Delete
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {open && (
        <div style={{ padding: '0 1rem 1rem', borderTop: `1px solid ${t.border}` }}>
          {(project.features || []).length > 0 && (
            <div style={{ marginTop: '0.75rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Features</p>
              <ul style={{ paddingLeft: '1rem', margin: 0, color: t.body, fontSize: '0.85rem', lineHeight: 1.7 }}>
                {project.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )}

          {(project.images || []).length > 0 && (
            <div style={{ marginTop: '0.75rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
                Gallery ({project.images.length} images)
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
                {project.images.map((img, i) => (
                  <div key={i} style={{ flexShrink: 0 }}>
                    <img src={img.url} alt={img.caption || `img-${i}`} style={{ height: '4rem', width: '6rem', objectFit: 'cover', borderRadius: '0.4rem' }} />
                    {img.caption && (
                      <p style={{ fontSize: '0.7rem', color: t.muted, margin: '0.2rem 0 0', maxWidth: '6rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
            {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.82rem', color: ACCENT, textDecoration: 'none' }}>GitHub →</a>}
            {project.websiteLink && <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.82rem', color: ACCENT, textDecoration: 'none' }}>Live Demo →</a>}
          </div>
        </div>
      )}
    </div>
  )
}
