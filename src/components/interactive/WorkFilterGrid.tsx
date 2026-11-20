import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export interface WorkItem {
  slug: string;
  title: string;
  tagline: string;
  category: 'conversion-copy' | 'systems-deep-dive' | 'launches-whitepapers';
  categoryLabel: string;
  deliverableType: string;
  targetBuyer: string;
  stack: string[];
  readTime: string;
  metrics: { label: string; value: string }[];
  featured?: boolean;
}

interface Props {
  items: WorkItem[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Artifacts' },
  { id: 'conversion-copy', label: 'Conversion Copy' },
  { id: 'systems-deep-dive', label: 'Systems Deep-Dives' },
  { id: 'launches-whitepapers', label: 'Launches & Whitepapers' },
];

export default function WorkFilterGrid({ items }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = selectedCategory === 'all'
    ? items
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="w-full space-y-8">
      {/* Filter Pills as Soft Rounded Buttons */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#1C1B19]/8">
        {CATEGORIES.map(category => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#E3DEFA] text-[#1C1B19] border-[#1C1B19]/15 shadow-sm font-bold'
                  : 'bg-[#FDFBF7] text-[#57534E] hover:text-[#1C1B19] border-[#1C1B19]/8'
              }`}
            >
              {category.label}
              {category.id !== 'all' && (
                <span className="ml-1.5 text-[11px] text-[#57534E]">
                  ({items.filter(i => i.category === category.id).length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid of Work Index Cards */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <AnimatePresence>
          {filteredItems.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const tapeColorClass = idx % 3 === 0 ? 'masking-tape-lavender' : idx % 3 === 1 ? 'masking-tape-peach' : 'masking-tape-rose';
            return (
              <motion.article
                layout
                key={item.slug}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className={`relative bg-[#FDFBF7] rounded-3xl p-7 sm:p-8 flex flex-col justify-between border border-[#1C1B19]/8 shadow-paper-md hover:shadow-paper-lg transition-all group ${
                  isLeft ? 'tilt-gentle-left' : 'tilt-gentle-right'
                }`}
              >
                {/* Masking Tape */}
                <div className={`masking-tape ${tapeColorClass}`}></div>

                <div className="space-y-4">
                  {/* Header row: deliverable type + read time */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#FAF7F0] text-[#1C1B19] border border-[#1C1B19]/8 shadow-sm">
                      {item.deliverableType}
                    </span>
                    <span className="text-xs font-mono font-medium text-[#57534E]">
                      {item.readTime}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1C1B19] group-hover:text-[#57534E] transition-colors flex items-start justify-between gap-2 leading-snug">
                      <span>{item.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-[#1C1B19] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                    </h3>
                    <p className="text-[#57534E] text-xs sm:text-sm mt-2 leading-relaxed font-sans font-medium">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Target Buyer Persona */}
                  <div className="text-xs font-mono text-[#1C1B19] bg-[#FAF7F0] p-3 rounded-xl border border-[#1C1B19]/6 shadow-sm">
                    <span className="text-[#8A857D] uppercase font-semibold text-[10px]">Target Buyer: </span>
                    <span className="text-[#1C1B19] font-bold">{item.targetBuyer}</span>
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                    {item.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="bg-white p-2.5 rounded-xl border border-[#1C1B19]/8 shadow-sm">
                        <div className="text-[10px] text-[#8A857D] uppercase font-semibold">{m.label}</div>
                        <div className="text-[#16A34A] font-extrabold text-sm mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Tech Stack & Link */}
                <div className="pt-6 mt-4 border-t border-[#1C1B19]/8 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.stack.slice(0, 3).map((tech, sIdx) => (
                      <span key={sIdx} className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#FAF7F0] text-[#57534E] border border-[#1C1B19]/6">
                        {tech}
                      </span>
                    ))}
                    {item.stack.length > 3 && (
                      <span className="text-xs font-mono text-[#8A857D] px-1 py-0.5">
                        +{item.stack.length - 3}
                      </span>
                    )}
                  </div>

                  <a
                    href={`/work/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#1C1B19] hover:text-[#57534E] underline decoration-2 decoration-[#E3DEFA]"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
