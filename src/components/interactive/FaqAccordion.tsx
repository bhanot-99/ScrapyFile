import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ShieldCheck, Code, Zap, Clock, Cpu } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  highlight?: string;
  icon: typeof ShieldCheck;
}

const FAQS: FaqItem[] = [
  {
    id: 'technical-accuracy',
    question: 'How do I know your copy will be technically accurate for kernel & AI buyers?',
    answer: 'I do not write "high-level summaries" based on marketing brochures. As an engineer who writes Rust, C++20, and builds Linux kernel sandboxes (Landlock/epoll), I clone your GitHub repository, inspect your AST/APIs, run your CLI locally, and read your unit tests. If a claim cannot be verified in code or benchmarks, it does not go on the page.',
    highlight: 'Code-first verification: every claim is anchored in runnable architecture.',
    icon: Code
  },
  {
    id: 'ai-writing-policy',
    question: 'What is your AI writing policy? Do you generate content with ChatGPT?',
    answer: 'Zero AI-generated prose. LLMs produce bland, generic developer marketing ("empower modern teams to streamline workflows") that immediately turns off cynical engineers. Every word is human-engineered, backed by real Voice-of-Customer (VoC) mining on GitHub Issues, Reddit, and Hacker News, and verified against production systems.',
    highlight: '100% human-engineered copy. No LLM boilerplate.',
    icon: ShieldCheck
  },
  {
    id: 'turnaround-time',
    question: 'What are your turnaround times for landing pages and technical whitepapers?',
    answer: 'A complete Technical Landing Page rewrite takes 10 to 14 business days (including VoC research, 2 revision rounds, and a video walkthrough). Deep-dive technical whitepapers and benchmark tutorials with runnable code take 2 to 3 weeks.',
    highlight: '10–14 days for landing pages; 2–3 weeks for code-backed deep dives.',
    icon: Clock
  },
  {
    id: 'deliverables-wireframes',
    question: 'What format do you deliver the work in? Just a Google Doc?',
    answer: 'Never a bare text document. I deliver technical landing pages as structured Figma/wireframe mockups with exact typography hierarchy, terminal frames, and line-by-line developer annotations. For technical deep dives, I deliver publication-ready MDX with tested code snippets and custom SVG architecture diagrams.',
    highlight: 'Delivered as wireframed mockups & ready-to-merge MDX code.',
    icon: Zap
  },
  {
    id: 'revision-policy',
    question: 'What happens if we need revisions or our product architecture evolves?',
    answer: 'Every engagement includes 2 comprehensive revision rounds. Because we align on the Mechanism-to-Benefit architecture matrix in Phase 1 before drafting a single headline, major directional rewrites are rarely needed.',
    highlight: '2 rigorous revision rounds included with zero hidden scope fees.',
    icon: Cpu
  }
];

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>('technical-accuracy');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full space-y-3">
      {FAQS.map(faq => {
        const isOpen = openId === faq.id;
        const Icon = faq.icon;

        return (
          <div
            key={faq.id}
            className={`sheen-card rounded-xl border transition-all ${
              isOpen ? 'border-emerald-500/40 bg-zinc-950/80 shadow-[0_0_20px_rgba(34,197,94,0.08)]' : 'border-white/10 bg-zinc-900/40'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(faq.id)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className={`p-2 rounded-lg ${isOpen ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-zinc-400'}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className="font-semibold text-sm sm:text-base text-zinc-100">
                  {faq.question}
                </span>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-emerald-400' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-white/5 mt-1 space-y-3">
                    <p>{faq.answer}</p>
                    {faq.highlight && (
                      <div className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20 inline-block">
                        ⚡ {faq.highlight}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
