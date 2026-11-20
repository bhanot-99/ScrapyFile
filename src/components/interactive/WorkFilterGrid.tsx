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
      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-white/5">
        {CATEGORIES.map(category => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-medium shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-white/5 hover:border-white/10'
              }`}
            >
              {category.label}
              {category.id !== 'all' && (
                <span className="ml-1.5 text-[10px] text-zinc-500">
                  ({items.filter(i => i.category === category.id).length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Grid of Work Cards */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredItems.map(item => (
            <motion.article
              layout
              key={item.slug}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="sheen-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between group hover:border-emerald-500/40 transition-all border border-white/10 relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Header row: deliverable type + read time */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                    {item.deliverableType}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {item.readTime}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors flex items-start justify-between gap-2">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                {/* Target Buyer Persona */}
                <div className="text-[11px] font-mono text-zinc-400 bg-zinc-950/60 p-2.5 rounded-lg border border-white/5">
                  <span className="text-zinc-500">Target Buyer: </span>
                  <span className="text-zinc-300 font-medium">{item.targetBuyer}</span>
                </div>

                {/* Metrics Bar */}
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                  {item.metrics.map((m, idx) => (
                    <div key={idx} className="bg-zinc-900/40 p-2 rounded border border-white/5">
                      <div className="text-[10px] text-zinc-500 uppercase">{m.label}</div>
                      <div className="text-emerald-400 font-bold text-xs mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer: Tech Stack & Link */}
              <div className="pt-6 mt-4 border-t border-white/8 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {item.stack.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-white/5">
                      {tech}
                    </span>
                  ))}
                  {item.stack.length > 3 && (
                    <span className="text-[10px] font-mono text-zinc-600 px-1 py-0.5">
                      +{item.stack.length - 3}
                    </span>
                  )}
                </div>

                <a
                  href={`/work/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>Read Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
