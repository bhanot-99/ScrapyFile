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
    <div className="w-full sheen-card rounded-xl overflow-hidden border border-white/10 my-8">
      {/* Top Header / Mode Switcher */}
      <div className="bg-[#0b0d0e] px-4 sm:px-6 py-4 border-b border-white/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-medium">
            // INTERACTIVE AUDIT TEARDOWN
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
            Kubernetes Developer Platform
          </span>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-white/10">
          <button
            type="button"
            onClick={() => setViewMode('before')}
            className={`px-3 py-1 text-xs font-mono rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'before'
                ? 'bg-red-500/15 text-red-400 border border-red-500/30 font-medium'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-red-400" />
            <span>BEFORE (WEAK / FLUFFY)</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('after')}
            className={`px-3 py-1 text-xs font-mono rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'after'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>AFTER (CONVERSION REWRITE)</span>
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="p-6 sm:p-8 bg-[#0d0f11]">
        <AnimatePresence mode="wait">
          {viewMode === 'before' ? (
            <motion.div
              key="before-preview"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-red-500/30 bg-red-950/10 p-6 sm:p-8 space-y-5 relative"
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30 font-mono text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5" />
                CONVERSION LEAK DETECTED (BOUNCE RATE: 78.4%)
              </div>

              <div className="space-y-3">
                <span className="text-zinc-500 font-mono text-xs block">
                  [Vague Category Label] NEXT-GEN CLOUD PLATFORM
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-300">
                  The all-in-one developer platform for modern engineering teams.
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Empower your developers to collaborate faster and streamline your delivery workflows with intelligent, scalable cloud orchestration built for high-growth tech companies.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button type="button" className="px-5 py-2.5 rounded-lg bg-zinc-700 text-zinc-300 text-xs font-mono font-medium cursor-not-allowed">
                  Book an Enterprise Demo
                </button>
                <button type="button" className="px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-400 text-xs font-mono cursor-not-allowed">
                  Contact Sales
                </button>
              </div>

              <div className="pt-4 border-t border-red-500/10 text-xs font-mono text-zinc-500">
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
              className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-[#111613] to-[#0c0f0d] p-6 sm:p-8 space-y-6 relative shadow-[0_0_30px_rgba(34,197,94,0.06)]"
            >
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                HIGH-CONVERSION REWRITE (+41% VERIFIED PIPELINE LIFT)
              </div>

              <div className="space-y-3">
                <span className="text-emerald-400/90 font-mono text-xs uppercase tracking-widest block font-medium">
                  // KUBERNETES EPHEMERAL ENVIRONMENTS
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Ship Ephemeral Staging Environments on Kubernetes in Under 12 Seconds.
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Pre-warmed Firecracker microVMs that clone your branch state on git push. Your frontend, backend, and isolated PostgreSQL database are live before CI finishes compiling—with 0% idle cluster cost when PRs merge.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black border border-emerald-500/40 font-mono text-xs text-zinc-200">
                  <span className="text-emerald-400">$</span>
                  <span>curl -sSL https://stage.sh/install | bash</span>
                </div>
                <div className="px-4 py-2 rounded-lg bg-emerald-500 text-black text-xs font-mono font-medium glow-tactical flex items-center gap-1.5 cursor-pointer">
                  <span>Start Free (No Card)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="pt-4 border-t border-white/8 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1 text-zinc-300">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <strong>140,000+</strong> Previews Deployed
                </span>
                <span>•</span>
                <span>P99 Launch Latency: <strong>8.4s</strong></span>
                <span>•</span>
                <span className="text-emerald-400">SOC-2 Type II Certified</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Strategy Pins Selector */}
        <div className="mt-8 pt-6 border-t border-white/8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Interactive Teardown Strategy Breakdown:
            </span>
            <span className="text-xs font-mono text-emerald-400">
              Select component to review rationale
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
                  className={`p-3 rounded-lg border text-left font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(34,197,94,0.12)]'
                      : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="text-xs font-semibold text-zinc-200">{pin.element}</div>
                  <div className="text-[10px] text-emerald-400/90 mt-0.5">{pin.conversionLift}</div>
                </button>
              );
            })}
          </div>

          {/* Active Detail Box */}
          <div className="sheen-card rounded-xl p-5 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-500/20">
              <div className="flex items-center gap-1.5 text-red-400 font-mono text-xs font-semibold mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                THE BEFORE FLAW
              </div>
              <p className="text-zinc-300 text-xs font-mono leading-relaxed">
                {selectedPin.beforeFlaw}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-semibold mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                THE COPYWRITING FIX
              </div>
              <p className="text-zinc-200 text-xs font-mono leading-relaxed">
                {selectedPin.afterFix}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
