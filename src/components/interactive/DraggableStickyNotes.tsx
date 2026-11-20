import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface StickyNoteData {
  id: string;
  title: string;
  label: string;
  badge: string;
  color: string;
  borderColor: string;
  initialX: number;
  initialY: number;
  initialRotate: number;
  whyItWorks: string;
  badAlternative: string;
}

const NOTES: StickyNoteData[] = [
  {
    id: 'note-1',
    title: 'Why "Zero Root Needed" Beats "Enterprise Security"',
    label: 'Sticky Note #1',
    badge: 'Permission Friction',
    color: 'bg-[#E3DEFA]', // Lavender
    borderColor: 'border-[#1C1B19]/12',
    initialX: 0,
    initialY: 0,
    initialRotate: -2,
    badAlternative: '"Enterprise-grade, bank-level security for your distributed workloads."',
    whyItWorks: 'Engineers immediately skip "enterprise security" because it sounds like marketing puffery. Stating "Zero root required / runs unprivileged" gives an exact technical guarantee: their sudoers file is safe and security compliance won\'t reject the PR.'
  },
  {
    id: 'note-2',
    title: 'Why "Microsecond Subshells" Beats "Full Observability"',
    label: 'Sticky Note #2',
    badge: 'Pain Point Specificity',
    color: 'bg-[#FADEC9]', // Peach
    borderColor: 'border-[#1C1B19]/12',
    initialX: 0,
    initialY: 0,
    initialRotate: 1.5,
    badAlternative: '"Complete visibility and observability across your entire agent pipeline."',
    whyItWorks: 'Every AI engineer running agent loops knows the real bug: agents fire 50 rapid `bash -c` commands that exit in 15ms before auditd or polling can sample /proc. Calling out the microsecond subshell proves you built with their actual headache in mind.'
  },
  {
    id: 'note-3',
    title: 'Why "epoll_wait sleep" Beats "Lightweight"',
    label: 'Sticky Note #3',
    badge: 'Proof Mechanism',
    color: 'bg-[#EAF57A]', // Lime
    borderColor: 'border-[#1C1B19]/12',
    initialX: 0,
    initialY: 0,
    initialRotate: -1,
    badAlternative: '"Ultra-lightweight agent daemon with tiny performance impact."',
    whyItWorks: '"Lightweight" is an empty claim that every slow Electron app also uses. Naming the kernel mechanism (`epoll_wait(-1)` sleeping in kernel space until inotify triggers) demonstrates zero CPU spin before they even read the benchmark.'
  }
];

export default function DraggableStickyNotes() {
  const [expandedNote, setExpandedNote] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedNote(prev => prev === id ? null : id);
  };

  return (
    <div className="w-full my-12 relative">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#8A857D] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#1C1B19]" />
            <span>Interactive Editorial Notes // Drag or Click</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-[#1C1B19] tracking-tight mt-0.5">
            The Psychology Behind Technical Copy Decisions
          </h3>
        </div>
        <div className="text-[11px] font-mono text-[#8A857D] bg-[#FDFBF7] px-3 py-1.5 rounded-full border border-[#1C1B19]/8 self-start sm:self-auto">
          Tip: Grab & drag with mouse • Press Enter to toggle
        </div>
      </div>

      {/* Sticky Notes Grid / Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
        {NOTES.map((note) => {
          const isExpanded = expandedNote === note.id;

          return (
            <motion.div
              key={note.id}
              drag
              dragConstraints={{ left: -30, right: 30, top: -20, bottom: 20 }}
              dragElastic={0.25}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              whileDrag={{ scale: 1.03, zIndex: 40, cursor: 'grabbing' }}
              initial={{ rotate: note.initialRotate }}
              whileHover={{ rotate: 0, y: -4 }}
              className={`relative ${note.color} ${note.borderColor} rounded-2xl p-5 border shadow-paper-md transition-shadow cursor-grab active:cursor-grabbing select-none`}
            >
              {/* Paper Masking Tape Header Anchor */}
              <div
                aria-hidden="true"
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#E6E0D5]/90 rounded-xs border-y border-[#1C1B19]/10 shadow-xs rotate-[-1deg] pointer-events-none"
              />

              {/* Note Header / Keyboard Accessible Toggle Button */}
              <button
                type="button"
                onClick={() => toggleExpand(note.id)}
                aria-expanded={isExpanded}
                aria-controls={`note-content-${note.id}`}
                className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B19] focus-visible:ring-offset-2 rounded-lg cursor-pointer"
              >
                <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-[#57534E] mb-2">
                  <span>{note.label}</span>
                  <span className="bg-white/60 px-2 py-0.5 rounded-full border border-[#1C1B19]/8 text-[#1C1B19]">
                    {note.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold font-sans text-[#1C1B19] leading-snug mb-3">
                  {note.title}
                </h4>

                <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#1C1B19] pt-2 border-t border-[#1C1B19]/10">
                  <span>{isExpanded ? 'Hide Copy Breakdown' : 'Read Copy Breakdown'}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#1C1B19] transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Collapsible Editorial Breakdown */}
              {isExpanded && (
                <div
                  id={`note-content-${note.id}`}
                  className="mt-4 pt-3 border-t border-[#1C1B19]/10 space-y-3 font-sans text-xs"
                >
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#FF3B30] uppercase block mb-1">
                      ✕ Generic Copywriting Pitfall:
                    </span>
                    <div className="bg-white/50 p-2 rounded-lg border border-[#1C1B19]/8 text-[#57534E] italic font-sans text-[11px]">
                      {note.badAlternative}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#16A34A] uppercase block mb-1">
                      ✓ Engineering Mechanism Hook:
                    </span>
                    <p className="text-[#1C1B19] font-medium leading-relaxed text-xs">
                      {note.whyItWorks}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
