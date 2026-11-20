import React, { useState } from 'react';
import { Send, CheckCircle2, Calendar, Mail, ArrowRight } from 'lucide-react';

const DELIVERABLE_OPTIONS = [
  'Technical Landing Page Rewrite',
  'Code-Backed Deep Dive / Guide',
  'Developer Product Launch Kit',
  'Whitepaper & Architecture Teardown',
  'Custom 2-Min Homepage Teardown'
];

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<'form' | 'call'>('form');
  const [selectedDeliverable, setSelectedDeliverable] = useState<string>('Technical Landing Page Rewrite');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyUrl: '',
    brief: '',
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full sheen-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Tab Switcher */}
      <div className="bg-[#0b0d0e] p-2 border-b border-white/8 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'form'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(34,197,94,0.12)]'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Project Inquiry Form</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('call')}
          className={`flex-1 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === 'call'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(34,197,94,0.12)]'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Schedule 15-Min Intro</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 bg-[#0d0f11]">
        {activeTab === 'call' ? (
          <div className="space-y-6 py-6 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Book a 15-Minute Intro Call</h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                No high-pressure sales pitch. We will discuss your technical product architecture, developer friction points, and see if there is a mutual fit.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-white/8 text-xs font-mono text-zinc-300 space-y-2">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Duration:</span>
                <span className="text-zinc-200">15 minutes</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Format:</span>
                <span className="text-zinc-200">Google Meet</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Timezone:</span>
                <span className="text-emerald-400">IST / Overlaps US & EU Mornings</span>
              </div>
            </div>

            <a
              href="https://cal.com/jatin-bhanot/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg text-xs font-mono font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition-all glow-tactical"
            >
              <span>Open Calendar Scheduler</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : submitted ? (
          <div className="py-12 text-center space-y-4 max-w-md mx-auto animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(34,197,94,0.2)]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Thanks {formData.name}. I personally review every technical brief. You will receive a detailed response with preliminary thoughts within <strong>24 hours</strong>.
            </p>
            <div className="pt-4 font-mono text-xs text-emerald-400/90 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
              SLA: &lt; 24h response guaranteed • Direct email: bhanot1054@gmail.com
            </div>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', companyUrl: '', brief: '' });
              }}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-300 underline cursor-pointer pt-2 block mx-auto"
            >
              Submit another brief
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Deliverable Selector Pills */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider">
                Select Deliverable Scope:
              </label>
              <div className="flex flex-wrap gap-2">
                {DELIVERABLE_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedDeliverable(opt)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      selectedDeliverable === opt
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-medium'
                        : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-white/5'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Work Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-mono text-zinc-300">
                  Your Name <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-xs font-mono focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-mono text-zinc-300">
                  Work Email <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-xs font-mono focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60"
                />
              </div>
            </div>

            {/* Product / Company URL */}
            <div className="space-y-1.5">
              <label htmlFor="companyUrl" className="block text-xs font-mono text-zinc-300">
                Product URL or GitHub Repo
              </label>
              <input
                id="companyUrl"
                type="text"
                placeholder="https://github.com/org/repo or https://devtools.sh"
                value={formData.companyUrl}
                onChange={e => setFormData({ ...formData, companyUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-xs font-mono focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60"
              />
            </div>

            {/* Project Brief */}
            <div className="space-y-1.5">
              <label htmlFor="brief" className="block text-xs font-mono text-zinc-300">
                Project Scope & Architecture Friction <span className="text-zinc-500">(What feels broken?)</span>
              </label>
              <textarea
                id="brief"
                rows={4}
                placeholder="Briefly describe your product stack, target technical persona, and where your current copy fails to convert skeptical engineers..."
                value={formData.brief}
                onChange={e => setFormData({ ...formData, brief: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-xs font-mono focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-xs font-mono font-semibold tracking-wide bg-emerald-500 text-black hover:bg-emerald-400 transition-all glow-tactical flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Transmit Project Inquiry</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            <div className="text-[11px] font-mono text-zinc-500 text-center flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Direct engineer response within 24h • Strictly zero spam</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
