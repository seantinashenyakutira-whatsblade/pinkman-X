import { useState, useCallback } from 'react'
import Header from './components/Header'
import Hero from './components/sections/Hero'
import Problem from './components/sections/Problem'
import Solution from './components/sections/Solution'
import StrategyLibrary from './components/sections/StrategyLibrary'
import LearningAcademy from './components/sections/LearningAcademy'
import AINewsIntelligence from './components/sections/AINewsIntelligence'
import TradingTimetable from './components/sections/TradingTimetable'
import SubscriptionPreview from './components/sections/SubscriptionPreview'
import PartnershipSection from './components/sections/PartnershipSection'
import WaitlistForm from './components/sections/WaitlistForm'
import FAQ from './components/sections/FAQ'
import Footer from './components/sections/Footer'
import Toast from './components/ui/Toast'

export default function App() {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' as 'info' | 'success' | 'error' })

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message, type: 'info' })
  }, [])

  const hideToast = useCallback(() => {
    setToast({ visible: false, message: '', type: 'info' })
  }, [])

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <StrategyLibrary onToast={showToast} />
        <LearningAcademy />
        <AINewsIntelligence />
        <TradingTimetable />
        <SubscriptionPreview />
        <PartnershipSection />
        <section id="preview" className="relative py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-neon text-sm font-semibold tracking-widest uppercase">Preview</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Coming Soon</h2>
            <p className="text-muted-light max-w-2xl mx-auto mb-8">
              Product preview and demo video will be available here soon. Join the waitlist to be notified when the preview launches.
            </p>
            <div className="aspect-video rounded-2xl bg-dark-800 border border-border flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-muted mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm text-muted">Preview Video Coming Soon</p>
              </div>
            </div>
          </div>
        </section>
        <WaitlistForm />
        <FAQ />
      </main>
      <Footer />
      <Toast visible={toast.visible} message={toast.message} type={toast.type} onClose={hideToast} />
    </div>
  )
}
