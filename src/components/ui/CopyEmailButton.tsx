import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  email?: string;
  label?: string;
}

export default function CopyEmailButton({ email = 'bhanot1054@gmail.com', label }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy email address"
      className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 hover:border-emerald-500/40 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer"
    >
      <span className="text-zinc-200 font-medium">{label || email}</span>
      <span className="p-1 rounded bg-white/5 group-hover:bg-emerald-500/20 text-zinc-400 group-hover:text-emerald-400 transition-colors">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </span>
      {copied && (
        <span className="text-[10px] text-emerald-400 font-mono tracking-tight animate-fade-in">
          Copied!
        </span>
      )}
    </button>
  );
}
