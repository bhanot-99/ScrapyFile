import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, GitBranch } from 'lucide-react';

interface ProjectProof {
  id: string;
  title: string;
  tagline: string;
  deliverable: string;
  badgeVariant: string;
  badgeBg: string;
  repoUrl: string;
  metrics: { label: string; value: string }[];
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
      { label: 'Idle CPU (epoll_wait)', value: 'Measurement Pending' },
      { label: 'Memory Footprint (LRU Cache)', value: 'Measurement Pending' },
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
      { label: 'Network Egress Allowed', value: '0 Bytes (Hard Block)' },
      { label: 'Sandbox Mechanism', value: 'Landlock LSM' },
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
      { label: 'Small-Object Detection', value: 'SAHI Tiling' },
      { label: 'Latency Benchmarking', value: 'Measurement Pending' },
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

  // Card 2: Centers
  const card2Y = useTransform(fanProgress, [0, 1], [0, -8]);
  const card2Rotate = useTransform(fanProgress, [0, 1], [0, 0]);

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
            No mock agency slides. Every case study below is tied to real repositories with reproducible test commands and honest "how measured" annotations.
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

// Subcomponent with 3D Card Tilt & Glare on hover
function InteractiveTiltCard({
  project,
  motionStyle
}: {
  project: ProjectProof;
  motionStyle: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
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
            ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(-4px)`
            : 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.3s ease-out'
        }}
        className="relative bg-[#FDFBF7] rounded-3xl p-6 sm:p-7 border border-[#1C1B19]/10 shadow-paper-md hover:shadow-paper-lg flex flex-col justify-between flex-1 paper-fold overflow-hidden"
      >
        {/* Top Washi Tape */}
        <div className="masking-tape masking-tape-lavender -top-3"></div>

        <div className="space-y-4">
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

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-xs">
            {project.metrics.map(m => (
              <div key={m.label} className="bg-[#FAF7F0] p-2.5 rounded-xl border border-[#1C1B19]/8">
                <div className="text-[10px] text-[#57534E]">{m.label}</div>
                <div className="text-[#1C1B19] font-bold text-xs mt-0.5">{m.value}</div>
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
        <div className="pt-5 mt-4 border-t border-[#1C1B19]/8 flex items-center justify-between text-xs font-mono font-semibold">
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