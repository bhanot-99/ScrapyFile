import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ShieldCheck, Code, Zap, Clock, Cpu } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  highlight?: string;
  icon: typeof ShieldCheck;
  iconBg: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'technical-accuracy',
    question: 'How do I know your copy will be technically accurate for kernel & AI buyers?',
    answer: 'I do not write "high-level summaries" based on marketing brochures. As an engineer who writes Rust, C++20, and builds Linux kernel sandboxes (Landlock/epoll), I clone your GitHub repository, inspect your AST/APIs, run your CLI locally, and read your unit tests. If a claim cannot be verified in code or benchmarks, it does not go on the page.',
    highlight: 'Code-first verification: every claim is anchored in runnable architecture.',
    icon: Code,
    iconBg: 'bg-[#E3DEFA]'
  },
  {
    id: 'ai-writing-policy',
    question: 'What is your AI writing policy? Do you generate content with ChatGPT?',
    answer: 'Zero AI-generated prose. LLMs produce bland, generic developer marketing ("empower modern teams to streamline workflows") that immediately turns off cynical engineers. Every word is human-engineered, backed by real Voice-of-Customer (VoC) mining on GitHub Issues, Reddit, and Hacker News, and verified against production systems.',
    highlight: '100% human-engineered copy. No LLM boilerplate.',
    icon: ShieldCheck,
    iconBg: 'bg-[#D7F0DE]'
  },
  {
    id: 'turnaround-time',
    question: 'What are your turnaround times for landing pages and technical whitepapers?',
    answer: 'A complete Technical Landing Page rewrite takes 10 to 14 business days (including VoC research, 2 revision rounds, and a video walkthrough). Deep-dive technical whitepapers and benchmark tutorials with runnable code take 2 to 3 weeks.',
    highlight: '10–14 days for landing pages; 2–3 weeks for code-backed deep dives.',
    icon: Clock,
    iconBg: 'bg-[#FADEC9]'
  },
  {
    id: 'deliverables-wireframes',
    question: 'What format do you deliver the work in? Just a Google Doc?',
    answer: 'Never a bare text document. I deliver technical landing pages as structured Figma/wireframe mockups with exact typography hierarchy, terminal frames, and line-by-line developer annotations. For technical deep dives, I deliver publication-ready MDX with tested code snippets and custom SVG architecture diagrams.',
    highlight: 'Delivered as wireframed mockups & ready-to-merge MDX code.',
    icon: Zap,
    iconBg: 'bg-[#EAF57A]'
  },
  {
    id: 'revision-policy',
    question: 'What happens if we need revisions or our product architecture evolves?',
    answer: 'Every engagement includes 2 comprehensive revision rounds. Because we align on the Mechanism-to-Benefit architecture matrix in Phase 1 before drafting a single headline, major directional rewrites are rarely needed.',
    highlight: '2 rigorous revision rounds included with zero hidden scope fees.',
    icon: Cpu,
    iconBg: 'bg-[#F7D6DE]'
  }
];

export default function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>('technical-accuracy');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full space-y-3 font-sans">
      {FAQS.map(faq => {
        const isOpen = openId === faq.id;
        const Icon = faq.icon;

        return (
          <div
            key={faq.id}
            className={`rounded-2xl border transition-all ${
              isOpen
                ? 'bg-[#FDFBF7] border-[#1C1B19]/15 shadow-[0_10px_24px_rgba(28,27,25,0.06)]'
                : 'bg-[#FDFBF7]/80 border-[#1C1B19]/8 hover:border-[#1C1B19]/15 hover:shadow-[0_4px_12px_rgba(28,27,25,0.04)]'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(faq.id)}
              className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <span className={`p-2 rounded-xl text-[#1C1B19] shrink-0 border border-[#1C1B19]/10 ${faq.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className="font-bold text-sm sm:text-base text-[#1C1B19] tracking-tight">
                  {faq.question}
                </span>
              </div>

              <ChevronDown
                className={`w-5 h-5 text-[#57534E] shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#1C1B19]' : ''
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
                  <div className="px-5 pb-6 sm:px-6 pt-0 border-t border-[#1C1B19]/6 text-sm leading-relaxed text-[#57534E] space-y-3">
                    <p className="pt-3 font-sans">{faq.answer}</p>
                    {faq.highlight && (
                      <div className="p-3 rounded-xl bg-[#F4F1EA] border border-[#1C1B19]/8 text-xs font-mono font-medium text-[#1C1B19] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1C1B19]/60 shrink-0"></span>
                        <span>{faq.highlight}</span>
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