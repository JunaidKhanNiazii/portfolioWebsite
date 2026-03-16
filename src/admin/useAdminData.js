import { useState, useEffect, useCallback } from 'react'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../firebase'

export default function useAdminData() {
  const [projects, setProjects] = useState([])
  const [contacts, setContacts] = useState([])
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

  useEffect(() => { fetchProjects(); fetchContacts() }, [fetchProjects, fetchContacts])

  // ── Projects CRUD ──
  const saveProject = async (form, editId) => {
    const payload = {
      title:       form.title,
      description: form.description,
      githubLink:  form.githubLink,
      websiteLink: form.websiteLink,
      imageUrl:    form.imageUrl,
      images:      form.images,
      tags:        form.tags.split(',').map(s => s.trim()).filter(Boolean),
      features:    form.features.split('\n').map(s => s.trim()).filter(Boolean),
      updatedAt:   new Date().toISOString(),
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
    projects, contacts, unreadCount, toast,
    saveProject, deleteProject,
    markRead, deleteContact,
    logout, showToast,
  }
}
