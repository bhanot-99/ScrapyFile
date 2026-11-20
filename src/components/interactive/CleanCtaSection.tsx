import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2, GitBranch } from 'lucide-react';

export default function CleanCtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  // Loose scraps converge toward center as visitor approaches
  const scrapLeftX = useTransform(scrollYProgress, [0.1, 0.75], [-80, 0]);
  const scrapRightX = useTransform(scrollYProgress, [0.1, 0.75], [80, 0]);
  const scrapsOpacity = useTransform(scrollYProgress, [0.1, 0.6, 0.85], [0.6, 0.3, 0]);

  // Clean sheet emergence
  const sheetScale = useTransform(scrollYProgress, [0.2, 0.8], [0.95, 1]);
  const sheetOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0.4, 1]);

  // "APPROVED FOR PRODUCTION" Stamp landing
  const stampScale = useTransform(scrollYProgress, [0.65, 0.95], [1.4, 1]);
  const stampOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const stampRotate = useTransform(scrollYProgress, [0.65, 0.95], [-8, -3.5]);

  return (
    <div
      ref={containerRef}
      id="chapter-5"
      className="relative w-full py-20 sm:py-28 my-10 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Converging Scraps (Visual metaphor: messy scraps collapsing into clean copy) */}
        <motion.div
          style={{ x: scrapLeftX, opacity: scrapsOpacity }}
          className="absolute -left-12 top-10 w-44 bg-[#E6E0D5] p-3 rounded-xl border border-[#1C1B19]/10 shadow-sm font-mono text-[10px] text-[#57534E] -rotate-6 pointer-events-none hidden lg:block"
        >
          <span>// raw_spec_draft_v1.txt</span>
          <div className="line-through">vague enterprise cloud pitch</div>
        </motion.div>

        <motion.div
          style={{ x: scrapRightX, opacity: scrapsOpacity }}
          className="absolute -right-12 bottom-12 w-44 bg-[#FAF7F0] p-3 rounded-xl border border-[#1C1B19]/10 shadow-sm font-mono text-[10px] text-[#57534E] rotate-6 pointer-events-none hidden lg:block"
        >
          <span>// hn_feedback.md</span>
          <div className="line-through">no proof provided</div>
        </motion.div>

        {/* The Clean Unified Sheet */}
        <motion.div
          style={{ scale: sheetScale, opacity: sheetOpacity }}
          className="relative bg-[#FDFBF7] rounded-3xl p-8 sm:p-14 border border-[#1C1B19]/10 shadow-paper-lg overflow-hidden space-y-6"
        >
          {/* Translucent Masking Tape Centered at Top */}
          <div className="masking-tape masking-tape-lavender -top-3"></div>

          {/* Stamped "APPROVED FOR PRODUCTION" Badge */}
          <motion.div
            style={{ scale: stampScale, opacity: stampOpacity, rotate: stampRotate }}
            className="absolute top-6 right-6 sm:top-8 sm:right-10 border-2 border-[#FF3B30] text-[#FF3B30] px-3.5 py-1.5 rounded-lg font-mono text-xs sm:text-sm font-black tracking-widest uppercase select-none shadow-xs pointer-events-none"
          >
            <span>★ APPROVED FOR PRODUCTION ★</span>
          </motion.div>

          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#D7F0DE] border border-[#1C1B19]/10 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C1B19]"></span>
              <span className="text-[11px] tracking-wide text-[#1C1B19] font-mono font-bold uppercase">
                Chapter 05 // Clean Conversion
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1C1B19] font-display leading-[1.12]">
              Ready to turn skeptical engineers into paying users?
            </h2>

            <p className="text-[#57534E] text-sm sm:text-base leading-relaxed font-sans font-medium">
              Send me your developer product URL. I will record a private, 2-minute video teardown breaking down exactly where your homepage leaks developer trust—and how an engineer would rewrite it. 100% free, no sales pitch.
            </p>

            {/* Micro-Trust Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs font-mono text-[#1C1B19]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1C1B19] shrink-0" />
                <span>Code-first verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1C1B19] shrink-0" />
                <span>Zero marketing fluff</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1C1B19] shrink-0" />
                <span>Guaranteed &lt; 24h response</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1C1B19] shrink-0" />
                <span>Private Loom walkthrough</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="/contact?teardown=true"
                className="cta-shine-btn px-7 py-3.5 rounded-full text-xs font-sans font-bold tracking-tight bg-[#1C1B19] text-[#FDFBF7] hover:bg-[#3D3A36] shadow-paper-md hover:translate-y-[-1px] transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Get a Free 2-Minute Video Teardown</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/bhanot1054"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full text-xs font-sans font-semibold bg-[#FDFBF7] border border-[#1C1B19]/12 text-[#1C1B19] hover:bg-[#F4F1EA] shadow-paper-sm transition-all inline-flex items-center gap-2"
              >
                <GitBranch className="w-4 h-4 text-[#1C1B19]" />
                <span>View Shipped Repos on GitHub</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}