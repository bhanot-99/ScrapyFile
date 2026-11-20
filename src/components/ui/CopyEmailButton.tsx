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
      className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDFBF7] border border-[#1C1B19]/10 shadow-paper-sm hover:shadow-paper-md hover:border-[#1C1B19]/20 hover:-translate-y-0.5 active:translate-y-0 text-xs font-mono font-medium text-[#1C1B19] transition-all cursor-pointer"
    >
      <span>{label || email}</span>
      <span className="p-1 rounded-full bg-[#E3DEFA] text-[#1C1B19] transition-colors">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-[#16A34A]" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-[#1C1B19]" />
        )}
      </span>
      {copied && (
        <span className="text-[10px] text-[#16A34A] font-mono font-bold tracking-tight">
          Copied!
        </span>
      )}
    </button>
  );
}
