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
    <div className="w-full bg-[#FDFBF7] rounded-2xl border border-[#1C1B19]/10 shadow-[0_12px_28px_rgba(28,27,25,0.08)] overflow-hidden">
      {/* Tab Switcher */}
      <div className="bg-[#F4F1EA] p-2 border-b border-[#1C1B19]/8 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'form'
              ? 'bg-[#FDFBF7] text-[#1C1B19] shadow-[0_2px_8px_rgba(28,27,25,0.08)] border border-[#1C1B19]/10'
              : 'text-[#57534E] hover:text-[#1C1B19]'
          }`}
        >
          <Mail className="w-4 h-4 text-[#1C1B19]" />
          <span>Project Brief Form</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('call')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'call'
              ? 'bg-[#FDFBF7] text-[#1C1B19] shadow-[0_2px_8px_rgba(28,27,25,0.08)] border border-[#1C1B19]/10'
              : 'text-[#57534E] hover:text-[#1C1B19]'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#1C1B19]" />
          <span>Schedule 15-Min Intro</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 bg-[#FDFBF7]">
        {activeTab === 'call' ? (
          <div className="space-y-6 py-4 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#E3DEFA] text-[#1C1B19] border border-[#1C1B19]/10 shadow-[0_4px_12px_rgba(28,27,25,0.06)] flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-sans tracking-tight text-[#1C1B19] mb-2">Book a 15-Minute Intro Call</h3>
              <p className="text-[#57534E] text-xs sm:text-sm leading-relaxed font-sans">
                No high-pressure sales pitch. We will discuss your technical product architecture, developer friction points, and see if there is a mutual fit.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F1EA] border border-[#1C1B19]/8 text-xs font-mono text-[#1C1B19] space-y-2">
              <div className="flex items-center justify-between text-[#57534E]">
                <span>Duration:</span>
                <span className="text-[#1C1B19] font-bold">15 minutes</span>
              </div>
              <div className="flex items-center justify-between text-[#57534E]">
                <span>Format:</span>
                <span className="text-[#1C1B19] font-bold">Google Meet</span>
              </div>
              <div className="flex items-center justify-between text-[#57534E]">
                <span>Timezone:</span>
                <span className="text-[#1C1B19] font-bold bg-[#D7F0DE] px-2 py-0.5 rounded-full text-[11px]">IST / Overlaps US & EU Mornings</span>
              </div>
            </div>

            <a
              href="https://cal.com/jatin-bhanot/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full text-xs font-sans font-semibold bg-[#1C1B19] text-[#FDFBF7] hover:bg-[#3D3A36] shadow-[0_4px_12px_rgba(28,27,25,0.12)] hover:translate-y-[-1px] transition-all"
            >
              <span>Open Calendar Scheduler</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : submitted ? (
          <div className="py-10 text-center space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#D7F0DE] border border-[#1C1B19]/10 shadow-[0_4px_12px_rgba(28,27,25,0.06)] text-[#1C1B19] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-[#1C1B19]" />
            </div>
            <h3 className="text-xl font-bold font-sans tracking-tight text-[#1C1B19]">Inquiry Received</h3>
            <p className="text-[#57534E] text-sm leading-relaxed font-sans">
              Thanks {formData.name}. I personally review every technical brief. You will receive a detailed response with preliminary thoughts within <strong>24 hours</strong>.
            </p>
            <div className="pt-3 font-mono text-xs font-semibold text-[#1C1B19] bg-[#E3DEFA] p-3 rounded-xl border border-[#1C1B19]/10">
              Direct engineer response: 1–2 business days • Direct email: bhanot1054@gmail.com
            </div>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', companyUrl: '', brief: '' });
              }}
              className="text-xs font-sans font-semibold text-[#1C1B19] underline cursor-pointer pt-2 block mx-auto"
            >
              Submit another brief
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Deliverable Selector Pills */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold text-[#1C1B19] uppercase tracking-wider">
                Select Deliverable Scope:
              </label>
              <div className="flex flex-wrap gap-2">
                {DELIVERABLE_OPTIONS.map((opt, i) => {
                  const pastels = ['bg-[#E3DEFA]', 'bg-[#FADEC9]', 'bg-[#F7D6DE]', 'bg-[#D7F0DE]', 'bg-[#EAF57A]'];
                  const pastelColor = pastels[i % pastels.length];
                  const isSelected = selectedDeliverable === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedDeliverable(opt)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer border ${
                        isSelected
                          ? `${pastelColor} text-[#1C1B19] border-[#1C1B19]/25 shadow-xs font-semibold scale-102`
                          : 'bg-[#F4F1EA]/80 text-[#57534E] hover:text-[#1C1B19] border-transparent hover:bg-[#F4F1EA]'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name & Work Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-mono font-semibold text-[#1C1B19]">
                  Your Name <span className="text-[#57534E]">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F1EA]/60 border border-[#1C1B19]/15 text-[#1C1B19] placeholder-[#57534E]/50 text-xs font-mono focus:bg-[#FFFDF9] focus:outline-none focus:border-[#1C1B19]/40 focus:ring-2 focus:ring-[#E3DEFA]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-mono font-semibold text-[#1C1B19]">
                  Work Email <span className="text-[#57534E]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F1EA]/60 border border-[#1C1B19]/15 text-[#1C1B19] placeholder-[#57534E]/50 text-xs font-mono focus:bg-[#FFFDF9] focus:outline-none focus:border-[#1C1B19]/40 focus:ring-2 focus:ring-[#E3DEFA]"
                />
              </div>
            </div>

            {/* Product / Company URL */}
            <div className="space-y-1.5">
              <label htmlFor="companyUrl" className="block text-xs font-mono font-semibold text-[#1C1B19]">
                Product URL or GitHub Repo
              </label>
              <input
                id="companyUrl"
                type="text"
                placeholder="https://github.com/org/repo or https://devtools.sh"
                value={formData.companyUrl}
                onChange={e => setFormData({ ...formData, companyUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F1EA]/60 border border-[#1C1B19]/15 text-[#1C1B19] placeholder-[#57534E]/50 text-xs font-mono focus:bg-[#FFFDF9] focus:outline-none focus:border-[#1C1B19]/40 focus:ring-2 focus:ring-[#E3DEFA]"
              />
            </div>

            {/* Project Brief */}
            <div className="space-y-1.5">
              <label htmlFor="brief" className="block text-xs font-mono font-semibold text-[#1C1B19]">
                Project Scope & Architecture Friction <span className="text-[#57534E] font-normal">(What feels broken?)</span>
              </label>
              <textarea
                id="brief"
                rows={4}
                placeholder="Briefly describe your product stack, target technical persona, and where your current copy fails to convert skeptical engineers..."
                value={formData.brief}
                onChange={e => setFormData({ ...formData, brief: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F1EA]/60 border border-[#1C1B19]/15 text-[#1C1B19] placeholder-[#57534E]/50 text-xs font-mono focus:bg-[#FFFDF9] focus:outline-none focus:border-[#1C1B19]/40 focus:ring-2 focus:ring-[#E3DEFA] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full text-xs font-sans font-semibold tracking-wide bg-[#1C1B19] text-[#FDFBF7] hover:bg-[#3D3A36] shadow-[0_4px_12px_rgba(28,27,25,0.12)] hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Transmit Project Inquiry</span>
              <Send className="w-4 h-4" />
            </button>

            <div className="text-[11px] font-mono text-[#57534E] text-center flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1C1B19]/40"></span>
              <span>Direct engineer response within 1–2 business days • Strictly zero spam</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}