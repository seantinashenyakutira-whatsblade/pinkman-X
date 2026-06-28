import { useState, useCallback } from 'react'
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
import FoundingWaitlist from './components/sections/FoundingWaitlist'
import Footer from './components/sections/Footer'
import Toast from './components/ui/Toast'

export default function App() {
  const [toast, setToast] = useState({ visible: false, message: '' })
  const showToast = useCallback((message: string) => setToast({ visible: true, message }), [])
  const hideToast = useCallback(() => setToast({ visible: false, message: '' }), [])

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <Header />
      <main>
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
        <FoundingWaitlist />
      </main>
      <Footer />
      <Toast visible={toast.visible} message={toast.message} onClose={hideToast} />
    </div>
  )
}
