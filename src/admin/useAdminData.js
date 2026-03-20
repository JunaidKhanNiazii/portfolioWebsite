import { useState, useEffect, useCallback } from 'react'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../firebase'

export default function useAdminData() {
  const [projects, setProjects] = useState([])
  const [contacts, setContacts] = useState([])
  const [certs,    setCerts]    = useState([])
  const [toast, setToast]       = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchProjects = useCallback(async () => {
    const snap = await getDocs(collection(db, 'projects'))
    setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }, [])

  const fetchContacts = useCallback(async () => {
    const snap = await getDocs(collection(db, 'contacts'))
    setContacts(
      snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    )
  }, [])

  const fetchCerts = useCallback(async () => {
    const snap = await getDocs(collection(db, 'certifications'))
    setCerts(
      snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    )
  }, [])

  useEffect(() => { fetchProjects(); fetchContacts(); fetchCerts() }, [fetchProjects, fetchContacts, fetchCerts])

  // ── Projects CRUD ──
  const saveProject = async (form, editId) => {
    const payload = {
      title:               form.title,
      description:         form.description,
      detailedDescription: form.detailedDescription || '',
      githubLink:          form.githubLink,
      websiteLink:         form.websiteLink,
      imageUrl:            form.imageUrl,
      images:              form.images,
      tags:                form.tags.split(',').map(s => s.trim()).filter(Boolean),
      features:            form.features.split('\n').map(s => s.trim()).filter(Boolean),
      updatedAt:           new Date().toISOString(),
    }
    if (editId) {
      await updateDoc(doc(db, 'projects', editId), payload)
      showToast('Project updated!')
    } else {
      await addDoc(collection(db, 'projects'), { ...payload, createdAt: new Date().toISOString() })
      showToast('Project added!')
    }
    fetchProjects()
  }

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return false
    await deleteDoc(doc(db, 'projects', id))
    fetchProjects()
    showToast('Project deleted.', 'info')
    return true
  }

  // ── Certifications CRUD ──
  const saveCert = async (form, editId) => {
    const payload = {
      title:         form.title,
      issuer:        form.issuer,
      date:          form.date,
      type:          form.type,
      description:   form.description,
      credentialUrl: form.credentialUrl,
      imageUrl:      form.imageUrl,
      updatedAt:     new Date().toISOString(),
    }
    if (editId) {
      await updateDoc(doc(db, 'certifications', editId), payload)
      showToast('Certification updated!')
    } else {
      await addDoc(collection(db, 'certifications'), { ...payload, createdAt: new Date().toISOString() })
      showToast('Certification added!')
    }
    fetchCerts()
  }

  const deleteCert = async (id) => {
    if (!window.confirm('Delete this certification?')) return
    await deleteDoc(doc(db, 'certifications', id))
    fetchCerts()
    showToast('Deleted.', 'info')
  }

  // ── Contacts CRUD ──
  const markRead = async (id) => {
    await updateDoc(doc(db, 'contacts', id), { status: 'read' })
    fetchContacts()
  }

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this message?')) return
    await deleteDoc(doc(db, 'contacts', id))
    fetchContacts()
    showToast('Message deleted.', 'info')
  }

  // ── Auth ──
  const logout = async () => { await signOut(auth); window.location.hash = '' }

  const unreadCount = contacts.filter(c => c.status === 'unread').length

  return {
    projects, contacts, certs, unreadCount, toast,
    saveProject, deleteProject,
    saveCert, deleteCert,
    markRead, deleteContact,
    logout, showToast,
  }
}
