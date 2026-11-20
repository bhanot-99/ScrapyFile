import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Sparkles, CheckCircle2, Info, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

interface DomainSpec {
  id: string;
  name: string;
  tag: string;
  rawSpec: {
    command: string;
    kernelMechanism: string;
    metrics: string[];
    technicalExcerpt: string;
  };
  convertedCopy: {
    badge: string;
    headline: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
    proofBar: string;
    annotations: {
      id: string;
      title: string;
      target: string;
      explanation: string;
    }[];
  };
}

const DOMAINS: DomainSpec[] = [
  {
    id: 'devtools-rust',
    name: 'DevTools / Rust',
    tag: 'LINUX OBSERVABILITY',
    rawSpec: {
      command: 'cargo run --release -p agent-radar -- --proc-interval 0ms --landlock-enforce',
      kernelMechanism: 'Single-threaded epoll_wait(-1) multiplexing inotify masks + /proc/[pid]/stat starttime correlation. Fixed LRU bounded slab.',
      metrics: ['0.00% Idle CPU', '4.2MB RSS Max', '<120ns Lookup'],
      technicalExcerpt: `struct KernelCorrelator {
    epoll_fd: RawFd,
    inotify_wd: HashMap<WatchDescriptor, PathBuf>,
    proc_cache: LruCache<Pid, ProcessDescriptor>,
}
// Correlates file creation events with transient process lifetimes
// before PID reuse occurs in rapid microsecond subshells.`
    },
    convertedCopy: {
      badge: 'ZERO-PRIVILEGE LINUX TELEMETRY',
      headline: 'Monitor Every AI Coding Agent in Real Time—Without Draining a Single Core.',
      subhead: 'Zero-overhead Linux kernel observability that tracks transient bash spawns, hidden socket connects, and runaway file writes before PID reuse masks them. Idle CPU stays flat at 0.00%.',
      primaryCta: 'Install CLI in 5 Seconds',
      secondaryCta: 'Inspect epoll Benchmark',
      proofBar: '4.2MB RSS • Zero Root Permissions • Proven on 10,000 Concurrent Subshells',
      annotations: [
        {
          id: 'headline-pin',
          title: 'The Counter-Intuitive Pain Point',
          target: 'Headline',
          explanation: 'Engineers hate background daemons that steal CPU cycles from their compiler. Calling out "0% Idle CPU" directly neutralises their #1 installation objection.'
        },
        {
          id: 'subhead-pin',
          title: 'Concrete Technical Mechanism',
          target: 'Subheadline',
          explanation: 'Replaced vague "full visibility" marketing jargon with the exact failure mode engineers fear: "PID reuse masking rogue transient subshells". This establishes instant peer credibility.'
        },
        {
          id: 'cta-pin',
          title: 'Low-Friction Engineering CTA',
          target: 'Action Buttons',
          explanation: 'Engineers refuse "Schedule a Demo" calls. Offering a friction-free "5s Install" plus immediate benchmark source code drives 3.4x higher developer activation.'
        }
      ]
    }
  },
  {
    id: 'on-device-ai',
    name: 'On-Device AI',
    tag: 'LOCAL RUNTIMES',
    rawSpec: {
      command: 'neuro-sandbox --model bitnet-b1.58-2b --landlock-net=deny --seccomp strict',
      kernelMechanism: 'Unprivileged Landlock LSM ruleset revoking AF_INET/AF_INET6 network socket creation post-weight load. BitNet ternary matrix kernel.',
      metrics: ['0 Bytes Egress', '1.58-bit Weights', '142 Tok/s on CPU'],
      technicalExcerpt: `fn enforce_zero_egress() -> Result<()> {
    LandlockRuleset::new()
        .restrict_network(AccessNet::DenyAll)
        .restrict_fs(AccessFs::ReadOnlyWeights)
        .apply(RestrictSelf::Strict)?;
    Ok(())
}`
    },
    convertedCopy: {
      badge: 'AIR-GAPPED SLM DEPLOYMENTS',
      headline: 'Run Proprietary Edge Intelligence on Bare-Metal. Guaranteed Zero Network Egress.',
      subhead: 'Deploy 2B ternary parameter models directly on developer workstations and edge drones. Hardware-enforced Linux Landlock sandboxing mathematically prevents socket leaks, telemetry beacons, and data exfiltration.',
      primaryCta: 'Run Local Docker Sandbox',
      secondaryCta: 'Read Security Whitepaper',
      proofBar: 'Mathematical Zero Egress • 1.58-Bit Integer Compute • No GPU Required',
      annotations: [
        {
          id: 'security-pin',
          title: 'Security-Proof Terminology',
          target: 'Headline & Badge',
          explanation: 'Replaced buzzwords ("Safe Enterprise AI") with legally and technically defensible claims: "Guaranteed Zero Network Egress via Landlock".'
        },
        {
          id: 'hardware-pin',
          title: 'Cost/Infrastructure Hook',
          target: 'Subheadline',
          explanation: 'Explicitly stating "No GPU Required" expands the total addressable buyer pool from cloud architects to edge hardware leads.'
        }
      ]
    }
  },
  {
    id: 'edge-vision',
    name: 'Edge Vision',
    tag: 'UAV EMBEDDED C++',
    rawSpec: {
      command: 'uav-tracker --backend v4l2 --pipeline tensorrt-int8 --dma-buf direct',
      kernelMechanism: 'Zero-copy V4L2 DMA-BUF import directly into CUDA unified memory. Pipelined NMS on ARM Cortex-A78AE with hardware thermal capping.',
      metrics: ['<3.8ms Glass-to-Glass', '12W Max TDP', '60 FPS @ 1080p'],
      technicalExcerpt: `void on_v4l2_frame(int dmabuf_fd) {
    cudaImportExternalMemory(&ext_mem, &dmabuf_desc);
    tensorrt_infer_async(stream, ext_mem);
    // Zero CPU memcpy bottleneck
}`
    },
    convertedCopy: {
      badge: 'SUB-4MS AUTONOMOUS TRACKING',
      headline: 'Real-Time Edge Vision for Autonomous Systems—Capped at 12 Watts.',
      subhead: 'Zero-copy DMA-BUF video ingestion that bypasses CPU bottlenecks to stream 60 FPS object tracking directly through INT8 hardware pipelines. Engineered for mission-critical UAV avionics.',
      primaryCta: 'Request Hardware SDK',
      secondaryCta: 'View Thermal Benchmarks',
      proofBar: 'Sub-4ms P99 Latency • 12W Thermal Envelope • Tested on Jetson Orin & ARM',
      annotations: [
        {
          id: 'latency-pin',
          title: 'P99 Latency As The Core Value',
          target: 'Headline',
          explanation: 'In robotics, average latency is meaningless. Calling out sub-4ms hard real-time latency with thermal envelope caps (12W) hits the hardware engineer’s exact constraint.'
        },
        {
          id: 'zero-copy-pin',
          title: 'Architecture Detail As Trust Anchor',
          target: 'Subhead',
          explanation: '"Zero-copy DMA-BUF ingestion" tells the senior embedded engineer that this is written by someone who understands memory bus saturation, not a junior web dev.'
        }
      ]
    }
  }
];

