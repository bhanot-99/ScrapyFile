import { useState } from 'react';
import { Terminal, Cpu, GitBranch, ExternalLink, HelpCircle, CheckCircle2 } from 'lucide-react';

interface VerificationProps {
  label: string;
  command?: string;
  environment?: string;
  repoUrl?: string;
  commitRef?: string;
  status?: string;
}

export default function VerificationTooltip({
  label,
  command = 'cargo test --release',
  environment = 'Linux 6.8+ x86_64',
  repoUrl = 'https://github.com/bhanot1054/agent-radar',
  commitRef = 'main',
  status = 'Release benchmark pending hardware run'
}: VerificationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        aria-expanded={isOpen}
        aria-label={`Verification details for ${label}`}
        className="inline-flex items-center gap-1 text-[11px] font-mono text-[#8A857D] hover:text-[#1C1B19] underline decoration-dotted underline-offset-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B19] focus-visible:rounded"
      >
        <span>{label}</span>
        <HelpCircle className="w-3 h-3 text-[#8A857D] opacity-80" />
      </button>

      {isOpen && (
        <div
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-3.5 bg-[#FDFBF7] text-[#1C1B19] rounded-2xl border border-[#1C1B19]/12 shadow-paper-lg font-sans text-xs space-y-2.5 pointer-events-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1C1B19]/8 pb-2">
            <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-[#1C1B19] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
              // VERIFICATION SPEC
            </span>
            <span className="text-[10px] font-mono text-[#8A857D]">{commitRef}</span>
          </div>

          {/* Test Command */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-semibold text-[#57534E] flex items-center gap-1">
              <Terminal className="w-3 h-3" />
              <span>Exact Test Command:</span>
            </div>
            <code className="block bg-[#FAF7F0] p-1.5 rounded-lg font-mono text-[11px] text-[#1C1B19] border border-[#1C1B19]/8 break-all">
              {command}
            </code>
          </div>

          {/* Hardware & OS Environment */}
          <div className="space-y-0.5">
            <div className="text-[10px] font-mono font-semibold text-[#57534E] flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              <span>Hardware / Kernel Target:</span>
            </div>
            <div className="text-[11px] font-mono text-[#1C1B19]">{environment}</div>
          </div>

          {/* Status Note */}
          <div className="text-[10px] text-[#8A857D] italic bg-[#FAF7F0] p-1.5 rounded-lg border border-[#1C1B19]/6">
            {status}
          </div>

          {/* Source Repo Link */}
          {repoUrl && (
            <div className="pt-1 border-t border-[#1C1B19]/8">
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#1C1B19] hover:underline"
              >
                <GitBranch className="w-3 h-3" />
                <span>Inspect Repository on GitHub</span>
                <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
