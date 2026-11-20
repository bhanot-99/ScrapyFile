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
      {/* Filter Pills as Editorial Stamps */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b-[2px] border-[#111111]">
        {CATEGORIES.map(category => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3.5 py-1.5 rounded-xs text-xs font-mono font-bold uppercase transition-all cursor-pointer border-[1.5px] ${
                isActive
                  ? 'bg-[#FFE600] text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111]'
                  : 'bg-[#FFFDF9] text-[#4B4A47] hover:text-[#111111] border-[#111111] shadow-[1.5px_1.5px_0px_#111111]'
              }`}
            >
              {category.label}
              {category.id !== 'all' && (
                <span className="ml-1.5 text-[10px] text-[#FF3B30] font-black">
                  ({items.filter(i => i.category === category.id).length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid of Work Index Cards */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredItems.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.article
                layout
                key={item.slug}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className={`relative bg-[#FFFDF9] rounded-sm p-6 sm:p-7 flex flex-col justify-between border-[2px] border-[#111111] shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#111111] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all group ${
                  isLeft ? 'tilt-left' : 'tilt-right'
                }`}
              >
                {/* Washi tape at top */}
                <div className={`washi-tape ${idx % 3 === 0 ? 'washi-tape-yellow' : idx % 3 === 1 ? 'washi-tape-red' : 'washi-tape-blue'}`}></div>

                <div className="space-y-4">
                  {/* Header row: deliverable type + read time */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-xs bg-[#111111] text-[#FFE600] border border-[#111111] uppercase tracking-wider shadow-[1.5px_1.5px_0px_#FF3B30]">
                      {item.deliverableType}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#4B4A47]">
                      {item.readTime}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase font-display tracking-tight text-[#111111] group-hover:text-[#FF3B30] transition-colors flex items-start justify-between gap-2 leading-tight">
                      <span>{item.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-[#111111] group-hover:text-[#FF3B30] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                    </h3>
                    <p className="text-[#3F3E3B] text-xs sm:text-sm mt-2 leading-relaxed font-sans font-medium">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Target Buyer Persona */}
                  <div className="text-[11px] font-mono text-[#111111] bg-[#FAF8F3] p-2.5 rounded-xs border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111]">
                    <span className="text-[#8E8D88] uppercase font-bold">Target Buyer: </span>
                    <span className="text-[#111111] font-bold">{item.targetBuyer}</span>
                  </div>

                  {/* Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                    {item.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="bg-white p-2 rounded-xs border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111]">
                        <div className="text-[10px] text-[#8E8D88] uppercase font-bold">{m.label}</div>
                        <div className="text-[#16A34A] font-black font-display text-sm mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Tech Stack & Link */}
                <div className="pt-6 mt-4 border-t-[1.5px] border-[#111111]/20 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {item.stack.slice(0, 3).map((tech, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs bg-[#FAF8F3] text-[#111111] border border-[#111111]">
                        {tech}
                      </span>
                    ))}
                    {item.stack.length > 3 && (
                      <span className="text-[10px] font-mono font-bold text-[#8E8D88] px-1 py-0.5">
                        +{item.stack.length - 3}
                      </span>
                    )}
                  </div>

                  <a
                    href={`/work/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-black text-[#111111] hover:text-[#FF3B30] uppercase tracking-wider underline decoration-2 decoration-[#111111]"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF3B30]" />
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
