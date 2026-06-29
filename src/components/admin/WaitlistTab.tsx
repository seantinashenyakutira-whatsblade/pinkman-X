import { useEffect, useState } from 'react'
import { getWaitlistEntries } from '../../lib/supabase'
import { Search } from 'lucide-react'

export default function WaitlistTab() {
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getWaitlistEntries().then((data) => { setEntries(data); setLoading(false) })
  }, [])

  const filtered = entries.filter((e) =>
    !search || [e.full_name, e.email, e.whatsapp].some((v) => v?.toLowerCase().includes(search.toLowerCase()))
  )

  if (loading) return <p className="text-sm text-muted">Loading waitlist...</p>

  return (
    <div>
      <h2 className="text-lg font-bold text-white mb-4">Waitlist ({entries.length})</h2>
      <div className="relative max-w-xs mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, phone..."
          className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/80 border border-gold/15 text-white text-xs placeholder-muted/60 focus:outline-none focus:ring-2 focus:ring-gold/25"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gold/10 text-muted text-left">
              <th className="py-2 pr-3 font-semibold">Name</th>
              <th className="py-2 pr-3 font-semibold">Email</th>
              <th className="py-2 pr-3 font-semibold">WhatsApp</th>
              <th className="py-2 pr-3 font-semibold">Experience</th>
              <th className="py-2 pr-3 font-semibold">Interest</th>
              <th className="py-2 pr-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e: any) => (
              <tr key={e.id} className="border-b border-gold/5 text-white hover:bg-white/5 transition-colors">
                <td className="py-2 pr-3">{e.full_name}</td>
                <td className="py-2 pr-3">{e.email}</td>
                <td className="py-2 pr-3">{e.whatsapp}</td>
                <td className="py-2 pr-3">{e.experience_level}</td>
                <td className="py-2 pr-3">{e.interest}</td>
                <td className="py-2 pr-3 text-muted">{new Date(e.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="py-6 text-center text-muted">No results</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
