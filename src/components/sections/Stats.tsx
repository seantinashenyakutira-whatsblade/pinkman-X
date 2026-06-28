export default function Stats() {
  return (
    <section className="relative px-4 pb-16">
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
        {[
          { val: '11+', label: 'AI Strategies' },
          { val: '8', label: 'Courses at Launch' },
          { val: '24/5', label: 'Market Coverage' },
        ].map((s) => (
          <div key={s.label} className="text-center py-5 rounded-xl bg-dark-800/50 border border-border/40">
            <div className="text-2xl sm:text-3xl font-black text-gold">{s.val}</div>
            <div className="text-xs text-muted-light mt-1 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
