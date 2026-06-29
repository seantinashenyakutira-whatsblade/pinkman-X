import { useState } from 'react'
import { AuthProvider, useAuth } from '../lib/AuthContext'
import AdminLogin from '../components/admin/AdminLogin'
import AdminLayout from '../components/admin/AdminLayout'
import WaitlistTab from '../components/admin/WaitlistTab'
import EmailLogsTab from '../components/admin/EmailLogsTab'
import BlogTab from '../components/admin/BlogTab'
import PostEditor from '../components/admin/PostEditor'

function AdminContent() {
  const { user, loading, isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState('waitlist')
  const [editingPost, setEditingPost] = useState<any | null>(undefined)
  const [refreshKey, setRefreshKey] = useState(0)

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <p className="text-sm text-muted">Loading...</p>
      </div>
    )
  }

  if (!user) return <AdminLogin />

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-muted text-sm mb-2">Unauthorized. This account does not have admin access.</p>
          <button onClick={() => useAuth().signOut()} className="text-xs text-gold underline">Sign Out</button>
        </div>
      </div>
    )
  }

  if (editingPost !== undefined) {
    return (
      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <PostEditor
          post={editingPost}
          authorId={user.id}
          onSave={() => { setEditingPost(undefined); setRefreshKey((k) => k + 1) }}
          onCancel={() => setEditingPost(undefined)}
        />
      </AdminLayout>
    )
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'waitlist' && <WaitlistTab />}
      {activeTab === 'emails' && <EmailLogsTab />}
      {activeTab === 'blog' && <BlogTab onEdit={setEditingPost} refreshKey={refreshKey} />}
    </AdminLayout>
  )
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  )
}
