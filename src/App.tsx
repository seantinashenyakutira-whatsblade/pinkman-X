import { useState, useCallback, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import Ticker from './components/sections/Ticker'
import Problem from './components/sections/Problem'
import Solution from './components/sections/Solution'
import StrategyLibrary from './components/sections/StrategyLibrary'
import LearningAcademy from './components/sections/LearningAcademy'
import AINewsIntelligence from './components/sections/AINewsIntelligence'
import TradingTimetable from './components/sections/TradingTimetable'
import Automation from './components/sections/Automation'
import SubscriptionPreview from './components/sections/SubscriptionPreview'
import PartnershipSection from './components/sections/PartnershipSection'
import FAQ from './components/sections/FAQ'
import FoundingWaitlist from './components/sections/FoundingWaitlist'
import Footer from './components/sections/Footer'
import Toast from './components/ui/Toast'

export default function App() {
  const [toast, setToast] = useState({ visible: false, message: '' })
  const showToast = useCallback((message: string) => setToast({ visible: true, message }), [])
  const hideToast = useCallback(() => setToast({ visible: false, message: '' }), [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <Header />
      <main className="bg-chart-pattern">
        <Hero />
        <Stats />
        <Ticker />
        <Problem />
        <Solution />
        <StrategyLibrary onToast={showToast} />
        <LearningAcademy />
        <AINewsIntelligence />
        <TradingTimetable />
        <Automation />
        <SubscriptionPreview />
        <PartnershipSection />
        <FAQ />
        <FoundingWaitlist />
      </main>
      <Footer />
      <Toast visible={toast.visible} message={toast.message} onClose={hideToast} />
    </div>
  )
}