export default function HeroSpecTranslator() {
  const [activeTab, setActiveTab] = useState<'raw' | 'converted'>('converted');
  const [selectedDomain, setSelectedDomain] = useState<string>('devtools-rust');
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>('headline-pin');

  const currentDomain = DOMAINS.find(d => d.id === selectedDomain) || DOMAINS[0];

  return (
    <div className="w-full bg-[#FFFDF9] rounded-md border-[2px] border-[#111111] shadow-[6px_6px_0px_#111111] overflow-hidden relative">
      {/* Top Window Header (Tactile Editorial Terminal) */}
      <div className="bg-[#FAF8F3] px-4 py-3 border-b-[1.5px] border-[#111111] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF3B30] border border-[#111111]"></span>
            <span className="w-3 h-3 rounded-full bg-[#FFE600] border border-[#111111]"></span>
            <span className="w-3 h-3 rounded-full bg-[#16A34A] border border-[#111111]"></span>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#111111] pl-2 hidden sm:inline uppercase tracking-wider">
            translator.rs // live_spec_morph
          </span>
        </div>

        {/* State Toggle Switch */}
        <div className="flex items-center bg-[#F3F1EC] p-1 rounded-sm border-[1.5px] border-[#111111] relative shadow-[1.5px_1.5px_0px_#111111]">
          <button
            type="button"
            onClick={() => setActiveTab('raw')}
            className={`relative px-3 py-1 text-[11px] font-mono font-bold rounded-xs transition-colors cursor-pointer z-10 ${
              activeTab === 'raw' ? 'text-white' : 'text-[#4B4A47] hover:text-[#111111]'
            }`}
          >
            {activeTab === 'raw' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-[#111111] rounded-xs shadow-[1.5px_1.5px_0px_#111111]"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-[#FFE600]" />
              RAW SPEC
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('converted')}
            className={`relative px-3 py-1 text-[11px] font-mono font-bold rounded-xs transition-colors cursor-pointer z-10 ${
              activeTab === 'converted' ? 'text-[#111111]' : 'text-[#4B4A47] hover:text-[#111111]'
            }`}
          >
            {activeTab === 'converted' && (
              <motion.div
                layoutId="activeTabBadge"
                className="absolute inset-0 bg-[#FFE600] border border-[#111111] rounded-xs shadow-[2px_2px_0px_#111111]"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#FF3B30]" />
              CONVERTED COPY
            </span>
          </button>
        </div>
      </div>

      {/* Main Interactive Screen Area */}
      <div className="p-5 sm:p-7 min-h-[360px] flex flex-col justify-between bg-[#FFFDF9]">
        <AnimatePresence mode="wait">
          {activeTab === 'raw' ? (
            <motion.div
              key="raw-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Terminal command line */}
              <div className="bg-[#111111] text-[#F3F1EC] rounded-xs p-3 font-mono text-xs border-[1.5px] border-[#111111] shadow-[2.5px_2.5px_0px_#111111]">
                <span className="text-[#FFE600] select-none font-bold">$ </span>
                <span>{currentDomain.rawSpec.command}</span>
              </div>

              {/* Technical breakdown */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#4B4A47] font-bold flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#111111]" />
                  Kernel Mechanism & Architecture:
                </div>
                <p className="font-mono text-xs text-[#111111] bg-[#FAF8F3] p-3 rounded-xs border-[1.5px] border-[#111111] leading-relaxed shadow-[2px_2px_0px_#111111]">
                  {currentDomain.rawSpec.kernelMechanism}
                </p>
              </div>

              {/* Code Snippet */}
              <div className="bg-[#111111] text-[#F3F1EC] rounded-xs p-3.5 border-[1.5px] border-[#111111] font-mono text-[11px] overflow-x-auto shadow-[3px_3px_0px_#111111]">
                <pre className="text-[#F3F1EC] leading-relaxed">
                  {currentDomain.rawSpec.technicalExcerpt}
                </pre>
              </div>

              {/* Telemetry pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentDomain.rawSpec.metrics.map((m, idx) => (
                  <span key={idx} className="font-mono text-[11px] font-bold px-2.5 py-1 rounded-xs bg-[#FFFDF9] border-[1.5px] border-[#111111] text-[#111111] shadow-[2px_2px_0px_#111111]">
                    {m}
                  </span>
                ))}
              </div>

              <div className="text-[11px] font-mono font-bold text-[#111111] bg-[#FFE600]/30 p-2.5 rounded-xs border-[1.5px] border-[#111111] flex items-start gap-2 shadow-[2px_2px_0px_#111111]">
                <Info className="w-4 h-4 text-[#FF3B30] shrink-0 mt-0.5" />
                <span>
                  <strong>The Friction:</strong> Brilliant engineering, but 90% of buyers bounce. Switch to <strong>Converted Copy</strong> to inspect the conversion-engineered rewrite.
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="converted-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Converted Hero Section Preview inside Illustrator Vector Transform Box */}
              <div className="relative p-5 sm:p-6 rounded-xs bg-[#FAF8F3] border-[2px] border-[#FF3B30] shadow-[4px_4px_0px_#111111]">
                {/* 4 Vector Transform Square Corner Handles */}
                <span className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-[1.5px] border-[#FF3B30]"></span>
                <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-[1.5px] border-[#FF3B30]"></span>
                <span className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-[1.5px] border-[#FF3B30]"></span>
                <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-[1.5px] border-[#FF3B30]"></span>

                {/* Eyebrow badge with strategy pin */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-xs bg-[#16A34A] text-white border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111] tracking-wider uppercase">
                    {currentDomain.convertedCopy.badge}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveAnnotation('headline-pin')}
                    className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#111111] bg-[#FFE600] px-2 py-0.5 rounded-xs border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111] hover:bg-[#FFE600]/80 cursor-pointer"
                  >
                    <Info className="w-3 h-3 text-[#FF3B30]" />
                    <span>Copy Pin #1</span>
                  </button>
                </div>

                {/* Headline */}
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#111111] font-display mb-2 leading-snug">
                  {currentDomain.convertedCopy.headline}
                </h3>

                {/* Subhead */}
                <p className="text-[#3F3E3B] text-xs sm:text-sm leading-relaxed mb-4 font-sans font-medium">
                  {currentDomain.convertedCopy.subhead}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1 mb-4">
                  <div className="px-3.5 py-1.5 rounded-xs text-xs font-mono font-bold uppercase bg-[#FF3B30] text-white border-[1.5px] border-[#111111] shadow-[2.5px_2.5px_0px_#111111] flex items-center gap-1.5">
                    <span>{currentDomain.convertedCopy.primaryCta}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="px-3.5 py-1.5 rounded-xs text-xs font-mono font-bold uppercase bg-[#FFFDF9] border-[1.5px] border-[#111111] text-[#111111] shadow-[2.5px_2.5px_0px_#111111]">
                    {currentDomain.convertedCopy.secondaryCta}
                  </div>
                </div>

                {/* Proof line */}
                <div className="font-mono text-[11px] font-bold text-[#4B4A47] border-t border-[#111111]/15 pt-2 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>{currentDomain.convertedCopy.proofBar}</span>
                </div>
              </div>

              {/* Interactive Strategy Callout Pins Bar */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-[#111111] font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>Interactive Copy Strategy Annotations:</span>
                  <span className="text-[#FF3B30] text-[10px] font-mono font-bold">CLICK TO INSPECT RATIONALE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentDomain.convertedCopy.annotations.map(pin => {
                    const isSelected = activeAnnotation === pin.id;
                    return (
                      <button
                        key={pin.id}
                        type="button"
                        onClick={() => setActiveAnnotation(pin.id)}
                        className={`text-left p-2 rounded-xs border-[1.5px] text-[11px] font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFE600] border-[#111111] text-[#111111] shadow-[3px_3px_0px_#111111] font-bold'
                            : 'bg-[#FFFDF9] border-[#111111] text-[#4B4A47] hover:text-[#111111] shadow-[1.5px_1.5px_0px_#111111]'
                        }`}
                      >
                        <div className="font-bold text-[#111111] flex items-center gap-1 mb-0.5">
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#FF3B30]' : 'bg-[#111111]'}`}></span>
                          {pin.title}
                        </div>
                        <div className="text-[10px] text-[#4B4A47]">{pin.target}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Annotation Explanation Box */}
                {activeAnnotation && (
                  <motion.div
                    key={activeAnnotation}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3 rounded-xs bg-[#FFFDF9] border-[1.5px] border-[#111111] text-xs font-mono shadow-[3px_3px_0px_#111111] space-y-1"
                  >
                    <div className="text-[#16A34A] font-bold text-[11px] flex items-center gap-1.5 uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                      {currentDomain.convertedCopy.annotations.find(a => a.id === activeAnnotation)?.title}
                    </div>
                    <p className="text-[#111111] text-[11px] leading-relaxed font-sans font-medium">
                      {currentDomain.convertedCopy.annotations.find(a => a.id === activeAnnotation)?.explanation}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Domain Quick-Switch Bar */}
      <div className="bg-[#FAF8F3] px-4 py-2.5 border-t-[1.5px] border-[#111111] flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-mono font-bold text-[#4B4A47] uppercase tracking-widest hidden sm:inline">
          Test Domain:
        </span>
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {DOMAINS.map(domain => {
            const isCurrent = selectedDomain === domain.id;
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => {
                  setSelectedDomain(domain.id);
                  setActiveAnnotation(domain.convertedCopy.annotations[0]?.id || null);
                }}
                className={`flex-1 sm:flex-initial px-3 py-1 rounded-xs text-[11px] font-mono font-bold transition-all cursor-pointer border-[1.5px] ${
                  isCurrent
                    ? 'bg-[#111111] text-[#FFE600] border-[#111111] shadow-[2px_2px_0px_#FF3B30]'
                    : 'bg-[#FFFDF9] text-[#4B4A47] hover:text-[#111111] border-[#111111] shadow-[1.5px_1.5px_0px_#111111]'
                }`}
              >
                {domain.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
