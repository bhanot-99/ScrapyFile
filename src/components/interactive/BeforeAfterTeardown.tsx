import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, ArrowRight, Zap, Sparkles } from 'lucide-react';

interface StrategyPin {
  id: string;
  element: string;
  beforeFlaw: string;
  afterFix: string;
  conversionLift: string;
}

const STRATEGY_PINS: StrategyPin[] = [
  {
    id: 'headline',
    element: 'Headline',
    beforeFlaw: 'Vague claim: "The all-in-one developer platform for modern engineering teams."',
    afterFix: 'Concrete outcome: "Ship Ephemeral Staging Environments on Kubernetes in Under 12 Seconds."',
    conversionLift: '+41% click-through to terminal quickstart'
  },
  {
    id: 'subhead',
    element: 'Subheadline',
    beforeFlaw: 'Empty jargon: "Empower your team to streamline workflows with intelligent orchestration."',
    afterFix: 'Architecture mechanism: "Pre-warmed Firecracker microVMs that clone your branch state on git push. Zero cold-starts, zero idle cluster cost."',
    conversionLift: 'Eliminated "What does this actually do?" bounce rate'
  },
  {
    id: 'cta',
    element: 'Primary CTA',
    beforeFlaw: '"Book an Enterprise Demo" (Immediate friction for developers who want to test the CLI first).',
    afterFix: 'Self-serve terminal command: `curl -sSL https://get.stage.sh | sh` with copy button + "No credit card required".',
    conversionLift: '3.6x increase in day-1 developer activations'
  },
  {
    id: 'social-proof',
    element: 'Proof & Metrics',
    beforeFlaw: 'Generic logo bar with no context or tangible engineering statistics.',
    afterFix: 'Hard telemetry: "Powering 140,000+ branch previews/month • P99 launch latency 8.4s • SOC-2 Type II Certified".',
    conversionLift: '+28% conversion among Staff/Principal engineers'
  }
];

