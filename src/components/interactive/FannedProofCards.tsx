import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, GitBranch } from 'lucide-react';
import VerificationTooltip from './VerificationTooltip';

interface MetricProof {
  label: string;
  value: string;
  command: string;
  environment: string;
  status: string;
}

interface ProjectProof {
  id: string;
  title: string;
  tagline: string;
  deliverable: string;
  badgeVariant: string;
  badgeBg: string;
  repoUrl: string;
  metrics: MetricProof[];
  howMeasured: string;
}

const PROJECTS: ProjectProof[] = [
  {
    id: 'agent-radar',
    title: 'Zero-Overhead Agent Observability',
    tagline: 'Building unprivileged Linux telemetry for autonomous coding agents with kernel epoll_wait and inotify event correlation in Rust.',
    deliverable: 'Shipped Project // Deep-Dive',
    badgeVariant: 'Rust / Linux epoll',
    badgeBg: 'bg-[#E3DEFA]',
    repoUrl: 'https://github.com/bhanot1054/agent-radar',
    metrics: [
      {
        label: 'Idle CPU (epoll_wait)',
        value: 'Measurement Pending',
        command: 'cargo test --release -p agent-radar-core -- --nocapture',
        environment: 'Linux 6.8+ (x86_64, unprivileged)',
        status: 'Release benchmark pending hardware run'
      },
      {
        label: 'Memory Footprint (LRU)',
        value: 'Measurement Pending',
        command: 'ps -o rss= -p $(pgrep agent-radar)',
        environment: 'Linux 6.8+ (x86_64)',
        status: 'Bounded via LRU cache TTL eviction'
      },
    ],
    howMeasured: 'Release benchmark pending. Verified event-driven epoll_wait sleep via Linux /proc/[pid]/stat.'
  },
  {
    id: 'neuroos-sandbox',
    title: 'Zero-Egress On-Device AI Sandbox',
    tagline: 'Kernel-enforced isolation of local language model runtimes on Linux using Landlock LSM and systemd namespaces.',
    deliverable: 'Spec Sample // Security Whitepaper',
    badgeVariant: 'C++20 / Landlock LSM',
    badgeBg: 'bg-[#FADEC9]',
    repoUrl: 'https://github.com/bhanot1054/neuroos-sandbox',
    metrics: [
      {
        label: 'Network Egress Allowed',
        value: '0 Bytes (Hard Block)',
        command: 'make test-landlock && ./bin/test_no_net',
        environment: 'Linux 5.13+ (Landlock LSM ABI v1+)',
        status: 'Verified: AF_INET socket calls return EACCES'
      },
      {
        label: 'Sandbox Mechanism',
        value: 'Landlock LSM',
        command: 'cat /proc/sys/kernel/landlock/ruleset',
        environment: 'Linux 5.13+ x86_64',
        status: 'Kernel LSM enforced without hypervisor'
      },
    ],
    howMeasured: 'Verified by asserting socket syscall restrictions (AF_INET/AF_INET6 return EACCES post-init).'
  },
  {
    id: 'uav-traffic-vision',
    title: 'UAV Aerial Traffic Analytics',
    tagline: 'High-precision small-vehicle tracking from drone video using YOLO11n, ByteTrack, and SAHI sliced inference.',
    deliverable: 'Research Fellowship Prototype',
    badgeVariant: 'Vision / YOLO11n + SAHI',
    badgeBg: 'bg-[#D7F0DE]',
    repoUrl: 'https://github.com/bhanot1054',
    metrics: [
      {
        label: 'Small-Object Detection',
        value: 'SAHI Tiling',
        command: 'python3 -m unittest discover tests/',
        environment: 'Ubuntu 22.04 LTS (x86_64)',
        status: 'Tiling slices aerial 4K frames for tiny targets'
      },
      {
        label: 'Tracking Association',
        value: 'ByteTrack Kalman',
        command: 'python3 benchmarks/benchmark_tracking.py',
        environment: 'Ubuntu 22.04 LTS (x86_64 / PyTorch)',
        status: 'Motion association across consecutive frames'
      },
    ],
    howMeasured: 'Benchmarking on high-resolution aerial footage in progress; ByteTrack association verified.'
  }
];

