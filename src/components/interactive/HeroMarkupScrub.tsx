import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function HeroMarkupScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-scrubbed transforms (reversible)
  // Strike-through red-pen line drawing (0 to 1)
  const strikeProgress = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);
  // Red pen stroke dashoffset: from 280 down to 0
  const dashOffset = useTransform(scrollYProgress, [0.05, 0.45], [280, 0]);
  // Loose scrap sliding off the desk
  const scrapX = useTransform(scrollYProgress, [0, 0.6], [0, -45]);
  const scrapY = useTransform(scrollYProgress, [0, 0.6], [0, 25]);
  const scrapRotate = useTransform(scrollYProgress, [0, 0.6], [-4, -14]);
  const scrapOpacity = useTransform(scrollYProgress, [0.4, 0.7], [1, 0.15]);

  return (
    <div ref={containerRef} className="relative w-full my-6 select-none">
      {/* Drifting Loose Spec Scrap Paper (Slides off on scroll) */}
      <motion.div
        style={{ x: scrapX, y: scrapY, rotate: scrapRotate, opacity: scrapOpacity }}
        className="absolute -top-6 -right-3 sm:-right-8 z-20 w-44 sm:w-56 bg-[#FDFBF7] p-3 rounded-xl border border-[#1C1B19]/12 shadow-paper-sm text-[11px] font-mono pointer-events-none hidden sm:block"
      >
        <div className="masking-tape masking-tape-peach -top-2 left-1/2 -translate-x-1/2 scale-75"></div>
        <span className="text-[#8A857D] uppercase text-[9px] block mb-1 font-semibold">// Raw Pitch Draft #1</span>
        <div className="text-[#57534E] line-through decoration-[#FF3B30] decoration-2">
          "The all-in-one AI platform..."
        </div>
        <div className="text-[10px] text-[#FF3B30] font-bold mt-1 font-sans">
          ✕ Vague buzzword (rejected)
        </div>
      </motion.div>

      {/* The Messy Raw Spec Paper Card */}
      <div className="relative bg-[#FAF7F0] rounded-2xl p-4 sm:p-5 border border-[#1C1B19]/10 shadow-paper-sm font-mono text-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1C1B19]/8 text-[#57534E] text-[11px]">
          <span className="flex items-center gap-1.5 font-bold text-[#1C1B19]">
            <span className="w-2 h-2 rounded-full bg-[#FF3B30]"></span>
            <span>SPEC AUDIT // VAGUE COPY IDENTIFIED</span>
          </span>
          <span className="text-[10px] text-[#8A857D]">Scroll to deconstruct ↓</span>
        </div>

        {/* Text with scroll-scrubbed red-pen strikethrough SVG */}
        <div className="relative py-2 px-1 text-xs sm:text-sm text-[#57534E] leading-relaxed font-sans">
          <p className="relative inline">
            <span className="relative z-10">
              "Our seamless, intelligent orchestration platform empowers modern engineering teams to streamline workflows..."
            </span>

            {/* Red Ink SVG Strike-through Lines (Scrubbed by scroll) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
              viewBox="0 0 460 48"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Strike line 1 */}
              <motion.path
                d="M4 12C90 10 260 14 450 11"
                stroke="#FF3B30"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeDasharray="460"
                style={{ strokeDashoffset: dashOffset }}
              />
              {/* Strike line 2 */}
              <motion.path
                d="M6 34C110 32 300 36 440 33"
                stroke="#FF3B30"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeDasharray="460"
                style={{ strokeDashoffset: dashOffset }}
              />
            </svg>
          </p>
        </div>

        {/* Handwritten Red Pen Annotation (Appears as you scroll) */}
        <motion.div
          style={{ opacity: strikeProgress, scale: strikeProgress }}
          className="mt-2.5 pt-2 border-t border-[#FF3B30]/20 flex items-center justify-between text-[11px] text-[#FF3B30] font-sans font-bold"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-sm">↳</span>
            <span>Engineers bounce in 5 seconds. What binary? What syscalls? Prove it.</span>
          </span>
          <span className="font-mono text-[10px] bg-[#FF3B30]/10 px-2 py-0.5 rounded-full uppercase">
            Cynicism Triggered
          </span>
        </motion.div>
      </div>
    </div>
  );
}