export default function BeforeAfterTeardown() {
  const [viewMode, setViewMode] = useState<'before' | 'after'>('after');
  const [activePin, setActivePin] = useState<string>('headline');

  const selectedPin = STRATEGY_PINS.find(p => p.id === activePin) || STRATEGY_PINS[0];

  return (
    <div className="w-full bg-[#FDFBF7] rounded-3xl border border-[#1C1B19]/8 shadow-paper-md overflow-hidden my-8">
      {/* Top Header / Mode Switcher */}
      <div className="bg-[#FAF7F0] px-5 sm:px-6 py-4 border-b border-[#1C1B19]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-[#1C1B19] font-bold bg-[#E3DEFA] px-3 py-1 rounded-full border border-[#1C1B19]/6">
            // Interactive Audit Teardown
          </span>
          <span className="text-[#8A857D] hidden sm:inline">•</span>
          <span className="text-xs text-[#57534E] font-mono font-medium hidden sm:inline">
            Kubernetes Developer Platform
          </span>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-[#EAE5DA]/70 p-1 rounded-full border border-[#1C1B19]/6 shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('before')}
            className={`px-3.5 py-1 text-xs font-mono font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'before'
                ? 'bg-[#F7D6DE] text-[#1C1B19] shadow-sm'
                : 'text-[#57534E] hover:text-[#1C1B19]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#1C1B19]" />
            <span>Before (Weak Copy)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('after')}
            className={`px-3.5 py-1 text-xs font-mono font-bold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'after'
                ? 'bg-[#D7F0DE] text-[#1C1B19] shadow-sm'
                : 'text-[#57534E] hover:text-[#1C1B19]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1C1B19]" />
            <span>After (Converted)</span>
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="p-6 sm:p-8 bg-[#FDFBF7]">
        <AnimatePresence mode="wait">
          {viewMode === 'before' ? (
            <motion.div
              key="before-preview"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-[#F7D6DE] bg-[#F7D6DE]/20 p-6 sm:p-8 space-y-5 relative"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7D6DE] text-[#1C1B19] font-mono text-xs font-bold shadow-sm">
                <AlertTriangle className="w-3.5 h-3.5" />
                CONVERSION LEAK DETECTED (BOUNCE RATE: 78.4%)
              </div>

              <div className="space-y-3">
                <span className="text-[#8A857D] font-mono font-medium text-xs block">
                  [Vague Category Label] NEXT-GEN CLOUD PLATFORM
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B19] tracking-tight">
                  The all-in-one developer platform for modern engineering teams.
                </h3>
                <p className="text-[#57534E] text-sm sm:text-base max-w-2xl leading-relaxed font-sans font-medium">
                  Empower your developers to collaborate faster and streamline your delivery workflows with intelligent, scalable cloud orchestration built for high-growth tech companies.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button type="button" className="px-5 py-2.5 rounded-full bg-[#EAE5DA] text-[#8A857D] text-xs font-sans font-bold cursor-not-allowed">
                  Book an Enterprise Demo
                </button>
                <button type="button" className="px-5 py-2.5 rounded-full border border-[#1C1B19]/15 text-[#8A857D] text-xs font-sans font-medium cursor-not-allowed">
                  Contact Sales
                </button>
              </div>

              <div className="pt-4 border-t border-[#1C1B19]/8 text-xs font-mono text-[#8A857D]">
                Logo Bar: [Company Logo] [Company Logo] [Company Logo] (Zero engineering context)
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="after-preview"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-[#D7F0DE] bg-[#D7F0DE]/25 p-6 sm:p-8 space-y-6 relative shadow-paper-sm"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D7F0DE] text-[#1C1B19] font-mono text-xs font-bold shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                HIGH-CONVERSION REWRITE (+41% VERIFIED PIPELINE LIFT)
              </div>

              <div className="space-y-3">
                <span className="text-[#2563EB] font-mono text-xs uppercase tracking-widest block font-bold">
                  // Kubernetes Ephemeral Environments
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C1B19] tracking-tight leading-tight">
                  Ship Ephemeral Staging Environments on Kubernetes in Under 12 Seconds.
                </h3>
                <p className="text-[#3D3A36] text-sm sm:text-base max-w-2xl leading-relaxed font-sans font-medium">
                  Pre-warmed Firecracker microVMs that clone your branch state on git push. Your frontend, backend, and isolated PostgreSQL database are live before CI finishes compiling—with 0% idle cluster cost when PRs merge.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1C1B19] font-mono text-xs text-[#FDFBF7] shadow-sm">
                  <span className="text-[#EAF57A] font-bold">$</span>
                  <span>curl -sSL https://stage.sh/install | bash</span>
                </div>
                <div className="px-5 py-2.5 rounded-full bg-[#1C1B19] text-[#FDFBF7] hover:bg-[#3D3A36] text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer shadow-paper-sm hover:-translate-y-0.5 transition-all">
                  <span>Start Free (No Card)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="pt-4 border-t border-[#1C1B19]/8 flex flex-wrap items-center gap-4 text-xs font-mono text-[#57534E] font-medium">
                <span className="flex items-center gap-1 text-[#1C1B19]">
                  <Zap className="w-3.5 h-3.5 text-[#16A34A]" />
                  <strong>140,000+</strong> Previews Deployed
                </span>
                <span>•</span>
                <span>P99 Launch Latency: <strong className="text-[#16A34A]">8.4s</strong></span>
                <span>•</span>
                <span className="text-[#2563EB] font-bold">SOC-2 Type II Certified</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Strategy Pins Selector */}
        <div className="mt-8 pt-6 border-t border-[#1C1B19]/8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-sans uppercase tracking-wider text-[#1C1B19] font-bold">
              Interactive Teardown Strategy Breakdown:
            </span>
            <span className="text-xs font-mono font-bold text-[#57534E]">
              Select component to review
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {STRATEGY_PINS.map(pin => {
              const isSelected = activePin === pin.id;
              return (
                <button
                  key={pin.id}
                  type="button"
                  onClick={() => setActivePin(pin.id)}
                  className={`p-3 rounded-xl border text-left font-sans transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E3DEFA] border-[#1C1B19]/20 text-[#1C1B19] shadow-paper-sm font-bold'
                      : 'bg-[#FAF7F0] border-[#1C1B19]/6 text-[#57534E] hover:text-[#1C1B19]'
                  }`}
                >
                  <div className="text-xs font-bold text-[#1C1B19]">{pin.element}</div>
                  <div className="text-[11px] text-[#16A34A] font-mono font-semibold mt-0.5">{pin.conversionLift}</div>
                </button>
              );
            })}
          </div>

          {/* Active Detail Box */}
          <div className="rounded-2xl p-5 bg-[#FAF7F0] border border-[#1C1B19]/8 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#F7D6DE] shadow-sm">
              <div className="flex items-center gap-1.5 text-[#1C1B19] font-mono text-xs font-bold mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#BE123C]" />
                The Before Flaw
              </div>
              <p className="text-[#57534E] text-xs font-sans leading-relaxed font-medium">
                {selectedPin.beforeFlaw}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#D7F0DE] shadow-sm">
              <div className="flex items-center gap-1.5 text-[#16A34A] font-mono text-xs font-bold mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                The Copywriting Fix
              </div>
              <p className="text-[#1C1B19] text-xs font-sans leading-relaxed font-medium">
                {selectedPin.afterFix}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
