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
      badge: 'Zero-Privilege Linux Telemetry',
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
      badge: 'Air-Gapped SLM Deployments',
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
      badge: 'Sub-4ms Autonomous Tracking',
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
    <div className="w-full bg-[#FDFBF7] rounded-3xl border border-[#1C1B19]/8 shadow-paper-md overflow-hidden relative">
      {/* Translucent Masking Tape centered at top */}
      <div className="masking-tape masking-tape-lavender"></div>

      {/* Top Window Header (Warm Paper Card Header) */}
      <div className="bg-[#FAF7F0] px-5 sm:px-6 py-4 border-b border-[#1C1B19]/8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F7D6DE] border border-[#1C1B19]/10"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FADEC9] border border-[#1C1B19]/10"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#D7F0DE] border border-[#1C1B19]/10"></span>
          </div>
          <span className="text-[11px] font-mono font-semibold text-[#57534E] pl-2 hidden sm:inline">
            translator.rs // live_spec_morph
          </span>
        </div>

        {/* State Toggle Switch with Soft Pastel Pills */}
        <div className="flex items-center bg-[#EAE5DA]/70 p-1 rounded-full border border-[#1C1B19]/6 relative">
          <button
            type="button"
            onClick={() => setActiveTab('raw')}
            className={`relative px-3.5 py-1 text-xs font-mono font-medium rounded-full transition-colors cursor-pointer z-10 ${
              activeTab === 'raw' ? 'text-[#1C1B19]' : 'text-[#57534E] hover:text-[#1C1B19]'
            }`}
          >
            {activeTab === 'raw' && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-[#FDFBF7] rounded-full shadow-paper-sm border border-[#1C1B19]/8"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 font-bold">
              <Terminal className="w-3 h-3 text-[#57534E]" />
              Raw Spec
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('converted')}
            className={`relative px-3.5 py-1 text-xs font-mono font-medium rounded-full transition-colors cursor-pointer z-10 ${
              activeTab === 'converted' ? 'text-[#1C1B19]' : 'text-[#57534E] hover:text-[#1C1B19]'
            }`}
          >
            {activeTab === 'converted' && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-[#E3DEFA] rounded-full shadow-paper-sm border border-[#1C1B19]/10"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3 h-3 text-[#1C1B19]" />
              Converted Copy
            </span>
          </button>
        </div>
      </div>

      {/* Main Interactive Screen Area */}
      <div className="p-6 sm:p-7 min-h-[360px] flex flex-col justify-between bg-[#FDFBF7]">
        <AnimatePresence mode="wait">
          {activeTab === 'raw' ? (
            <motion.div
              key="raw-view"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Terminal command line in warm dark stone */}
              <div className="bg-[#1C1B19] text-[#FDFBF7] rounded-xl p-3.5 font-mono text-xs shadow-paper-sm">
                <span className="text-[#EAF57A] select-none font-bold">$ </span>
                <span>{currentDomain.rawSpec.command}</span>
              </div>

              {/* Technical breakdown */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#57534E] font-semibold flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[#1C1B19]" />
                  Kernel Mechanism & Architecture:
                </div>
                <p className="font-mono text-xs text-[#1C1B19] bg-[#FAF7F0] p-3.5 rounded-xl border border-[#1C1B19]/8 leading-relaxed shadow-sm">
                  {currentDomain.rawSpec.kernelMechanism}
                </p>
              </div>

              {/* Code Snippet in soft dark box */}
              <div className="bg-[#1C1B19] text-[#FDFBF7] rounded-xl p-3.5 font-mono text-[11px] overflow-x-auto shadow-paper-sm">
                <pre className="text-[#FDFBF7] leading-relaxed">
                  {currentDomain.rawSpec.technicalExcerpt}
                </pre>
              </div>

              {/* Telemetry pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentDomain.rawSpec.metrics.map((m, idx) => (
                  <span key={idx} className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-[#E6E0D5]/70 text-[#1C1B19] border border-[#1C1B19]/6 shadow-sm">
                    {m}
                  </span>
                ))}
              </div>

              <div className="text-xs font-sans text-[#1C1B19] bg-[#FADEC9]/60 p-3 rounded-xl border border-[#1C1B19]/8 flex items-start gap-2 shadow-sm font-medium">
                <Info className="w-4 h-4 text-[#1C1B19] shrink-0 mt-0.5" />
                <span>
                  <strong>The Friction:</strong> Brilliant engineering, but 90% of buyers bounce. Switch to <strong>Converted Copy</strong> to inspect the conversion-engineered rewrite.
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="converted-view"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Converted Hero Section Preview on Soft Cream Paper */}
              <div className="relative p-6 sm:p-7 rounded-2xl bg-[#FAF7F0] border border-[#1C1B19]/8 shadow-paper-sm">
                {/* Eyebrow badge with strategy pin */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs font-bold px-3 py-0.5 rounded-full bg-[#D7F0DE] text-[#1C1B19] border border-[#1C1B19]/8 tracking-tight">
                    {currentDomain.convertedCopy.badge}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveAnnotation('headline-pin')}
                    className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#1C1B19] bg-[#E3DEFA] px-2.5 py-0.5 rounded-full border border-[#1C1B19]/8 shadow-sm hover:bg-[#d8d1f7] cursor-pointer"
                  >
                    <Info className="w-3 h-3 text-[#1C1B19]" />
                    <span>Copy Pin #1</span>
                  </button>
                </div>

                {/* Headline in Title Case */}
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1C1B19] font-display mb-2 leading-snug">
                  {currentDomain.convertedCopy.headline}
                </h3>

                {/* Subhead */}
                <p className="text-[#57534E] text-sm leading-relaxed mb-4 font-sans font-medium">
                  {currentDomain.convertedCopy.subhead}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1 mb-4">
                  <div className="px-4 py-2 rounded-full text-xs font-sans font-bold bg-[#1C1B19] text-[#FDFBF7] shadow-paper-sm flex items-center gap-1.5 cursor-pointer">
                    <span>{currentDomain.convertedCopy.primaryCta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-4 py-2 rounded-full text-xs font-sans font-semibold bg-[#FDFBF7] border border-[#1C1B19]/10 text-[#1C1B19] shadow-sm">
                    {currentDomain.convertedCopy.secondaryCta}
                  </div>
                </div>

                {/* Proof line */}
                <div className="font-mono text-xs text-[#57534E] border-t border-[#1C1B19]/8 pt-2.5 flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>{currentDomain.convertedCopy.proofBar}</span>
                </div>
              </div>

              {/* Interactive Strategy Callout Pins Bar */}
              <div className="space-y-2">
                <div className="text-xs font-sans text-[#1C1B19] font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>Interactive Strategy Notes:</span>
                  <span className="text-[#57534E] text-[11px] font-mono font-medium">Click to inspect</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentDomain.convertedCopy.annotations.map((pin, pIdx) => {
                    const isSelected = activeAnnotation === pin.id;
                    const pastelBg = pIdx === 0 ? '#E3DEFA' : pIdx === 1 ? '#FADEC9' : '#D7F0DE';
                    return (
                      <button
                        key={pin.id}
                        type="button"
                        onClick={() => setActiveAnnotation(pin.id)}
                        className={`text-left p-2.5 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#1C1B19]/20 shadow-paper-sm font-bold text-[#1C1B19]'
                            : 'bg-[#FAF7F0] border-[#1C1B19]/6 text-[#57534E] hover:text-[#1C1B19]'
                        }`}
                        style={{ backgroundColor: isSelected ? pastelBg : undefined }}
                      >
                        <div className="font-bold text-[#1C1B19] flex items-center gap-1.5 mb-0.5">
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#1C1B19]' : 'bg-[#1C1B19]/30'}`}></span>
                          {pin.title}
                        </div>
                        <div className="text-[11px] text-[#57534E] font-mono">{pin.target}</div>
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
                    className="p-4 rounded-xl bg-[#FDFBF7] border border-[#1C1B19]/8 text-xs font-sans shadow-paper-sm space-y-1"
                  >
                    <div className="text-[#1C1B19] font-bold text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                      {currentDomain.convertedCopy.annotations.find(a => a.id === activeAnnotation)?.title}
                    </div>
                    <p className="text-[#57534E] text-xs leading-relaxed font-medium">
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
      <div className="bg-[#FAF7F0] px-5 sm:px-6 py-3 border-t border-[#1C1B19]/8 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-mono text-[#8A857D] uppercase tracking-wider font-semibold hidden sm:inline">
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
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-[#1C1B19] text-[#FDFBF7] border-[#1C1B19] shadow-sm font-bold'
                    : 'bg-[#FDFBF7] text-[#57534E] hover:text-[#1C1B19] border-[#1C1B19]/8'
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
