import { ACCENT } from './adminTheme'

function FormField({ label, t, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: t.muted, marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

export default function ProjectForm({ form, setForm, t, loading, editId, onSubmit, onImageFile, onGalleryFiles, updateCaption, removeGalleryImg }) {
  const inp = {
    width: '100%', boxSizing: 'border-box', padding: '0.6rem 0.85rem',
    backgroundColor: t.input, border: `1px solid ${t.inputBd}`,
    borderRadius: '0.5rem', color: t.heading, fontSize: '0.9rem',
    fontFamily: 'inherit', outline: 'none',
  }

  return (
    <div style={{ backgroundColor: t.card, border: `1px solid ${t.border}`, borderRadius: '1rem', padding: '2rem', marginBottom: '1.5rem', boxShadow: t.shadow }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: t.heading, marginBottom: '1.5rem' }}>
        {editId ? 'Edit Project' : 'Add New Project'}
      </h2>

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))', gap: '1.1rem' }}>
          <FormField label="Title *" t={t}>
            <input style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required placeholder="Project title" />
          </FormField>
          <FormField label="Tech Tags (comma separated)" t={t}>
            <input style={inp} value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="React, Firebase, Node.js" />
          </FormField>
        </div>

        <FormField label="Description *" t={t}>
          <textarea style={{ ...inp, minHeight: '6rem', resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required placeholder="Describe the project…" />
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

        <FormField label="Cover Image" t={t}>
          <input type="file" accept="image/*" onChange={onImageFile} style={{ ...inp, padding: '0.4rem' }} />
          {form.imageUrl && <img src={form.imageUrl} alt="cover" style={{ marginTop: '0.5rem', height: '7rem', borderRadius: '0.5rem', objectFit: 'cover' }} />}
        </FormField>

        <FormField label="Gallery Images (select multiple)" t={t}>
          <input type="file" accept="image/*" multiple onChange={onGalleryFiles} style={{ ...inp, padding: '0.4rem' }} />
          {form.images.length > 0 && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
              {form.images.map((img, i) => (
                <div key={i} style={{ position: 'relative', width: '8rem' }}>
                  <img src={img.url} alt={`gallery-${i}`} style={{ width: '8rem', height: '5.5rem', objectFit: 'cover', borderRadius: '0.5rem', display: 'block' }} />
                  <input value={img.caption} onChange={e => updateCaption(i, e.target.value)} placeholder="Caption…"
                    style={{ ...inp, marginTop: '0.3rem', fontSize: '0.75rem', padding: '0.3rem 0.5rem' }} />
                  <button type="button" onClick={() => removeGalleryImg(i)}
                    style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', borderRadius: '50%', width: '1.25rem', height: '1.25rem', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ✕
                  </button>
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
