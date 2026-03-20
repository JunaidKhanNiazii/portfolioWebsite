import { useState } from 'react'
import { ACCENT, emptyForm } from './adminTheme'
import ProjectForm from './ProjectForm'
import ProjectRow from './ProjectRow'

export default function ProjectControl({ projects, t, saveProject, deleteProject }) {
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId]     = useState(null)
  const [form, setForm]         = useState(emptyForm)
  const [loading, setLoading]   = useState(false)

  const openAdd = () => {
    setEditId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  const openEdit = (p) => {
    setEditId(p.id)
    setForm({
      title:       p.title || '',
      description: p.description || '',
      githubLink:  p.githubLink || '',
      websiteLink: p.websiteLink || '',
      tags:        (p.tags || []).join(', '),
      features:    (p.features || []).join('\n'),
      imageUrl:    p.imageUrl || '',
      images:      p.images || [],
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateCaption = (i, caption) => {
    setForm(f => {
      const imgs = [...f.images]
      imgs[i] = { ...imgs[i], caption }
      return { ...f, images: imgs }
    })
  }

  const removeGalleryImg = (i) => setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await saveProject(form, editId)
      setShowForm(false)
      setEditId(null)
      setForm(emptyForm)
    } finally {
      setLoading(false)
    }
  }

  const cancelForm = () => { setShowForm(false); setEditId(null) }

  return (
    <>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: t.heading, margin: 0 }}>Projects</h1>
        <button onClick={showForm ? cancelForm : openAdd} style={{
          padding: '0.55rem 1.25rem', borderRadius: '0.6rem', border: 'none',
          backgroundColor: showForm ? t.danger : ACCENT,
          color: '#fff', fontWeight: 600, fontSize: '0.9rem',
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          {showForm ? '✕ Cancel' : '+ New Project'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <ProjectForm
          form={form} setForm={setForm} t={t}
          loading={loading} editId={editId}
          onSubmit={handleSubmit}
          updateCaption={updateCaption}
          removeGalleryImg={removeGalleryImg}
        />
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {projects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: t.muted }}>No projects yet. Add your first one.</div>
        )}
        {projects.map(p => (
          <ProjectRow
            key={p.id} project={p} t={t}
            onEdit={() => openEdit(p)}
            onDelete={() => deleteProject(p.id)}
          />
        ))}
      </div>
    </>
  )
}
