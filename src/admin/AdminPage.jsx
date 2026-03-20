import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useT, ACCENT } from './adminTheme'
import useAdminData from './useAdminData'
import AdminNavbar from './AdminNavbar'
import ProjectControl from './ProjectControl'
import MessageControl from './MessageControl'
import CertControl from './CertControl'

export default function AdminPage() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const t = useT(dark)

  const [tab, setTab] = useState('projects')

  const {
    projects, contacts, certs, unreadCount, toast,
    saveProject, deleteProject,
    saveCert, deleteCert,
    markRead, deleteContact,
    logout,
  } = useAdminData()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: t.bg, transition: 'background-color 0.3s', fontFamily: 'inherit' }}>

      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed', top: '1.25rem', right: '1.25rem', zIndex: 999,
          padding: '0.75rem 1.25rem', borderRadius: '0.6rem',
          backgroundColor: toast.type === 'error' ? t.danger : toast.type === 'info' ? ACCENT : t.success,
          color: '#fff', fontWeight: 600, fontSize: '0.9rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        }}>
          {toast.msg}
        </div>
      )}

      <AdminNavbar
        tab={tab} setTab={setTab}
        projectCount={projects.length}
        certCount={certs.length}
        unreadCount={unreadCount}
        onLogout={logout}
        t={t}
      />

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {tab === 'projects' && (
          <ProjectControl
            projects={projects} t={t}
            saveProject={saveProject}
            deleteProject={deleteProject}
          />
        )}
        {tab === 'certs' && (
          <CertControl
            certs={certs} t={t}
            saveCert={saveCert}
            deleteCert={deleteCert}
          />
        )}
        {tab === 'contacts' && (
          <MessageControl
            contacts={contacts} unreadCount={unreadCount}
            t={t} dark={dark}
            markRead={markRead}
            deleteContact={deleteContact}
          />
        )}
      </div>

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  )
}
