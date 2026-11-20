import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function PinnedTeardown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Strikethrough progress for 3 raw items
  // Item 1: Struck through from 0.10 to 0.30
  const strike1Progress = useTransform(scrollYProgress, [0.10, 0.28], [0, 1]);
  // Item 2: Struck through from 0.32 to 0.50
  const strike2Progress = useTransform(scrollYProgress, [0.32, 0.48], [0, 1]);
  // Item 3: Struck through from 0.52 to 0.70
  const strike3Progress = useTransform(scrollYProgress, [0.52, 0.68], [0, 1]);

  // Clean Copy word assembly & opacity
  const cleanBadgeOpacity = useTransform(scrollYProgress, [0.25, 0.40], [0.2, 1]);
  const cleanBadgeY = useTransform(scrollYProgress, [0.25, 0.40], [10, 0]);

  const cleanHeadlineOpacity = useTransform(scrollYProgress, [0.40, 0.65], [0.15, 1]);
  const cleanHeadlineY = useTransform(scrollYProgress, [0.40, 0.65], [15, 0]);

  const cleanSubheadOpacity = useTransform(scrollYProgress, [0.65, 0.88], [0, 1]);
  const cleanSubheadY = useTransform(scrollYProgress, [0.65, 0.88], [15, 0]);

  const proofBarOpacity = useTransform(scrollYProgress, [0.80, 0.98], [0, 1]);

  return (
    <div
      ref={containerRef}
      id="chapter-2"
      className="relative w-full lg:min-h-[220vh] py-12 lg:py-0"
    >
      {/* Sticky Viewport Container on Desktop (normal on mobile) */}
      <div className="lg:sticky lg:top-24 max-w-6xl mx-auto px-4 sm:px-6 w-full py-6">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FADEC9] rounded-full border border-[#1C1B19]/10 text-[#1C1B19] font-mono text-xs font-bold uppercase mb-2">
            <span>Chapter 02 // Live Scroll Teardown</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1C1B19] font-display">
            The Transformation: Raw Objections &rarr; Verifiable Copy
          </h2>
          <p className="text-sm text-[#57534E] font-sans max-w-2xl mt-1">
            Scroll down to watch cynical developer objections and raw kernel mechanics get struck through and rewritten into proof-backed conversion messaging.
          </p>
        </div>

        {/* 2-Column Side-by-Side Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Raw Cynical Specs & Objections */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1C1B19]/8 text-xs font-mono font-bold text-[#1C1B19]">
              <span className="flex items-center gap-1.5 text-[#FF3B30]">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>RAW SPEC & DEVELOPER CYNICISM</span>
              </span>
              <span className="text-[10px] text-[#57534E] hidden sm:inline">Scrubbed by scroll</span>
            </div>

            {/* Raw Item 1: Cynical HN Quote */}
            <div className="relative bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#1C1B19]/10 shadow-paper-sm font-sans text-xs">
              <span className="text-[10px] font-mono font-bold text-[#8A857D] uppercase block mb-1">
                // Hacker News Objection #1:
              </span>
              <div className="relative text-sm text-[#1C1B19] font-medium leading-relaxed">
                <span className="relative z-10">
                  "Every single daemon that claims 'zero overhead' ends up burning 4% CPU just polling file descriptors in the background."
                </span>
                {/* Red Strike SVG */}
                <motion.div
                  style={{ scaleX: strike1Progress }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2.5px] bg-[#FF3B30] origin-left rounded-full z-20 pointer-events-none"
                />
              </div>
              <motion.div
                style={{ opacity: strike1Progress }}
                className="mt-2 text-[11px] font-mono text-[#FF3B30] font-bold"
              >
                ✕ Solved: Replaced polling with kernel epoll_wait (0.00% CPU on idle).
              </motion.div>
            </div>

            {/* Raw Item 2: Unoptimized Bash / Polling Loop */}
            <div className="relative bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#1C1B19]/10 shadow-paper-sm font-mono text-xs">
              <span className="text-[10px] font-mono font-bold text-[#8A857D] uppercase block mb-1">
                // Naive Mechanism (Vulnerable to PID Reuse):
              </span>
              <div className="relative text-xs text-[#57534E] leading-relaxed bg-[#F4F1EA] p-3 rounded-xl">
                <span className="relative z-10 block whitespace-pre-wrap">
{`while true; do
  scan_proc_for_subshells() # Wakes CPU every 100ms
  sleep 0.1
done`}
                </span>
                {/* Red Strike SVG */}
                <motion.div
                  style={{ scaleX: strike2Progress }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2.5px] bg-[#FF3B30] origin-left rounded-full z-20 pointer-events-none"
                />
              </div>
              <motion.div
                style={{ opacity: strike2Progress }}
                className="mt-2 text-[11px] font-mono text-[#FF3B30] font-bold"
              >
                ✕ Solved: Inotify event queue multiplexed in kernel space.
              </motion.div>
            </div>

            {/* Raw Item 3: Generic Corporate Pitch */}
            <div className="relative bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#1C1B19]/10 shadow-paper-sm font-sans text-xs">
              <span className="text-[10px] font-mono font-bold text-[#8A857D] uppercase block mb-1">
                // Original Vague Headline:
              </span>
              <div className="relative text-sm text-[#57534E] leading-relaxed">
                <span className="relative z-10">
                  "The modern observability platform that empowers engineering teams with intelligent insight."
                </span>
                {/* Red Strike SVG */}
                <motion.div
                  style={{ scaleX: strike3Progress }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2.5px] bg-[#FF3B30] origin-left rounded-full z-20 pointer-events-none"
                />
              </div>
              <motion.div
                style={{ opacity: strike3Progress }}
                className="mt-2 text-[11px] font-mono text-[#FF3B30] font-bold"
              >
                ✕ Solved: Zero buzzwords. State the exact binary and syscall constraint.
              </motion.div>
            </div>

          </div>

          {/* RIGHT COLUMN: Assembled Clean Conversion Copy */}
          <div className="lg:col-span-6 bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-[#1C1B19]/10 shadow-paper-md relative space-y-6">
            <div className="masking-tape masking-tape-lavender -top-3"></div>

            <div className="flex items-center justify-between pb-2 border-b border-[#1C1B19]/8 text-xs font-mono font-bold text-[#1C1B19]">
              <span className="flex items-center gap-1.5 text-[#16A34A]">
                <ShieldCheck className="w-4 h-4 text-[#1C1B19]" />
                <span>ASSEMBLED CONVERSION COPY</span>
              </span>
              <span className="text-[10px] text-[#57534E] bg-[#D7F0DE] px-2 py-0.5 rounded-full">
                Peer Credibility
              </span>
            </div>

            {/* Badge */}
            <motion.div
              style={{ opacity: cleanBadgeOpacity, y: cleanBadgeY }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#E3DEFA] text-[#1C1B19] border border-[#1C1B19]/10"
            >
              <span>Zero-Privilege Linux Telemetry</span>
            </motion.div>

            {/* Headline */}
            <motion.h3
              style={{ opacity: cleanHeadlineOpacity, y: cleanHeadlineY }}
              className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight text-[#1C1B19] leading-tight"
            >
              Monitor Autonomous Coding Agents in Real Time—Without Draining a Single Core.
            </motion.h3>

            {/* Subheadline */}
            <motion.p
              style={{ opacity: cleanSubheadOpacity, y: cleanSubheadY }}
              className="text-[#57534E] text-xs sm:text-sm leading-relaxed font-sans"
            >
              Zero-overhead Linux kernel observability that tracks transient bash spawns, hidden socket connects, and runaway file writes before PID reuse masks them. Idle CPU stays flat at 0.00%.
            </motion.p>

            {/* Proof Telemetry Bar */}
            <motion.div
              style={{ opacity: proofBarOpacity }}
              className="pt-4 border-t border-[#1C1B19]/8 space-y-3 font-mono text-xs"
            >
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#FAF7F0] border border-[#1C1B19]/10 font-bold text-[#1C1B19]">
                  0.00% CPU on idle
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#FAF7F0] border border-[#1C1B19]/10 font-bold text-[#1C1B19]">
                  4.2MB RSS
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#FAF7F0] border border-[#1C1B19]/10 font-bold text-[#1C1B19]">
                  0 Root Required
                </span>
              </div>
              <div className="text-[10px] text-[#8A857D] italic">
                How measured: Process state verified via Linux /proc/[pid]/stat on idle wait.
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </div>
  );
}