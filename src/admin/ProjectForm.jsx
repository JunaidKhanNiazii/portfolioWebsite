import { useState } from 'react'
import { ACCENT } from './adminTheme'
import { uploadToGithub } from './uploadToGithub'

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

function UploadBtn({ label, uploading, onChange, t }) {
  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      padding: '0.55rem 1rem', borderRadius: '0.5rem', cursor: uploading ? 'not-allowed' : 'pointer',
      backgroundColor: uploading ? 'hsl(217,80%,40%)' : ACCENT,
      color: '#fff', fontWeight: 600, fontSize: '0.85rem', opacity: uploading ? 0.7 : 1,
    }}>
      {uploading ? '⏳ Uploading…' : `📁 ${label}`}
      <input type="file" accept="image/*" style={{ display: 'none' }} disabled={uploading} onChange={onChange} />
    </label>
  )
}

export default function ProjectForm({ form, setForm, t, loading, editId, onSubmit, updateCaption, removeGalleryImg }) {
  const [coverUploading,   setCoverUploading]   = useState(false)
  const [galleryUploading, setGalleryUploading] = useState(false)
  const [uploadError,      setUploadError]      = useState('')

  const inp = {
    width: '100%', boxSizing: 'border-box', padding: '0.6rem 0.85rem',
    backgroundColor: t.input, border: `1px solid ${t.inputBd}`,
    borderRadius: '0.5rem', color: t.heading, fontSize: '0.9rem',
    fontFamily: 'inherit', outline: 'none',
  }

  const handleCoverFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploadError('')
    setCoverUploading(true)
    try {
      const url = await uploadToGithub(file)
      setForm(f => ({ ...f, imageUrl: url }))
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setCoverUploading(false)
      e.target.value = ''
    }
  }

  const handleGalleryFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (form.images.length >= 4) return
    setUploadError('')
    setGalleryUploading(true)
    try {
      const url = await uploadToGithub(file)
      setForm(f => ({ ...f, images: [...f.images, { url, caption: '' }] }))
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setGalleryUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '1rem', padding: '2rem', marginBottom: '1.5rem', boxShadow: t.shadow }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: t.heading, marginBottom: '0.5rem' }}>
        {editId ? 'Edit Project' : 'Add New Project'}
      </h2>
      <p style={{ fontSize: '0.8rem', color: t.muted, marginBottom: '1.5rem' }}>
        Pick images from your device — they upload to GitHub automatically and the URL is saved in Firestore.
      </p>

      {uploadError && (
        <div style={{ backgroundColor: 'hsl(0,70%,20%)', border: '1px solid hsl(0,70%,40%)', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#fca5a5', fontSize: '0.85rem' }}>
          ⚠️ {uploadError}
        </div>
      )}

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
          <textarea style={{ ...inp, minHeight: '7rem', resize: 'vertical' }} value={form.detailedDescription || ''} onChange={e => setForm(f => ({ ...f, detailedDescription: e.target.value }))} placeholder="Full project description shown on the detail page…" />
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

        {/* Cover Image */}
        <FormField label="Cover Image" hint="Pick a file — it uploads to GitHub instantly" t={t}>
          <UploadBtn label="Choose Cover Image" uploading={coverUploading} onChange={handleCoverFile} t={t} />
          {form.imageUrl && (
            <div style={{ position: 'relative', display: 'inline-block', marginTop: '0.75rem' }}>
              <img src={form.imageUrl} alt="cover preview"
                onError={e => { e.target.style.opacity = '0.3' }}
                style={{ height: '7rem', borderRadius: '0.5rem', objectFit: 'cover', display: 'block' }} />
              <button type="button" onClick={() => setForm(f => ({ ...f, imageUrl: '' }))}
                style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', borderRadius: '50%', width: '1.4rem', height: '1.4rem', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ✕
              </button>
            </div>
          )}
        </FormField>

        {/* Gallery Images */}
        <FormField label={`Gallery Images (${form.images.length}/4)`} hint="Pick files one at a time — each uploads to GitHub automatically" t={t}>
          {form.images.length < 4 && (
            <UploadBtn label="Add Gallery Image" uploading={galleryUploading} onChange={handleGalleryFile} t={t} />
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

        <button type="submit" disabled={loading || coverUploading || galleryUploading} style={{
          padding: '0.7rem 1.5rem', borderRadius: '0.6rem', border: 'none',
          backgroundColor: loading ? 'hsl(217,80%,40%)' : ACCENT,
          color: '#fff', fontWeight: 700, fontSize: '0.95rem',
          cursor: (loading || coverUploading || galleryUploading) ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit', alignSelf: 'flex-start',
          opacity: (loading || coverUploading || galleryUploading) ? 0.7 : 1,
        }}>
          {loading ? 'Saving…' : editId ? 'Update Project' : 'Add Project'}
        </button>

      </form>
    </div>
  )
}
