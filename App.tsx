
import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { CampaignProvider, useCampaign } from './context/CampaignContext';
import InputForm from './components/InputForm';
import AdStrategyDisplay from './components/AdStrategyDisplay';

const Navbar: React.FC = () => (
  <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        <div className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
      </div>
      <span className="font-semibold text-xl tracking-tight text-[#5F6368]">AdCreative <span className="text-gray-900 font-bold">Pro</span></span>
    </div>
    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
      <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
      <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it works</a>
      <a href="#generator" className="hover:text-blue-600 transition-colors">Start Generator</a>
    </div>
    <button className="btn-primary px-6 py-2 text-sm">Sign In</button>
  </nav>
);

const AppContent: React.FC = () => {
  const { strategy, isLoading, error, resetCampaign } = useCampaign();

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      <SpeedInsights />
      <Navbar />

      {!strategy ? (
        <>
          {/* Hero Section */}
          <section className="pt-20 pb-16 px-6 text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              Professional ad strategies,<br /><span className="text-[#1A73E8]">powered by agency AI.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Transform your product experience into high-performing UGC scripts, visual directives, and conversion-focused systems in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#generator" className="btn-primary px-8 py-3.5 text-base">Build your campaign</a>
              <button className="btn-outline px-8 py-3.5 text-base">View sample output</button>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 bg-[#F8F9FA] px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-16">Intelligence designed for performance.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Strategic AI Engine",
                    desc: "Leverage senior-level advertising directives tuned for modern social platforms.",
                    icon: "M13 10V3L4 14h7v7l9-11h-7z"
                  },
                  {
                    title: "Creator Directives",
                    desc: "Detailed storyboards that tell your creators exactly how to film for maximum authenticity.",
                    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  },
                  {
                    title: "Global Export",
                    desc: "Professional PDF production decks ready to share with your creative team or agency partners.",
                    icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  }
                ].map((f, i) => (
                  <div key={i} className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} /></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Generator Section */}
          <section id="generator" className="py-24 px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">Try it now</span>
                <h2 className="text-4xl font-bold mt-2">Generate your campaign system</h2>
                <p className="text-gray-600 mt-4">Fill in your product details below to start the agency protocol.</p>
              </div>
              <InputForm />
            </div>
          </section>
        </>
      ) : (
        <main className="max-w-6xl mx-auto py-12 px-6">
          <div className="mb-12 flex justify-between items-center">
            <button 
              onClick={resetCampaign}
              className="btn-outline px-6 py-2 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Editor
            </button>
            <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-4 py-1.5 rounded-full border border-green-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Campaign Finalized
            </div>
          </div>
          <AdStrategyDisplay />
        </main>
      )}

      {error && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
          <div className="bg-white border-l-4 border-red-500 shadow-2xl p-4 flex gap-4 items-center rounded-r-lg">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <div>
              <p className="font-bold text-gray-900">System Error</p>
              <p className="text-sm text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#F8F9FA] border-t border-gray-200 py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
              </div>
              <span className="font-bold text-gray-900">AdCreative Pro</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering creators and brands with agency-grade AI strategy. Part of the future of content production.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold text-sm text-gray-900 mb-6 uppercase tracking-wider">Product</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-600">Features</a></li>
                <li><a href="#" className="hover:text-blue-600">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900 mb-6 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-600">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-600">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-gray-200 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} AdCreative Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CampaignProvider>
      <AppContent />
    </CampaignProvider>
  );
};

export default App;
