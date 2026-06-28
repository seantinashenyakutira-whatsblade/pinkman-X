import Button from '../ui/Button'
import Badge from '../ui/Badge'
import ScrollLink from '../ui/ScrollLink'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neon/5 via-transparent to-dark-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2300f5a0\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <Badge variant="neon">Powered by WhatsBlade Technologies</Badge>
          <Badge variant="gold">In partnership with Pinkman FX</Badge>
          <Badge variant="cyan">Launching Soon</Badge>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
          <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">The Future of</span>
          <br />
          <span className="bg-gradient-to-r from-neon via-cyan to-neon bg-clip-text text-transparent">AI Trading Intelligence</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-light/80 max-w-3xl mx-auto mb-10 leading-relaxed">
          Pinkman X is an AI-powered trading platform built to help traders learn, analyze markets, understand news, manage risk, and automate trading strategies from one intelligent workspace.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <ScrollLink href="#waitlist">
            <Button variant="primary" size="lg">Join the Waitlist</Button>
          </ScrollLink>
          <ScrollLink href="#preview">
            <Button variant="secondary" size="lg">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Watch Preview
            </Button>
          </ScrollLink>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-xs text-muted">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
            AI-Powered
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-slow" />
            Multi-Asset
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-slow" />
            MT5 Ready
          </span>
        </div>
      </div>
    </section>
  )
}
