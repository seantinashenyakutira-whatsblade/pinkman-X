import { useEffect, useState } from 'react'
import { getEmailLogs } from '../../lib/supabase'

export default function EmailLogsTab() {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEmailLogs().then((data) => { setLogs(data); setLoading(false) })
  }, [])

  if (loading) return <p className="text-sm text-muted">Loading email logs...</p>

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Email Logs ({logs.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gold/10 text-muted text-left">
              <th className="py-2 pr-3 font-semibold">Recipient</th>
              <th className="py-2 pr-3 font-semibold">Type</th>
              <th className="py-2 pr-3 font-semibold">Status</th>
              <th className="py-2 pr-3 font-semibold">Error</th>
              <th className="py-2 pr-3 font-semibold">Sent At</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l: any) => (
              <tr key={l.id} className="border-b border-gold/5 text-white hover:bg-white/5 transition-colors">
                <td className="py-2 pr-3">{l.recipient_email}</td>
                <td className="py-2 pr-3 capitalize">{l.email_type.replace(/_/g, ' ')}</td>
                <td className="py-2 pr-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${l.status === 'sent' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {l.status}
                  </span>
                </td>
                <td className="py-2 pr-3 text-muted">{l.error_message || '—'}</td>
                <td className="py-2 pr-3 text-muted">{new Date(l.sent_at).toLocaleString()}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr><td colSpan={5} className="py-6 text-center text-muted">No emails sent yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
