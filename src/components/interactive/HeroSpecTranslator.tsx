import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Sparkles, CheckCircle2, Info, ShieldCheck } from 'lucide-react';

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
      kernelMechanism: 'Single-threaded epoll_wait(-1) multiplexing inotify masks + /proc/[pid]/stat starttime correlation. Bounded LRU cache with TTL eviction.',
      metrics: ['Measurement Pending (Idle CPU)', 'Measurement Pending (RSS)', 'Zero Root Needed'],
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
      headline: 'Monitor Autonomous Coding Agents in Real Time—Without Draining a Single Core.',
      subhead: 'Zero-overhead Linux kernel observability that tracks transient bash spawns, hidden socket connects, and runaway file writes before PID reuse masks them without polling loops.',
      primaryCta: 'Install CLI in 5 Seconds',
      secondaryCta: 'Inspect epoll Benchmark',
      proofBar: 'LRU Cache TTL Eviction • Zero Root Permissions • Tested on Linux x86_64',
      annotations: [
        {
          id: 'headline-pin',
          title: 'The Counter-Intuitive Pain Point',
          target: 'Headline',
          explanation: 'Engineers hate background daemons that steal CPU cycles from their compiler. Highlighting non-polling epoll_wait directly neutralises their #1 installation objection.'
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
          explanation: 'Engineers refuse "Schedule a Demo" gates. Offering a friction-free install plus immediate benchmark source code establishes direct developer trust.'
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
      metrics: ['0 Bytes Egress', '1.58-bit Weights', 'Addition-Only Kernel'],
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
      headline: 'Run Local Edge Intelligence on Bare-Metal. Guaranteed Zero Network Egress.',
      subhead: 'Deploy 2B ternary parameter models directly on developer workstations and edge devices. Hardware-enforced Linux Landlock sandboxing mathematically prevents socket leaks, telemetry beacons, and data exfiltration.',
      primaryCta: 'Inspect Sandbox Spec',
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
    id: 'uav-vision',
    name: 'Computer Vision / UAV',
    tag: 'AERIAL TRAFFIC ANALYTICS',
    rawSpec: {
      command: 'python run_track.py --weights yolo11n.pt --source aerial_04.mp4 --sahi --tracker bytetrack',
      kernelMechanism: 'SAHI slicing aided hyper inference over high-resolution drone footage with ByteTrack temporal association.',
      metrics: ['SAHI Tiling', 'ByteTrack Matching', 'YOLO11n Base'],
      technicalExcerpt: `def track_aerial_stream(frame):
    slices = slice_image(frame, slice_height=512, slice_width=512)
    detections = predict_slices(slices, model="yolo11n.pt")
    tracks = bytetrack_update(detections)
    return tracks`
    },
    convertedCopy: {
      badge: 'Aerial Traffic Analytics',
      headline: 'High-Precision Aerial Vehicle Tracking from Drone Video—Without Frame Drops.',
      subhead: 'Combining YOLO11n small-object detection with SAHI sliced inference and ByteTrack association to track dense ground traffic accurately from high-altitude aerial feeds.',
      primaryCta: 'Inspect Tracking Pipeline',
      secondaryCta: 'View Pipeline Architecture',
      proofBar: 'SAHI Sliced Inference • ByteTrack Trajectory Association • NFU Taiwan Research',
      annotations: [
        {
          id: 'sahi-pin',
          title: 'SAHI Slicing As Trust Anchor',
          target: 'Headline & Subhead',
          explanation: 'In high-altitude drone video, vehicles occupy fewer than 20x20 pixels. Mentioning SAHI slicing signals deep domain understanding of small-object detection.'
        },
        {
          id: 'bytetrack-pin',
          title: 'Trajectory Continuity',
          target: 'Subhead',
          explanation: 'Referencing ByteTrack association explains how low-confidence detections remain tracked across occlusions without ID switching.'
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
        <div className="flex items-center bg-[#F4F1EA] p-1 rounded-full border border-[#1C1B19]/8">
          <button
            type="button"
            onClick={() => setActiveTab('raw')}
            className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'raw'
                ? 'bg-[#FDFBF7] text-[#1C1B19] shadow-sm'
                : 'text-[#57534E] hover:text-[#1C1B19]'
            }`}
          >
            Raw Spec
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('converted')}
            className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'converted'
                ? 'bg-[#E3DEFA] text-[#1C1B19] shadow-sm'
                : 'text-[#57534E] hover:text-[#1C1B19]'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#1C1B19]" />
            <span>Converted Copy</span>
          </button>
        </div>
      </div>

      {/* Domain Category Selector Pills */}
      <div className="px-5 sm:px-6 py-2.5 bg-[#FDFBF7] border-b border-[#1C1B19]/6 flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-mono text-[#57534E] uppercase tracking-wider shrink-0">Domain:</span>
        {DOMAINS.map(d => (
          <button
            key={d.id}
            type="button"
            onClick={() => {
              setSelectedDomain(d.id);
              setActiveAnnotation(null);
            }}
            className={`px-3 py-1 rounded-full text-xs font-sans font-medium transition-all shrink-0 cursor-pointer ${
              selectedDomain === d.id
                ? 'bg-[#1C1B19] text-[#FDFBF7] shadow-sm font-semibold'
                : 'bg-[#F4F1EA] text-[#57534E] hover:text-[#1C1B19]'
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Interactive Content Area */}
      <div className="p-6 sm:p-7 min-h-[360px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeTab === 'raw' ? (
            /* RAW SPEC VIEW: Monospace Terminal Block */
            <motion.div
              key="raw"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 font-mono text-xs"
            >
              <div className="flex items-center justify-between text-[#57534E] pb-2 border-b border-[#1C1B19]/8">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Terminal className="w-3.5 h-3.5 text-[#1C1B19]" />
                  <span>Terminal Reproduction Command</span>
                </span>
                <span className="text-[11px] bg-[#F4F1EA] px-2 py-0.5 rounded-full">{currentDomain.tag}</span>
              </div>

              <div className="bg-[#1C1B19] text-[#FDFBF7] p-3.5 rounded-2xl shadow-inner font-mono text-[11px] overflow-x-auto leading-relaxed">
                <span className="text-[#D7F0DE] select-none">$ </span>
                {currentDomain.rawSpec.command}
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F4F1EA]/70 border border-[#1C1B19]/8 space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-[#57534E]">Kernel Mechanism Description:</div>
                <div className="text-[#1C1B19] leading-relaxed text-[11px] font-sans">
                  {currentDomain.rawSpec.kernelMechanism}
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#1C1B19]/10 text-[11px] text-[#1C1B19] font-mono leading-relaxed whitespace-pre overflow-x-auto">
                {currentDomain.rawSpec.technicalExcerpt}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {currentDomain.rawSpec.metrics.map(m => (
                  <span key={m} className="px-2.5 py-1 rounded-full bg-[#FAF7F0] border border-[#1C1B19]/10 text-[11px] font-semibold text-[#1C1B19]">
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            /* CONVERTED COPY VIEW: Polished Developer Hero Component */
            <motion.div
              key="converted"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#E3DEFA] text-[#1C1B19] border border-[#1C1B19]/10">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{currentDomain.convertedCopy.badge}</span>
                </span>

                <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-[#1C1B19] leading-snug">
                  {currentDomain.convertedCopy.headline}
                </h3>

                <p className="text-[#57534E] text-xs sm:text-sm leading-relaxed font-sans">
                  {currentDomain.convertedCopy.subhead}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-full text-xs font-sans font-semibold bg-[#1C1B19] text-[#FDFBF7] hover:bg-[#3D3A36] shadow-sm transition-all"
                >
                  {currentDomain.convertedCopy.primaryCta}
                </button>
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-full text-xs font-sans font-semibold bg-[#FDFBF7] border border-[#1C1B19]/15 text-[#1C1B19] hover:bg-[#F4F1EA] transition-all"
                >
                  {currentDomain.convertedCopy.secondaryCta}
                </button>
              </div>

              {/* Proof Bar */}
              <div className="pt-3 border-t border-[#1C1B19]/8 flex items-center gap-2 text-xs font-mono text-[#57534E]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1C1B19] shrink-0" />
                <span className="truncate">{currentDomain.convertedCopy.proofBar}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Strategy Annotation Callout */}
        {activeTab === 'converted' && currentDomain.convertedCopy.annotations.length > 0 && (
          <div className="mt-5 pt-3 border-t border-[#1C1B19]/8">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#57534E] mb-2 font-semibold">
              <Info className="w-3 h-3 text-[#1C1B19]" />
              <span>Copywriting Strategy Notes (Click to Inspect):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentDomain.convertedCopy.annotations.map(ann => (
                <button
                  key={ann.id}
                  type="button"
                  onClick={() => setActiveAnnotation(activeAnnotation === ann.id ? null : ann.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-sans transition-all cursor-pointer border ${
                    activeAnnotation === ann.id
                      ? 'bg-[#FADEC9] text-[#1C1B19] border-[#1C1B19]/20 font-semibold shadow-xs'
                      : 'bg-[#F4F1EA]/80 text-[#57534E] border-transparent hover:bg-[#F4F1EA]'
                  }`}
                >
                  {ann.title}
                </button>
              ))}
            </div>

            {activeAnnotation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 p-3 rounded-xl bg-[#FAF7F0] border border-[#1C1B19]/8 text-xs font-sans text-[#57534E] leading-relaxed"
              >
                {currentDomain.convertedCopy.annotations.find(a => a.id === activeAnnotation)?.explanation}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}