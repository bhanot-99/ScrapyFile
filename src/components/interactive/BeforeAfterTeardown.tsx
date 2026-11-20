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
    <div className="w-full bg-[#FFFDF9] rounded-sm border-[2px] border-[#111111] shadow-[6px_6px_0px_#111111] overflow-hidden my-8">
      {/* Top Header / Mode Switcher */}
      <div className="bg-[#FAF8F3] px-4 sm:px-6 py-4 border-b-[1.5px] border-[#111111] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-[#111111] font-black bg-[#FFE600] px-2 py-0.5 border border-[#111111] shadow-[1.5px_1.5px_0px_#111111]">
            // INTERACTIVE AUDIT TEARDOWN
          </span>
          <span className="text-[#8E8D88] hidden sm:inline">•</span>
          <span className="text-xs text-[#4B4A47] font-mono font-bold hidden sm:inline">
            Kubernetes Developer Platform
          </span>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-[#F3F1EC] p-1 rounded-sm border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111]">
          <button
            type="button"
            onClick={() => setViewMode('before')}
            className={`px-3 py-1 text-xs font-mono font-bold rounded-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'before'
                ? 'bg-[#FF3B30] text-white border border-[#111111] shadow-[1.5px_1.5px_0px_#111111]'
                : 'text-[#4B4A47] hover:text-[#111111]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>BEFORE (WEAK COPY)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('after')}
            className={`px-3 py-1 text-xs font-mono font-bold rounded-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'after'
                ? 'bg-[#16A34A] text-white border border-[#111111] shadow-[1.5px_1.5px_0px_#111111]'
                : 'text-[#4B4A47] hover:text-[#111111]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>AFTER (CONVERTED)</span>
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="p-6 sm:p-8 bg-[#FFFDF9]">
        <AnimatePresence mode="wait">
          {viewMode === 'before' ? (
            <motion.div
              key="before-preview"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2 }}
              className="rounded-xs border-[2px] border-dashed border-[#FF3B30] bg-[#FF3B30]/5 p-6 sm:p-8 space-y-5 relative"
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-[#FF3B30] text-white border border-[#111111] font-mono text-[11px] font-bold shadow-[2px_2px_0px_#111111]">
                <AlertTriangle className="w-3.5 h-3.5" />
                CONVERSION LEAK DETECTED (BOUNCE RATE: 78.4%)
              </div>

              <div className="space-y-3">
                <span className="text-[#8E8D88] font-mono font-bold text-xs block">
                  [Vague Category Label] NEXT-GEN CLOUD PLATFORM
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-display uppercase text-[#111111]">
                  The all-in-one developer platform for modern engineering teams.
                </h3>
                <p className="text-[#4B4A47] text-sm sm:text-base max-w-2xl leading-relaxed font-sans font-medium">
                  Empower your developers to collaborate faster and streamline your delivery workflows with intelligent, scalable cloud orchestration built for high-growth tech companies.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button type="button" className="px-5 py-2.5 rounded-xs bg-[#FAF8F3] text-[#8E8D88] text-xs font-mono font-bold border border-[#111111]/30 cursor-not-allowed">
                  Book an Enterprise Demo
                </button>
                <button type="button" className="px-5 py-2.5 rounded-xs border border-[#111111]/30 text-[#8E8D88] text-xs font-mono font-bold cursor-not-allowed">
                  Contact Sales
                </button>
              </div>

              <div className="pt-4 border-t border-[#FF3B30]/20 text-xs font-mono text-[#8E8D88]">
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
              className="rounded-xs border-[2px] border-[#111111] bg-[#FAF8F3] p-6 sm:p-8 space-y-6 relative shadow-[4px_4px_0px_#111111]"
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-[#16A34A] text-white border border-[#111111] font-mono text-[11px] font-bold shadow-[2px_2px_0px_#111111]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                HIGH-CONVERSION REWRITE (+41% VERIFIED PIPELINE LIFT)
              </div>

              <div className="space-y-3">
                <span className="text-[#2563EB] font-mono text-xs uppercase tracking-widest block font-bold">
                  // KUBERNETES EPHEMERAL ENVIRONMENTS
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display uppercase text-[#111111] tracking-tight leading-tight">
                  Ship Ephemeral Staging Environments on Kubernetes in Under 12 Seconds.
                </h3>
                <p className="text-[#3F3E3B] text-sm sm:text-base max-w-2xl leading-relaxed font-sans font-medium">
                  Pre-warmed Firecracker microVMs that clone your branch state on git push. Your frontend, backend, and isolated PostgreSQL database are live before CI finishes compiling—with 0% idle cluster cost when PRs merge.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xs bg-[#111111] border-[1.5px] border-[#111111] font-mono text-xs text-[#F3F1EC] shadow-[2px_2px_0px_#FF3B30]">
                  <span className="text-[#FFE600] font-bold">$</span>
                  <span>curl -sSL https://stage.sh/install | bash</span>
                </div>
                <div className="px-4 py-2 rounded-xs bg-[#FF3B30] text-white text-xs font-mono font-bold uppercase border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center gap-1.5 cursor-pointer hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                  <span>Start Free (No Card)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="pt-4 border-t border-[#111111]/15 flex flex-wrap items-center gap-4 text-xs font-mono text-[#4B4A47] font-bold">
                <span className="flex items-center gap-1 text-[#111111]">
                  <Zap className="w-3.5 h-3.5 text-[#FFE600]" />
                  <strong>140,000+</strong> Previews Deployed
                </span>
                <span>•</span>
                <span>P99 Launch Latency: <strong className="text-[#16A34A]">8.4s</strong></span>
                <span>•</span>
                <span className="text-[#2563EB]">SOC-2 Type II Certified</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Strategy Pins Selector */}
        <div className="mt-8 pt-6 border-t-[1.5px] border-[#111111]/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#111111] font-bold">
              Interactive Teardown Strategy Breakdown:
            </span>
            <span className="text-xs font-mono font-bold text-[#FF3B30]">
              SELECT COMPONENT TO REVIEW RATIONALE
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
                  className={`p-3 rounded-xs border-[1.5px] text-left font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFE600] border-[#111111] text-[#111111] shadow-[3px_3px_0px_#111111] font-bold'
                      : 'bg-[#FFFDF9] border-[#111111] text-[#4B4A47] hover:text-[#111111] shadow-[2px_2px_0px_#111111]'
                  }`}
                >
                  <div className="text-xs font-bold text-[#111111]">{pin.element}</div>
                  <div className="text-[10px] text-[#16A34A] font-bold mt-0.5">{pin.conversionLift}</div>
                </button>
              );
            })}
          </div>

          {/* Active Detail Box */}
          <div className="rounded-xs p-5 border-[1.5px] border-[#111111] bg-[#FAF8F3] shadow-[3px_3px_0px_#111111] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xs bg-[#FFFDF9] border-[1.5px] border-[#FF3B30] shadow-[2px_2px_0px_#FF3B30]">
              <div className="flex items-center gap-1.5 text-[#FF3B30] font-mono text-xs font-bold mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                THE BEFORE FLAW
              </div>
              <p className="text-[#111111] text-xs font-mono leading-relaxed">
                {selectedPin.beforeFlaw}
              </p>
            </div>

            <div className="p-3.5 rounded-xs bg-[#FFFDF9] border-[1.5px] border-[#16A34A] shadow-[2px_2px_0px_#16A34A]">
              <div className="flex items-center gap-1.5 text-[#16A34A] font-mono text-xs font-bold mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                THE COPYWRITING FIX
              </div>
              <p className="text-[#111111] text-xs font-mono leading-relaxed">
                {selectedPin.afterFix}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
