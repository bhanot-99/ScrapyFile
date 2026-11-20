import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, MessageSquare, Mail, Terminal, Copy, Check } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: typeof Globe;
  description: string;
}

const TABS: TabItem[] = [
  { id: 'landing', label: '1. Landing Page Wireframe', icon: Globe, description: 'Above-the-fold developer acquisition engine' },
  { id: 'show-hn', label: '2. Show HN Launch Post', icon: MessageSquare, description: 'High-signal technical submission crafted for hacker frontpage' },
  { id: 'onboarding-emails', label: '3. 4-Part Onboarding Sequence', icon: Mail, description: 'Developer activation drip inside simulated inbox' },
  { id: 'release-notes', label: '4. Technical Release Notes', icon: Terminal, description: 'Zero-marketing technical changelog for v0.4.0' },
];

export default function LaunchKitTabs() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [activeEmailIdx, setActiveEmailIdx] = useState<number>(0);
  const [copiedCli, setCopiedCli] = useState(false);

  const handleCopyCli = () => {
    navigator.clipboard.writeText('cargo install agent-radar && agent-radar --watch');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const emails = [
    {
      day: 'Day 0 (Immediate)',
      subject: 'Agent-Radar: Your first trace on Linux (epoll multiplexing)',
      preview: 'Run your first epoll process capture in 30 seconds without root...',
      body: `Hey {{name}},

Jatin here, author of Agent-Radar.

Most developer tools send you a 14-page PDF guide or ask you to book a Zoom onboarding call. We won't do that.

Here is the one command to trace every transient bash process spawned by Claude Code, Devin, or Cursor on your workstation:

$ agent-radar --target ~/.anthropic/workspaces

Within 3 seconds, you will see real-time inotify file descriptors mapped to the exact PID that executed them—even if that PID only lived for 4 milliseconds.

If you encounter unexpected CPU wakeups under idle states, reply directly to this email with your kernel version (uname -r). I will inspect the epoll loop personally.

Best,
Jatin`
    },
    {
      day: 'Day 2',
      subject: 'Why your AI coding agents hide socket connects in transient subshells',
      preview: 'Deep dive into how rapid fork-and-exec masks exfiltration sockets...',
      body: `Hey {{name}},

When an autonomous coding agent edits a file, it often runs:
  bash -c "curl -s https://unknown-endpoint.internal/validate"

By the time traditional auditd or ps loops poll /proc, that PID has already exited. The file write happened, the socket opened, but your audit log says nothing.

Here is how we solved it with Landlock LSM and epoll multiplexing:
[Link: Read the 6-minute Kernel Deep Dive]

Try the strict sandboxing flag today:
$ agent-radar --enforce-landlock --deny-net

Happy hacking,
Jatin`
    },
    {
      day: 'Day 5',
      subject: 'Benchmarking concurrent transient processes without unbounded RSS',
      preview: 'How we keep memory bounded with an LRU cache with TTL eviction...',
      body: `Hey {{name}},

One common objection we get from DevOps teams:
"What happens to Agent-Radar when an agent script creates 1,000 subshells per second?"

The answer: Memory stays strictly bounded.

Because we maintain an LRU cache with TTL eviction in Rust, memory cannot grow unbounded. No unmetered heap allocations in the critical path.

Here is our benchmark harness repo:
github.com/bhanot1054/agent-radar

Have questions on setting this up in your CI container? Just hit reply.

Best,
Jatin`
    },
    {
      day: 'Day 10',
      subject: 'Exporting Agent-Radar audit traces directly into OpenTelemetry',
      preview: 'Hooking zero-privilege Linux observability into Datadog / Grafana...',
      body: `Hey {{name}},

Quick release update: v0.4.2 just dropped with native OTel grpc streaming.

Now you can pipe every AI agent execution into your company's Grafana or Honeycomb dashboards with a single environment variable:

$ export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
$ agent-radar --export otel

Would love your feedback on our trace spans.

Cheers,
Jatin`
    }
  ];

  return (
    <div className="w-full bg-[#FDFBF7] rounded-3xl border border-[#1C1B19]/8 shadow-paper-md overflow-hidden my-8">
      {/* Tab Navigation */}
      <div className="bg-[#FAF7F0] p-2.5 border-b border-[#1C1B19]/8 flex flex-wrap gap-1.5">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#E3DEFA] text-[#1C1B19] border-[#1C1B19]/10 shadow-sm'
                  : 'bg-[#FDFBF7] text-[#57534E] hover:text-[#1C1B19] border-[#1C1B19]/6'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <div className="p-6 sm:p-8 bg-[#FDFBF7]">
        <AnimatePresence mode="wait">
          {activeTab === 'landing' && (
            <motion.div
              key="tab-landing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="border border-[#1C1B19]/8 rounded-2xl bg-[#FAF7F0] p-6 sm:p-8 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#1C1B19]/8 pb-4">
                  <div className="font-mono text-xs font-bold text-[#1C1B19] uppercase">
                    // Deliverable 1: Landing Page Blueprint
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-[#1C1B19] bg-[#E3DEFA] px-2.5 py-0.5 rounded-full">Full Wireframe</span>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#D7F0DE] text-[#1C1B19] border border-[#1C1B19]/8">
                    ZERO-PRIVILEGE LINUX KERNEL TELEMETRY
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C1B19] tracking-tight">
                    Know Exactly What Your AI Coding Agents Touch on Linux.
                  </h3>
                  <p className="text-[#57534E] text-sm sm:text-base max-w-2xl leading-relaxed font-sans font-medium">
                    Multiplexing epoll and inotify to track microsecond subshells, file writes, and outbound sockets—without root permissions and with event-driven sleeping.
                  </p>
                </div>

                {/* Simulated CLI Copy Box */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2">
                  <div className="flex-1 bg-[#1C1B19] p-3.5 rounded-xl font-mono text-xs text-[#FDFBF7] flex items-center justify-between shadow-sm">
                    <span>cargo install agent-radar && agent-radar --watch</span>
                    <button
                      type="button"
                      onClick={handleCopyCli}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-[#E3DEFA] hover:text-[#1C1B19] text-[#FDFBF7] cursor-pointer ml-2 transition-colors"
                    >
                      {copiedCli ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="px-5 py-3 rounded-full bg-[#1C1B19] text-[#FDFBF7] font-sans text-xs font-bold text-center cursor-pointer shadow-paper-sm hover:-translate-y-0.5 transition-all">
                    Inspect Architecture (GitHub)
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#1C1B19]/8 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-white border border-[#1C1B19]/8 shadow-sm">
                    <div className="text-[#8A857D] font-medium">Memory Envelope</div>
                    <div className="text-[#1C1B19] font-bold text-sm mt-0.5">LRU Cache / TTL Eviction</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#1C1B19]/8 shadow-sm">
                    <div className="text-[#8A857D] font-medium">Idle CPU Drain</div>
                    <div className="text-[#1C1B19] font-bold text-sm mt-0.5">epoll_wait (Pending)</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#1C1B19]/8 shadow-sm">
                    <div className="text-[#8A857D] font-medium">Security Model</div>
                    <div className="text-[#2563EB] font-bold text-sm mt-0.5">Zero Root / Landlock</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'show-hn' && (
            <motion.div
              key="tab-hn"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-[#FAF7F0] rounded-2xl border border-[#1C1B19]/8 p-6 sm:p-7 space-y-4 font-mono shadow-sm">
                <div className="flex items-center justify-between text-xs border-b border-[#1C1B19]/8 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-[#FF6600] text-white font-bold flex items-center justify-center text-[11px]">
                      Y
                    </span>
                    <span className="text-[#1C1B19] font-bold font-sans">Hacker News Submission Copy</span>
                  </div>
                  <span className="text-[#1C1B19] font-semibold bg-[#EAF57A] px-2.5 py-0.5 rounded-full text-[11px]">Spec Sample // Show HN</span>
                </div>

                <div className="text-sm font-bold text-[#1C1B19] font-sans">
                  Show HN: Agent-Radar – Zero-overhead Linux telemetry for AI coding agents in Rust
                </div>

                <div className="text-xs text-[#1C1B19] leading-relaxed space-y-3 bg-[#FDFBF7] p-4 rounded-xl border border-[#1C1B19]/8">
                  <p>
                    Hi HN, I’m Jatin. I’ve been running local AI coding agents (Claude Code, Aider, OpenHands) on my Linux workstation and noticed a glaring gap:
                  </p>
                  <p>
                    These agents run hundreds of short-lived subshells (e.g. <code>`bash -c "..."`</code>) to test commands, inspect git status, and generate patches. Traditional auditing tools either:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[#57534E]">
                    <li>Rely on <code>auditd</code>, which floods dmesg and requires root privileges.</li>
                    <li>Poll <code>/proc</code> every 100ms, completely missing transient subshells that live under 20ms before PID reuse occurs.</li>
                  </ul>
                  <p>
                    I built <strong>Agent-Radar</strong> in Rust to solve this cleanly. It uses an <code>epoll_wait(-1)</code> reactor multiplexing Linux <code>inotify</code> file descriptor masks with correlation against <code>/proc/[pid]/stat</code> starttime. It runs entirely as an unprivileged user process.
                  </p>
                  <p>
                    Idle CPU avoids active polling via epoll_wait sleep, memory is strictly bounded via LRU caches with TTL eviction, and you can compile it with a single <code>cargo build --release</code>.
                  </p>
                  <p>
                    Source code: github.com/bhanot1054/agent-radar<br />
                    Would love feedback on our inotify rename cookie handling!
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'onboarding-emails' && (
            <motion.div
              key="tab-emails"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Email Sidebar List */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#57534E] font-semibold block mb-2">
                    4-Part Drip Sequence:
                  </span>
                  {emails.map((email, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveEmailIdx(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border font-mono text-xs transition-all cursor-pointer ${
                        activeEmailIdx === idx
                          ? 'bg-[#E3DEFA] border-[#1C1B19]/15 text-[#1C1B19] shadow-sm font-bold'
                          : 'bg-[#FAF7F0] border-[#1C1B19]/6 text-[#57534E] hover:text-[#1C1B19]'
                      }`}
                    >
                      <div className="text-[10px] text-[#1C1B19] font-bold mb-1">{email.day}</div>
                      <div className="font-semibold text-[#1C1B19] truncate">{email.subject}</div>
                      <div className="text-[11px] text-[#57534E] truncate mt-1">{email.preview}</div>
                    </button>
                  ))}
                </div>

                {/* Email Body Preview */}
                <div className="lg:col-span-2 bg-[#FDFBF7] rounded-2xl border border-[#1C1B19]/8 p-5 sm:p-6 font-mono text-xs shadow-paper-sm">
                  <div className="border-b border-[#1C1B19]/8 pb-3 mb-4 space-y-1">
                    <div className="text-[#57534E]">
                      <span className="text-[#8A857D]">Timing:</span> {emails[activeEmailIdx].day}
                    </div>
                    <div className="text-[#1C1B19] font-bold">
                      <span className="text-[#8A857D]">Subject:</span> {emails[activeEmailIdx].subject}
                    </div>
                    <div className="text-[#57534E]">
                      <span className="text-[#8A857D]">From:</span> Jatin Bhanot &lt;jatin@agentradar.dev&gt;
                    </div>
                  </div>

                  <pre className="whitespace-pre-wrap font-mono text-[#1C1B19] leading-relaxed text-xs">
                    {emails[activeEmailIdx].body}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'release-notes' && (
            <motion.div
              key="tab-release"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="bg-[#FDFBF7] rounded-2xl border border-[#1C1B19]/8 p-6 font-mono text-xs space-y-4 shadow-paper-sm">
                <div className="flex items-center justify-between border-b border-[#1C1B19]/8 pb-3">
                  <span className="text-[#16A34A] font-bold text-sm">agent-radar v0.4.0 — Zero-Egress Kernel Enforcement</span>
                  <span className="text-[#8A857D]">Released 2026-10-14</span>
                </div>

                <div className="space-y-4 text-[#1C1B19] font-sans">
                  <div>
                    <h4 className="text-[#1C1B19] font-bold mb-2">🚀 Architectural Highlights</h4>
                    <ul className="list-disc pl-5 space-y-1 text-[#57534E]">
                      <li><strong>Landlock LSM Integration:</strong> Added unprivileged network isolation flag <code>--deny-net</code>, blocking <code>socket(AF_INET, ...)</code> syscalls without root.</li>
                      <li><strong>PID Reuse Race Hardening:</strong> Replaced naive stat polling with atomic <code>btime</code> checks against Linux <code>/proc/sys/kernel/pid_max</code> bounds.</li>
                      <li><strong>LRU Cache with TTL Eviction:</strong> Memory overhead bounded under heavy load with zero unbounded dynamic allocations.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[#1C1B19] font-bold mb-2">⚡ Breaking Changes</h4>
                    <p className="text-[#57534E]">
                      Config flag <code>--strict-proc</code> has been deprecated in favor of <code>--enforce-landlock</code>. Minimum supported Linux kernel is now 5.13+.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
