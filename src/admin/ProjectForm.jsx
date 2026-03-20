import { useState } from 'react'
import { ACCENT } from './adminTheme'

function FormField({ label, hint, t, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: t.muted, marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </label>
      {hint && <p style={{ fontSize: '0.72rem', color: t.muted, margin: '0 0 0.4rem', opacity: 0.75 }}>{hint}</p>}
      {children}
    </div>
  )
}

export default function ProjectForm({ form, setForm, t, loading, editId, onSubmit, updateCaption, removeGalleryImg }) {
  const [galleryInput, setGalleryInput] = useState('')

  const inp = {
    width: '100%', boxSizing: 'border-box', padding: '0.6rem 0.85rem',
    backgroundColor: t.input, border: `1px solid ${t.inputBd}`,
    borderRadius: '0.5rem', color: t.heading, fontSize: '0.9rem',
    fontFamily: 'inherit', outline: 'none',
  }

  const addGalleryUrl = () => {
    const url = galleryInput.trim()
    if (!url) return
    if (form.images.length >= 4) return
    setForm(f => ({ ...f, images: [...f.images, { url, caption: '' }] }))
    setGalleryInput('')
  }

  return (
    <div style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '1rem', padding: '2rem', marginBottom: '1.5rem', boxShadow: t.shadow }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: t.heading, marginBottom: '0.5rem' }}>
        {editId ? 'Edit Project' : 'Add New Project'}
      </h2>
      <p style={{ fontSize: '0.8rem', color: t.muted, marginBottom: '1.5rem' }}>
        Upload images to your GitHub repo under <code style={{ backgroundColor: t.tag, color: t.tagText, padding: '0.1rem 0.4rem', borderRadius: '0.25rem' }}>public/images/projects/</code> then paste the raw URL below.
      </p>

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))', gap: '1.1rem' }}>
          <FormField label="Title *" t={t}>
            <input style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Project title" />
          </FormField>
          <FormField label="Tech Tags (comma separated)" t={t}>
            <input style={inp} value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="React, Firebase, Node.js" />
          </FormField>
        </div>

        <FormField label="Short Description *" t={t}>
          <textarea style={{ ...inp, minHeight: '4rem', resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required placeholder="Brief summary shown on the project card…" />
        </FormField>

        <FormField label="Detailed Description" t={t}>
          <textarea style={{ ...inp, minHeight: '7rem', resize: 'vertical' }} value={form.detailedDescription || ''} onChange={e => setForm(f => ({ ...f, detailedDescription: e.target.value }))} placeholder="Full project description…" />
        </FormField>

        <FormField label="Key Features (one per line)" t={t}>
          <textarea style={{ ...inp, minHeight: '5rem', resize: 'vertical' }} value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} placeholder={'User authentication\nReal-time updates\nResponsive design'} />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))', gap: '1.1rem' }}>
          <FormField label="GitHub URL" t={t}>
            <input style={inp} type="url" value={form.githubLink} onChange={e => setForm(f => ({ ...f, githubLink: e.target.value }))} placeholder="https://github.com/…" />
          </FormField>
          <FormField label="Live Demo URL" t={t}>
            <input style={inp} type="url" value={form.websiteLink} onChange={e => setForm(f => ({ ...f, websiteLink: e.target.value }))} placeholder="https://…" />
          </FormField>
        </div>

        {/* Cover image URL */}
        <FormField label="Cover Image URL" hint="Paste a raw GitHub URL: https://raw.githubusercontent.com/…/image.jpg" t={t}>
          <input style={inp} type="url" value={form.imageUrl}
            onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
            placeholder="https://raw.githubusercontent.com/JunaidKhanNiazii/portfolioWebsite/main/public/images/projects/cover.jpg" />
          {form.imageUrl && (
            <div style={{ position: 'relative', display: 'inline-block', marginTop: '0.5rem' }}>
              <img src={form.imageUrl} alt="cover preview"
                onError={e => { e.target.style.display = 'none' }}
                style={{ height: '7rem', borderRadius: '0.5rem', objectFit: 'cover', display: 'block' }} />
              <button type="button" onClick={() => setForm(f => ({ ...f, imageUrl: '' }))}
                style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', borderRadius: '50%', width: '1.4rem', height: '1.4rem', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ✕
              </button>
            </div>
          )}
        </FormField>

        {/* Gallery URLs */}
        <FormField label={`Gallery Images (${form.images.length}/4)`} hint="Add up to 4 image URLs from GitHub" t={t}>
          {form.images.length < 4 && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input style={{ ...inp, flex: 1 }} type="url" value={galleryInput}
                onChange={e => setGalleryInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addGalleryUrl() } }}
                placeholder="https://raw.githubusercontent.com/…/image.jpg" />
              <button type="button" onClick={addGalleryUrl}
                style={{ padding: '0.6rem 1rem', borderRadius: '0.5rem', border: 'none', backgroundColor: ACCENT, color: '#fff', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                + Add
              </button>
            </div>
          )}
          {form.images.length >= 4 && (
            <p style={{ fontSize: '0.82rem', color: t.danger || '#ef4444', margin: '0 0 0.5rem' }}>
              Maximum 4 gallery images reached.
            </p>
          )}
          {form.images.length > 0 && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
              {form.images.map((img, i) => (
                <div key={i} style={{ position: 'relative', width: '8rem' }}>
                  <img src={img.url} alt={`gallery-${i}`}
                    onError={e => { e.target.style.opacity = '0.3' }}
                    style={{ width: '8rem', height: '5.5rem', objectFit: 'cover', borderRadius: '0.5rem', display: 'block' }} />
                  <input value={img.caption} onChange={e => updateCaption(i, e.target.value)} placeholder="Caption…"
                    style={{ ...inp, marginTop: '0.3rem', fontSize: '0.75rem', padding: '0.3rem 0.5rem' }} />
                  <button type="button" onClick={() => removeGalleryImg(i)}
                    style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', borderRadius: '50%', width: '1.25rem', height: '1.25rem', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ✕
                  </button>
                  <span style={{ position: 'absolute', top: '0.25rem', left: '0.25rem', background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, borderRadius: '0.25rem', padding: '0.1rem 0.35rem' }}>
                    {i + 1}/4
                  </span>
                </div>
              ))}
            </div>
          )}
        </FormField>

        <button type="submit" disabled={loading} style={{
          padding: '0.7rem 1.5rem', borderRadius: '0.6rem', border: 'none',
          backgroundColor: loading ? 'hsl(217,80%,40%)' : ACCENT,
          color: '#fff', fontWeight: 700, fontSize: '0.95rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit', alignSelf: 'flex-start', opacity: loading ? 0.7 : 1,
        }}>
          {loading ? 'Saving…' : editId ? 'Update Project' : 'Add Project'}
        </button>

      </form>
    </div>
  )
}
