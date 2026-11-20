import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Search, Layers, Send, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    phase: '70% OF THE WORK',
    phaseBg: 'bg-[#F7D6DE]',
    title: 'Code Teardown & VoC Mining',
    icon: Search,
    description: 'I clone your repository, run your CLI locally, inspect your AST and syscalls, and mine genuine developer objections across Hacker News, GitHub Issues, and Reddit.',
    bullets: [
      'GitHub repository & AST inspection',
      'Cynical developer objection mining',
      'Competitor architectural positioning gap audit'
    ]
  },
  {
    num: '02',
    phase: 'ARCHITECTURE PHASE',
    phaseBg: 'bg-[#FADEC9]',
    title: 'Mechanism-to-Benefit Translation',
    icon: Layers,
    description: 'We map each low-level engineering mechanism (e.g. Landlock LSM, epoll_wait multiplexing, addition-only ternary kernels) directly into verifiable commercial value.',
    bullets: [
      '2-Column Mechanism-to-Benefit Matrix',
      'Proof-anchored positioning drafts',
      'Reproducible benchmark verification'
    ]
  },
  {
    num: '03',
    phase: 'DELIVERY & LAUNCH',
    phaseBg: 'bg-[#E3DEFA]',
    title: 'Wireframed Mockup & Video Rationale',
    icon: Send,
    description: 'No bare docs. You receive publication-ready Figma wireframes or runnable MDX components, complete with a video walkthrough explaining the developer psychology.',
    bullets: [
      'Structured wireframe hierarchy with terminal snippets',
      'Loom video walkthrough detailing conversion choices',
      '2 comprehensive revision rounds included'
    ]
  }
];

export default function PinnedPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Ink bar fill progress via GPU-composited scaleX (0 to 0.7 to 1.0)
  const inkScaleX = useTransform(scrollYProgress, [0, 0.65, 1], [0, 0.7, 1]);

  // Step 1 card animation
  const card1Y = useTransform(scrollYProgress, [0, 0.25], [40, 0]);
  const card1Opacity = useTransform(scrollYProgress, [0, 0.20], [0.4, 1]);

  // Step 2 card animation
  const card2Y = useTransform(scrollYProgress, [0.28, 0.60], [60, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.28, 0.55], [0.2, 1]);

  // Step 3 card animation
  const card3Y = useTransform(scrollYProgress, [0.62, 0.95], [60, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.62, 0.90], [0.2, 1]);

  return (
    <div
      ref={containerRef}
      id="chapter-4"
      className="relative w-full lg:min-h-[220vh] py-12 lg:py-0"
    >
      {/* Sticky Viewport Container on Desktop (normal on mobile) */}
      <div className="lg:sticky lg:top-24 max-w-6xl mx-auto px-4 sm:px-6 w-full py-6">
        
        {/* Section Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F1EA] rounded-full border border-[#1C1B19]/10 text-[#1C1B19] font-mono text-xs font-bold uppercase mb-2">
            <span>Chapter 04 // Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1C1B19] font-display">
            The 70/30 Research-First Pipeline
          </h2>
          <p className="text-sm text-[#57534E] font-sans max-w-2xl mt-1">
            70% of high-converting technical copy is determined before opening an editor. We deconstruct code, extract developer objections, and anchor claims in runnable architecture.
          </p>
        </div>

        {/* Dynamic 70/30 Ink Progress Bar */}
        <div className="mb-8 p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#1C1B19]/10 shadow-paper-sm">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#1C1B19] mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B30]"></span>
              <span>70% Research & Code Deconstruction</span>
            </span>
            <span className="text-[#57534E]">30% Copy & Delivery</span>
          </div>

          <div className="w-full bg-[#F4F1EA] h-3.5 rounded-full overflow-hidden border border-[#1C1B19]/10 p-0.5 relative">
            {/* 70% marker notch */}
            <div className="absolute left-[70%] top-0 bottom-0 w-[1.5px] bg-[#1C1B19]/30 z-20"></div>

            {/* Filling Ink Bar (GPU transform: scaleX, zero layout trigger) */}
            <motion.div
              style={{ scaleX: inkScaleX, transformOrigin: 'left' }}
              className="bg-[#1C1B19] h-full w-full rounded-full"
            />
          </div>
        </div>

        {/* 3 Step Cards Pulling Out of Folder in Turn */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Step 1 Card */}
          <motion.div
            style={{ y: card1Y, opacity: card1Opacity }}
            className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-7 border border-[#1C1B19]/10 shadow-paper-md space-y-4 relative paper-fold flex flex-col justify-between"
          >
            <div className="masking-tape masking-tape-rose -top-3"></div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold font-sans text-[#1C1B19]">{STEPS[0].num}</span>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-[#1C1B19]/10 text-[#1C1B19] ${STEPS[0].phaseBg}`}>
                  {STEPS[0].phase}
                </span>
              </div>
              <h3 className="text-lg font-bold font-sans tracking-tight text-[#1C1B19]">
                {STEPS[0].title}
              </h3>
              <p className="text-[#57534E] text-xs leading-relaxed font-sans">
                {STEPS[0].description}
              </p>
            </div>
            <div className="pt-3 border-t border-[#1C1B19]/8 space-y-1.5 text-xs font-mono text-[#57534E]">
              {STEPS[0].bullets.map(b => (
                <div key={b} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1C1B19] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step 2 Card */}
          <motion.div
            style={{ y: card2Y, opacity: card2Opacity }}
            className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-7 border border-[#1C1B19]/10 shadow-paper-md space-y-4 relative paper-fold flex flex-col justify-between"
          >
            <div className="masking-tape masking-tape-peach -top-3"></div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold font-sans text-[#1C1B19]">{STEPS[1].num}</span>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-[#1C1B19]/10 text-[#1C1B19] ${STEPS[1].phaseBg}`}>
                  {STEPS[1].phase}
                </span>
              </div>
              <h3 className="text-lg font-bold font-sans tracking-tight text-[#1C1B19]">
                {STEPS[1].title}
              </h3>
              <p className="text-[#57534E] text-xs leading-relaxed font-sans">
                {STEPS[1].description}
              </p>
            </div>
            <div className="pt-3 border-t border-[#1C1B19]/8 space-y-1.5 text-xs font-mono text-[#57534E]">
              {STEPS[1].bullets.map(b => (
                <div key={b} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1C1B19] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step 3 Card */}
          <motion.div
            style={{ y: card3Y, opacity: card3Opacity }}
            className="bg-[#FDFBF7] rounded-3xl p-6 sm:p-7 border border-[#1C1B19]/10 shadow-paper-md space-y-4 relative paper-fold flex flex-col justify-between"
          >
            <div className="masking-tape masking-tape-lavender -top-3"></div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold font-sans text-[#1C1B19]">{STEPS[2].num}</span>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-[#1C1B19]/10 text-[#1C1B19] ${STEPS[2].phaseBg}`}>
                  {STEPS[2].phase}
                </span>
              </div>
              <h3 className="text-lg font-bold font-sans tracking-tight text-[#1C1B19]">
                {STEPS[2].title}
              </h3>
              <p className="text-[#57534E] text-xs leading-relaxed font-sans">
                {STEPS[2].description}
              </p>
            </div>
            <div className="pt-3 border-t border-[#1C1B19]/8 space-y-1.5 text-xs font-mono text-[#57534E]">
              {STEPS[2].bullets.map(b => (
                <div key={b} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1C1B19] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}