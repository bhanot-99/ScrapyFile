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
    <div className="w-full bg-[#FFFDF9] rounded-sm border-[2px] border-[#111111] shadow-[6px_6px_0px_#111111] overflow-hidden">
      {/* Tab Switcher */}
      <div className="bg-[#FAF8F3] p-2 border-b-[1.5px] border-[#111111] flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-2 rounded-xs text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 border-[1.5px] ${
            activeTab === 'form'
              ? 'bg-[#FFE600] text-[#111111] border-[#111111] shadow-[2.5px_2.5px_0px_#111111]'
              : 'bg-[#FFFDF9] text-[#4B4A47] hover:text-[#111111] border-[#111111]'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Project Brief Form</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('call')}
          className={`flex-1 py-2 rounded-xs text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 border-[1.5px] ${
            activeTab === 'call'
              ? 'bg-[#FFE600] text-[#111111] border-[#111111] shadow-[2.5px_2.5px_0px_#111111]'
              : 'bg-[#FFFDF9] text-[#4B4A47] hover:text-[#111111] border-[#111111]'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Schedule 15-Min Intro</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 bg-[#FFFDF9]">
        {activeTab === 'call' ? (
          <div className="space-y-6 py-6 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-xs bg-[#FFE600] border-[2px] border-[#111111] shadow-[3px_3px_0px_#111111] text-[#111111] flex items-center justify-center mx-auto">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black font-display uppercase tracking-tight text-[#111111] mb-2">Book a 15-Minute Intro Call</h3>
              <p className="text-[#4B4A47] text-xs sm:text-sm leading-relaxed font-sans font-medium">
                No high-pressure sales pitch. We will discuss your technical product architecture, developer friction points, and see if there is a mutual fit.
              </p>
            </div>

            <div className="p-4 rounded-xs bg-[#FAF8F3] border-[1.5px] border-[#111111] shadow-[3px_3px_0px_#111111] text-xs font-mono text-[#111111] space-y-2">
              <div className="flex items-center justify-between text-[#4B4A47]">
                <span>Duration:</span>
                <span className="text-[#111111] font-bold">15 minutes</span>
              </div>
              <div className="flex items-center justify-between text-[#4B4A47]">
                <span>Format:</span>
                <span className="text-[#111111] font-bold">Google Meet</span>
              </div>
              <div className="flex items-center justify-between text-[#4B4A47]">
                <span>Timezone:</span>
                <span className="text-[#16A34A] font-bold">IST / Overlaps US & EU Mornings</span>
              </div>
            </div>

            <a
              href="https://cal.com/jatin-bhanot/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xs text-xs font-mono font-black uppercase tracking-wider bg-[#FF3B30] text-white hover:bg-[#e03026] border-[1.5px] border-[#111111] shadow-[3px_3px_0px_#111111] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#111111] transition-all"
            >
              <span>Open Calendar Scheduler</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : submitted ? (
          <div className="py-12 text-center space-y-4 max-w-md mx-auto animate-fade-in">
            <div className="w-16 h-16 rounded-xs bg-[#16A34A] border-[2px] border-[#111111] shadow-[4px_4px_0px_#111111] text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black font-display uppercase tracking-tight text-[#111111]">Inquiry Received</h3>
            <p className="text-[#3F3E3B] text-sm leading-relaxed font-sans font-medium">
              Thanks {formData.name}. I personally review every technical brief. You will receive a detailed response with preliminary thoughts within <strong>24 hours</strong>.
            </p>
            <div className="pt-4 font-mono text-xs font-bold text-[#111111] bg-[#FFE600] p-3 rounded-xs border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111]">
              SLA: &lt; 24h response guaranteed • Direct email: bhanot1054@gmail.com
            </div>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', companyUrl: '', brief: '' });
              }}
              className="text-xs font-mono font-bold text-[#111111] underline cursor-pointer pt-2 block mx-auto uppercase"
            >
              Submit another brief
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Deliverable Selector Pills */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
                Select Deliverable Scope:
              </label>
              <div className="flex flex-wrap gap-2">
                {DELIVERABLE_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedDeliverable(opt)}
                    className={`px-3 py-1.5 rounded-xs text-xs font-mono font-bold transition-all cursor-pointer border-[1.5px] ${
                      selectedDeliverable === opt
                        ? 'bg-[#111111] text-[#FFE600] border-[#111111] shadow-[2.5px_2.5px_0px_#FF3B30]'
                        : 'bg-[#FFFDF9] text-[#4B4A47] hover:text-[#111111] border-[#111111] shadow-[1.5px_1.5px_0px_#111111]'
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
                <label htmlFor="name" className="block text-xs font-mono font-bold text-[#111111]">
                  Your Name <span className="text-[#FF3B30]">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xs bg-[#FFFDF9] border-[1.5px] border-[#111111] text-[#111111] placeholder-[#8E8D88] text-xs font-mono shadow-[2px_2px_0px_#111111] focus:outline-none focus:border-[#FF3B30] focus:shadow-[3px_3px_0px_#FF3B30]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-mono font-bold text-[#111111]">
                  Work Email <span className="text-[#FF3B30]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xs bg-[#FFFDF9] border-[1.5px] border-[#111111] text-[#111111] placeholder-[#8E8D88] text-xs font-mono shadow-[2px_2px_0px_#111111] focus:outline-none focus:border-[#FF3B30] focus:shadow-[3px_3px_0px_#FF3B30]"
                />
              </div>
            </div>

            {/* Product / Company URL */}
            <div className="space-y-1.5">
              <label htmlFor="companyUrl" className="block text-xs font-mono font-bold text-[#111111]">
                Product URL or GitHub Repo
              </label>
              <input
                id="companyUrl"
                type="text"
                placeholder="https://github.com/org/repo or https://devtools.sh"
                value={formData.companyUrl}
                onChange={e => setFormData({ ...formData, companyUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xs bg-[#FFFDF9] border-[1.5px] border-[#111111] text-[#111111] placeholder-[#8E8D88] text-xs font-mono shadow-[2px_2px_0px_#111111] focus:outline-none focus:border-[#FF3B30] focus:shadow-[3px_3px_0px_#FF3B30]"
              />
            </div>

            {/* Project Brief */}
            <div className="space-y-1.5">
              <label htmlFor="brief" className="block text-xs font-mono font-bold text-[#111111]">
                Project Scope & Architecture Friction <span className="text-[#8E8D88]">(What feels broken?)</span>
              </label>
              <textarea
                id="brief"
                rows={4}
                placeholder="Briefly describe your product stack, target technical persona, and where your current copy fails to convert skeptical engineers..."
                value={formData.brief}
                onChange={e => setFormData({ ...formData, brief: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xs bg-[#FFFDF9] border-[1.5px] border-[#111111] text-[#111111] placeholder-[#8E8D88] text-xs font-mono shadow-[2px_2px_0px_#111111] focus:outline-none focus:border-[#FF3B30] focus:shadow-[3px_3px_0px_#FF3B30] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xs text-xs font-mono font-black uppercase tracking-wider bg-[#FF3B30] text-white hover:bg-[#e03026] border-[1.5px] border-[#111111] shadow-[4px_4px_0px_#111111] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#111111] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Transmit Project Inquiry</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            <div className="text-[11px] font-mono font-bold text-[#4B4A47] text-center flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
              <span>Direct engineer response within 24h • Strictly zero spam</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
