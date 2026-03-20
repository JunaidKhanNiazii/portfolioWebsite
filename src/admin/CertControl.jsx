import { useState } from 'react'
import { ACCENT, emptyCertForm } from './adminTheme'
import CertForm from './CertForm'
import CertRow from './CertRow'

export default function CertControl({ certs, t, saveCert, deleteCert }) {
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId]     = useState(null)
  const [form, setForm]         = useState(emptyCertForm)
  const [loading, setLoading]   = useState(false)

  const openAdd = () => {
    setEditId(null)
    setForm(emptyCertForm)
    setShowForm(true)
  }

  const openEdit = (c) => {
    setEditId(c.id)
    setForm({
      title:         c.title || '',
      issuer:        c.issuer || '',
      date:          c.date || '',
      type:          c.type || 'certification',
      description:   c.description || '',
      credentialUrl: c.credentialUrl || '',
      imageUrl:      c.imageUrl || '',
      order:         c.order ?? 0,
    })
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await saveCert(form, editId)
      setShowForm(false)
      setEditId(null)
      setForm(emptyCertForm)
    } finally {
      setLoading(false)
    }
  }

  const cancelForm = () => { setShowForm(false); setEditId(null) }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: t.heading, margin: 0 }}>Certifications & Achievements</h1>
        <button onClick={showForm ? cancelForm : openAdd} style={{
          padding: '0.55rem 1.25rem', borderRadius: '0.6rem', border: 'none',
          backgroundColor: showForm ? t.danger : ACCENT,
          color: '#fff', fontWeight: 600, fontSize: '0.9rem',
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          {showForm ? '✕ Cancel' : '+ Add New'}
        </button>
      </div>

      {showForm && (
        <CertForm
          form={form} setForm={setForm} t={t}
          loading={loading} editId={editId}
          onSubmit={handleSubmit}
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {certs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: t.muted }}>No certifications yet. Add your first one.</div>
        )}
        {certs.map(c => (
          <CertRow
            key={c.id} cert={c} t={t}
            onEdit={() => openEdit(c)}
            onDelete={() => deleteCert(c.id)}
          />
        ))}
      </div>
    </>
  )
}
