import React, { useState, useEffect, useRef } from 'react';
import { Search, Hash, CornerDownLeft, X, BookOpen, User, Send } from 'lucide-react';

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Section Jump' | 'Page';
  href: string;
  badge: string;
}

const ITEMS: PaletteItem[] = [
  {
    id: 'ch-1',
    title: '01 MESS // Raw Spec & Headline Morph',
    subtitle: 'Hero section with live spec-to-copy transform',
    category: 'Section Jump',
    href: '/#chapter-1',
    badge: 'Chapter 01'
  },
  {
    id: 'ch-2',
    title: '02 TEARDOWN // Interactive Spec Teardown',
    subtitle: 'Pinned red-pen strikethrough & copy assembly',
    category: 'Section Jump',
    href: '/#chapter-2',
    badge: 'Chapter 02'
  },
  {
    id: 'ch-3',
    title: '03 PROOF // Shipped Systems & Verification',
    subtitle: 'Blueprint-blue grid with fanned 3D proof cards',
    category: 'Section Jump',
    href: '/#chapter-3',
    badge: 'Chapter 03'
  },
  {
    id: 'ch-4',
    title: '04 PIPELINE // 70/30 Engineering Workflow',
    subtitle: '70% reading kernel code, 30% writing copy',
    category: 'Section Jump',
    href: '/#chapter-4',
    badge: 'Chapter 04'
  },
  {
    id: 'ch-5',
    title: '05 CLEAN // Video Teardown CTA',
    subtitle: 'Approved production stamp & primary action',
    category: 'Section Jump',
    href: '/#chapter-5',
    badge: 'Chapter 05'
  },
  {
    id: 'page-work',
    title: 'All Case Studies & Spec Samples',
    subtitle: 'Explore all 5 technical copywriting case studies',
    category: 'Page',
    href: '/work',
    badge: 'Work'
  },
  {
    id: 'page-about',
    title: 'About // Systems Engineering Background',
    subtitle: 'Rust, Linux kernel, and C++ credentials',
    category: 'Page',
    href: '/about',
    badge: 'About'
  },
  {
    id: 'page-contact',
    title: 'Contact // Request Video Teardown',
    subtitle: 'Direct email and private Loom teardown inquiry',
    category: 'Page',
    href: '/contact',
    badge: 'Inquire'
  }
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter items based on search query
  const filteredItems = ITEMS.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Global keydown handler for '/' and 'Cmd+K' / 'Ctrl+K'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with '/' if not typing in an input
      if (
        e.key === '/' &&
        !isOpen &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setIsOpen(true);
        setQuery('');
        setSelectedIndex(0);
        return;
      }

      // Open with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
        setSelectedIndex(0);
        return;
      }

      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Autofocus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item: PaletteItem) => {
    setIsOpen(false);
    if (item.href.startsWith('/#')) {
      const id = item.href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.location.href = item.href;
  };

  const onKeyDownInDialog = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FDFBF7] text-[#1C1B19] border border-[#1C1B19]/12 shadow-paper-sm hover:shadow-paper-md hover:-translate-y-0.5 transition-all text-xs font-mono font-medium cursor-pointer"
          aria-label="Open command palette navigation"
        >
          <Search className="w-3.5 h-3.5 text-[#8A857D]" />
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-[#FAF7F0] border border-[#1C1B19]/15 font-mono text-[11px] font-bold">
            /
          </kbd>
          <span>to jump</span>
        </button>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Section and page navigation"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-[#1C1B19]/50"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-[#FDFBF7] rounded-3xl border border-[#1C1B19]/15 shadow-paper-lg overflow-hidden flex flex-col font-sans relative"
        onClick={e => e.stopPropagation()}
        onKeyDown={onKeyDownInDialog}
      >
        {/* Paper Masking Tape Accent */}
        <div
          aria-hidden="true"
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#E6E0D5]/90 rounded-xs border-y border-[#1C1B19]/10 shadow-xs rotate-[-0.5deg]"
        />

        {/* Search Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1C1B19]/10 bg-[#FAF7F0]">
          <Search className="w-4 h-4 text-[#8A857D] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a chapter (01-05), page, or topic..."
            className="flex-1 bg-transparent text-sm text-[#1C1B19] placeholder-[#8A857D] focus:outline-none font-sans font-medium"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-[#8A857D] hover:text-[#1C1B19] hover:bg-[#EAE5DA] transition-colors cursor-pointer"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-[#8A857D]">
              No matching sections found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#E3DEFA] text-[#1C1B19]' : 'hover:bg-[#FAF7F0] text-[#1C1B19]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded-lg bg-white/70 border border-[#1C1B19]/10 shrink-0">
                      {item.category === 'Section Jump' ? (
                        <Hash className="w-3.5 h-3.5 text-[#1C1B19]" />
                      ) : item.id === 'page-about' ? (
                        <User className="w-3.5 h-3.5 text-[#1C1B19]" />
                      ) : item.id === 'page-contact' ? (
                        <Send className="w-3.5 h-3.5 text-[#1C1B19]" />
                      ) : (
                        <BookOpen className="w-3.5 h-3.5 text-[#1C1B19]" />
                      )}
                    </span>
                    <div>
                      <div className="text-xs font-bold font-sans">{item.title}</div>
                      <div className="text-[11px] text-[#57534E] font-medium">{item.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/80 border border-[#1C1B19]/10">
                      {item.badge}
                    </span>
                    {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-[#1C1B19]" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="px-5 py-2.5 bg-[#FAF7F0] border-t border-[#1C1B19]/10 flex items-center justify-between text-[11px] font-mono text-[#8A857D]">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to jump</span>
            <span>esc to close</span>
          </div>
          <span>Jatin Bhanot Portfolio</span>
        </div>
      </div>
    </div>
  );
}
