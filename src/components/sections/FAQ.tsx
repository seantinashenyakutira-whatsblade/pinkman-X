import { useState } from 'react'
import Card from '../ui/Card'

const faqs = [
  {
    q: 'What is Pinkman X?',
    a: 'Pinkman X is an AI-powered trading intelligence platform that combines education, market analysis, news filtering, strategy management, session planning, and future MT5 automation into one workspace. Built by WhatsBlade Technologies in partnership with Pinkman FX.',
  },
  {
    q: 'Is Pinkman X a broker or exchange?',
    a: 'No. Pinkman X is an educational and analytical platform. We do not execute trades, custody funds, or replace your broker. Future MT5 automation will execute trades through your own terminal under your control.',
  },
  {
    q: 'Do AI tools guarantee profitable trading?',
    a: 'No. AI analysis, strategies, and automation do not guarantee profits. Trading involves substantial risk. Pinkman X provides decision-support tools — you remain responsible for your own trading decisions.',
  },
  {
    q: 'When will Pinkman X launch?',
    a: 'We are currently in active development. Join the waitlist to receive early access, beta invitations, and launch updates.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes. The Explorer plan is free and includes basic chart analysis, two courses, news feed access, and community features. Paid plans unlock advanced tools.',
  },
  {
    q: 'Can I connect my MT5 account?',
    a: 'MT5 automation is a planned feature for Pro and Elite subscribers. You will be able to connect your MT5 terminal for automated strategy execution with full risk controls.',
  },
  {
    q: 'How do I get beta access?',
    a: 'Join the waitlist and watch for beta invitation emails. Early waitlist members receive priority access.',
  },
  {
    q: 'Can I cancel my plan anytime?',
    a: 'Yes. All plans can be cancelled at any time with no penalties. You retain access until the end of your billing period.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative py-24 px-4" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} onClick={() => setOpen(open === i ? null : i)} className="p-0">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white pr-4">{faq.q}</h3>
                  <svg className={`w-5 h-5 text-muted shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-96 mt-3' : 'max-h-0'}`}>
                  <p className="text-sm text-muted-light leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
