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
      className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#FFFDF9] border-[1.5px] border-[#111111] shadow-[2.5px_2.5px_0px_#111111] hover:shadow-[3.5px_3.5px_0px_#FF3B30] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] text-xs font-mono font-bold text-[#111111] transition-all cursor-pointer"
    >
      <span>{label || email}</span>
      <span className="p-1 rounded-xs bg-[#F3F1EC] border border-[#111111] text-[#111111] group-hover:bg-[#FFE600] transition-colors">
        {copied ? (
          <Check className="w-3.5 h-3.5 text-[#16A34A]" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-[#111111]" />
        )}
      </span>
      {copied && (
        <span className="text-[10px] text-[#16A34A] font-mono font-bold tracking-tight">
          COPIED!
        </span>
      )}
    </button>
  );
}
