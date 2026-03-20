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

export default function CertForm({ form, setForm, t, loading, editId, onSubmit }) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const inp = {
    width: '100%', boxSizing: 'border-box', padding: '0.6rem 0.85rem',
    backgroundColor: t.input, border: `1px solid ${t.inputBd}`,
    borderRadius: '0.5rem', color: t.heading, fontSize: '0.9rem',
    fontFamily: 'inherit', outline: 'none',
  }

  const handleImageFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploadError('')
    setUploading(true)
    try {
      const url = await uploadToGithub(file)
      setForm(f => ({ ...f, imageUrl: url }))
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '1rem', padding: '2rem', marginBottom: '1.5rem', boxShadow: t.shadow }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: t.heading, marginBottom: '1.5rem' }}>
        {editId ? 'Edit Certification' : 'Add Certification / Achievement'}
      </h2>

      {uploadError && (
        <div style={{ backgroundColor: 'hsl(0,70%,20%)', border: '1px solid hsl(0,70%,40%)', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#fca5a5', fontSize: '0.85rem' }}>
          ⚠️ {uploadError}
        </div>
      )}

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))', gap: '1.1rem' }}>
          <FormField label="Title *" t={t}>
            <input style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="e.g. AWS Certified Developer" />
          </FormField>
          <FormField label="Issuer *" t={t}>
            <input style={inp} value={form.issuer} onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))} required placeholder="e.g. Amazon Web Services" />
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))', gap: '1.1rem' }}>
          <FormField label="Date" t={t}>
            <input style={inp} type="month" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </FormField>
          <FormField label="Type" t={t}>
            <select style={{ ...inp, cursor: 'pointer' }} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              <option value="certification">Certification</option>
              <option value="achievement">Achievement</option>
              <option value="award">Award</option>
              <option value="course">Course</option>
            </select>
          </FormField>
          <FormField label="Display Order" hint="Lower number = shown first (0, 1, 2…)" t={t}>
            <input style={{ ...inp, width: '6rem' }} type="number" min="0" value={form.order ?? 0} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} />
          </FormField>
        </div>

        <FormField label="Description" t={t}>
          <textarea style={{ ...inp, minHeight: '4rem', resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description…" />
        </FormField>

        <FormField label="Credential URL" t={t}>
          <input style={inp} type="url" value={form.credentialUrl} onChange={e => setForm(f => ({ ...f, credentialUrl: e.target.value }))} placeholder="https://…" />
        </FormField>

        {/* Badge / Certificate Image */}
        <FormField label="Badge / Certificate Image" hint="Pick an image from your device — uploads to GitHub automatically" t={t}>
          <label style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.55rem 1rem', borderRadius: '0.5rem', cursor: uploading ? 'not-allowed' : 'pointer',
            backgroundColor: uploading ? 'hsl(217,80%,40%)' : ACCENT,
            color: '#fff', fontWeight: 600, fontSize: '0.85rem', opacity: uploading ? 0.7 : 1,
          }}>
            {uploading ? '⏳ Uploading…' : '📁 Choose Image'}
            <input type="file" accept="image/*" style={{ display: 'none' }} disabled={uploading} onChange={handleImageFile} />
          </label>
          {form.imageUrl && (
            <div style={{ position: 'relative', display: 'inline-block', marginTop: '0.75rem', marginLeft: '0.75rem' }}>
              <img src={form.imageUrl} alt="badge preview"
                onError={e => { e.target.style.opacity = '0.3' }}
                style={{ height: '6rem', borderRadius: '0.5rem', objectFit: 'cover', display: 'block' }} />
              <button type="button" onClick={() => setForm(f => ({ ...f, imageUrl: '' }))}
                style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', borderRadius: '50%', width: '1.4rem', height: '1.4rem', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ✕
              </button>
            </div>
          )}
        </FormField>

        <button type="submit" disabled={loading || uploading} style={{
          padding: '0.7rem 1.5rem', borderRadius: '0.6rem', border: 'none',
          backgroundColor: loading ? 'hsl(217,80%,40%)' : ACCENT,
          color: '#fff', fontWeight: 700, fontSize: '0.95rem',
          cursor: (loading || uploading) ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit', alignSelf: 'flex-start',
          opacity: (loading || uploading) ? 0.7 : 1,
        }}>
          {loading ? 'Saving…' : editId ? 'Update' : 'Add Certification'}
        </button>

      </form>
    </div>
  )
}