export default function FannedProofCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  // Fan-out progress as the section scrolls into the center of the viewport
  const fanProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  // Card 1: Fans out to the left
  const card1X = useTransform(fanProgress, [0, 1], [0, -18]);
  const card1Rotate = useTransform(fanProgress, [0, 1], [0, -3.5]);

  // Card 2: Center card lifts slightly
  const card2Y = useTransform(fanProgress, [0, 1], [0, -10]);
  const card2Rotate = useTransform(fanProgress, [0, 1], [0, 0.5]);

  // Card 3: Fans out to the right
  const card3X = useTransform(fanProgress, [0, 1], [0, 18]);
  const card3Rotate = useTransform(fanProgress, [0, 1], [0, 3.5]);

  return (
    <div
      ref={containerRef}
      id="chapter-3"
      className="relative w-full py-16 sm:py-24 my-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FDFBF7] rounded-full border border-[#1C1B19]/15 text-[#1C1B19] font-mono text-xs font-bold uppercase mb-2 shadow-sm">
            <span>Chapter 03 // Shipped Systems Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1B19] font-display">
            The Proof Is In The Source Code
          </h2>
          <p className="text-sm text-[#57534E] font-sans mt-2">
            No mock agency slides. Every project below connects to real code with verification tooltips showing the exact reproduction command, target kernel, and GitHub link.
          </p>
        </div>

        {/* 3-Card Fanned Desk Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PROJECTS.map((proj, idx) => {
            const motionStyle =
              idx === 0
                ? { x: card1X, rotate: card1Rotate }
                : idx === 1
                ? { y: card2Y, rotate: card2Rotate }
                : { x: card3X, rotate: card3Rotate };

            return (
              <InteractiveTiltCard
                key={proj.id}
                project={proj}
                motionStyle={motionStyle}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}

// Subcomponent with 3D Card Tilt, Hover Glare & Lift
function InteractiveTiltCard({
  project,
  motionStyle
}: {
  project: ProjectProof;
  motionStyle: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;
    const glareX = Math.round((x / rect.width) * 100);
    const glareY = Math.round((y / rect.height) * 100);

    setTilt({ rotateX, rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 0.35 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      style={motionStyle}
      className="flex flex-col h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-6px)`
            : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.35s ease-out'
        }}
        className="relative bg-[#FDFBF7] rounded-3xl p-6 sm:p-7 border border-[#1C1B19]/10 shadow-paper-md hover:shadow-paper-lg flex flex-col justify-between flex-1 paper-fold overflow-hidden"
      >
        {/* Dynamic Paper Glare Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 65%)`
          }}
        />

        {/* Top Washi Tape */}
        <div className="masking-tape masking-tape-lavender -top-3"></div>

        <div className="space-y-4 relative z-0">
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2">
            <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-[#1C1B19]/10 text-[#1C1B19] ${project.badgeBg}`}>
              {project.badgeVariant}
            </span>
            <span className="text-[10px] font-mono text-[#57534E]">
              {project.deliverable}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold font-sans tracking-tight text-[#1C1B19]">
              {project.title}
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed mt-2 font-sans">
              {project.tagline}
            </p>
          </div>

          {/* Metrics Grid with Verification Tooltips */}
          <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-xs">
            {project.metrics.map(m => (
              <div key={m.label} className="bg-[#FAF7F0] p-2.5 rounded-xl border border-[#1C1B19]/8 flex flex-col justify-between">
                <div>
                  <VerificationTooltip
                    label={m.label}
                    command={m.command}
                    environment={m.environment}
                    repoUrl={project.repoUrl}
                    status={m.status}
                  />
                </div>
                <div className="text-[#1C1B19] font-bold text-xs mt-1">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Prominent "How Measured" Footnote */}
          <div className="p-3 rounded-xl bg-[#F4F1EA] border border-[#1C1B19]/8 text-[11px] font-mono text-[#57534E] leading-snug">
            <span className="font-bold text-[#1C1B19] block text-[10px] uppercase mb-0.5">// How Measured:</span>
            {project.howMeasured}
          </div>
        </div>

        {/* Footer Link to GitHub */}
        <div className="pt-5 mt-4 border-t border-[#1C1B19]/8 flex items-center justify-between text-xs font-mono font-semibold relative z-0">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#1C1B19] hover:underline"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Inspect GitHub Repo</span>
          </a>
          <ArrowUpRight className="w-4 h-4 text-[#1C1B19]" />
        </div>
      </div>
    </motion.div>
  );
}
