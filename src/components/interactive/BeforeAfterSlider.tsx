import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, Check, X, Code2, Sparkles } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(10, Math.min(rect.width - 10, x));
    const percent = Math.round((clampedX / rect.width) * 100);
    setSliderPosition(percent);
  }, []);

  const onPointerDown = () => {
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation support
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSliderPosition(prev => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSliderPosition(prev => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <div className="w-full my-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#8A857D] font-bold">
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#1C1B19]" />
            <span>Tactile Teardown Slider // Drag or use arrow keys</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-sans text-[#1C1B19] tracking-tight mt-0.5">
            Raw Spec Sheet vs. High-Conversion Value Proposition
          </h3>
        </div>
        <div className="text-[11px] font-mono text-[#8A857D] bg-[#FDFBF7] px-3 py-1.5 rounded-full border border-[#1C1B19]/8 self-start sm:self-auto">
          Position: {sliderPosition}% • Keyboard: ← / →
        </div>
      </div>

      {/* Interactive Drag Comparison Container */}
      <div
        ref={containerRef}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="relative w-full h-[380px] sm:h-[320px] rounded-3xl overflow-hidden border border-[#1C1B19]/10 shadow-paper-lg bg-[#FAF7F0] select-none touch-none"
      >
        {/* Right Side: Clean High-Conversion Copy (Background Full Layer) */}
        <div className="absolute inset-0 bg-[#FDFBF7] p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7F0DE] border border-[#1C1B19]/10 text-xs font-mono font-bold text-[#1C1B19]">
              <Check className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>AFTER // HIGH-CONVERSION COPY</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-extrabold font-sans text-[#1C1B19] tracking-tight leading-tight">
              Monitor Autonomous Coding Agents in Real Time—Without Draining a Single Core.
            </h4>

            <p className="text-sm text-[#57534E] leading-relaxed font-sans">
              Catch transient bash subshells, hidden socket connects, and runaway file writes before PID reuse masks them. Non-polling kernel epoll telemetry with bounded memory and zero root permissions.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-full bg-[#FAF7F0] border border-[#1C1B19]/10 font-bold text-[#1C1B19]">
                Zero Root Required
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#FAF7F0] border border-[#1C1B19]/10 font-bold text-[#1C1B19]">
                epoll_wait Sleep
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#FAF7F0] border border-[#1C1B19]/10 font-bold text-[#1C1B19]">
                LRU Cache TTL
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#8A857D] pt-3 border-t border-[#1C1B19]/8">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Engineers understand the mechanism immediately</span>
            </span>
            <span className="font-bold text-[#1C1B19]">Shipped Copy</span>
          </div>
        </div>

        {/* Left Side: Raw Spec Sheet (Clipped to sliderPosition) */}
        <div
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          className="absolute inset-0 bg-[#EFECE6] p-6 sm:p-8 flex flex-col justify-between border-r border-[#1C1B19]/20"
        >
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7D6DE] border border-[#1C1B19]/10 text-xs font-mono font-bold text-[#1C1B19]">
              <X className="w-3.5 h-3.5 text-[#FF3B30]" />
              <span>BEFORE // RAW SPEC SHEET / FLUFF</span>
            </div>

            <div className="p-3 bg-[#E6E0D5]/70 rounded-xl font-mono text-xs text-[#1C1B19] border border-[#1C1B19]/10 space-y-1">
              <div className="text-[10px] text-[#8A857D]">// Internal Engineer Spec:</div>
              <div>Single-threaded epoll_wait(-1) loop multiplexing inotify masks + /proc/[pid]/stat starttime correlation with LruCache&lt;Pid, ProcessDescriptor&gt;.</div>
            </div>

            <h4 className="text-xl sm:text-2xl font-bold font-sans text-[#57534E] line-through opacity-70 tracking-tight leading-tight">
              The Next-Generation AI Agent Observability Cloud Platform
            </h4>

            <p className="text-sm text-[#8A857D] leading-relaxed font-sans italic">
              "Seamlessly revolutionize your enterprise agentic workflows with unified end-to-end multi-cloud observability and intelligent actionable insights."
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#8A857D] pt-3 border-t border-[#1C1B19]/10">
            <span className="flex items-center gap-1 text-[#FF3B30]">
              <Code2 className="w-3.5 h-3.5" />
              <span>Buried mechanism & high buzzword density</span>
            </span>
            <span className="font-bold text-[#57534E]">Raw Draft</span>
          </div>
        </div>

        {/* Draggable Divider Line & Physical Handle */}
        <div
          style={{ left: `${sliderPosition}%` }}
          className="absolute top-0 bottom-0 w-0.5 bg-[#1C1B19] -translate-x-1/2 pointer-events-none z-20"
        >
          {/* Draggable Tactile Paper Knob / Slider Handle */}
          <div
            role="slider"
            tabIndex={0}
            aria-valuenow={sliderPosition}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Before and after copy comparison slider. Use arrow keys to adjust."
            onPointerDown={onPointerDown}
            onKeyDown={onKeyDown}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-14 bg-[#FDFBF7] rounded-xl border-2 border-[#1C1B19] shadow-paper-md flex flex-col items-center justify-center gap-1 cursor-ew-resize pointer-events-auto hover:scale-105 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B19] focus-visible:ring-offset-2"
          >
            <div className="w-4 h-0.5 bg-[#1C1B19] rounded-full" />
            <div className="w-4 h-0.5 bg-[#1C1B19] rounded-full" />
            <div className="w-4 h-0.5 bg-[#1C1B19] rounded-full" />
            <ArrowLeftRight className="w-3 h-3 text-[#1C1B19] mt-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
