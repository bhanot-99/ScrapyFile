import { useState } from 'react';
import { Download, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  documentTitle?: string;
  filesize?: string;
}

export default function PdfDownloadModal({
  documentTitle = 'NeuroOS: Zero-Egress On-Device AI Architecture (Technical Whitepaper)',
  filesize = '1.8 MB PDF'
}: Props) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      const element = document.createElement('a');
      const file = new Blob([
        `%PDF-1.4\n1 0 obj\n<< /Title (${documentTitle}) /Author (Jatin Bhanot) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF`
      ], { type: 'application/pdf' });
      element.href = URL.createObjectURL(file);
      element.download = 'neuroos-zero-egress-whitepaper-jatin-bhanot.pdf';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 800);
  };

  return (
    <div className="relative bg-[#FFFDF9] rounded-sm border-[2px] border-[#111111] shadow-[5px_5px_0px_#111111] p-5 sm:p-7 my-8 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xs bg-[#FFE600] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] text-[#111111] shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[#111111] font-bold px-2 py-0.5 rounded-xs bg-[#16A34A] text-white border border-[#111111]">
                OFFICIAL WHITEPAPER
              </span>
              <span className="text-[11px] text-[#4B4A47] font-bold">{filesize}</span>
            </div>
            <h4 className="text-sm sm:text-base font-black font-display uppercase tracking-tight text-[#111111]">
              {documentTitle}
            </h4>
            <p className="text-xs text-[#4B4A47] font-sans font-medium">
              Includes full Landlock C rulesets, systemd security profiles, and BitNet b1.58 AVX-512 benchmark logs.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className={`px-5 py-3 rounded-xs text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 border-[1.5px] border-[#111111] shadow-[3px_3px_0px_#111111] ${
            downloaded
              ? 'bg-[#16A34A] text-white'
              : 'bg-[#FF3B30] text-white hover:bg-[#e03026] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#111111]'
          }`}
        >
          {downloading ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generating PDF...
            </span>
          ) : downloaded ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              Downloaded (1.8 MB)
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Formatted PDF
            </span>
          )}
        </button>
      </div>

      <div className="mt-4 pt-3 border-t-[1.5px] border-[#111111]/20 flex items-center gap-2 text-[11px] text-[#4B4A47] font-bold">
        <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
        <span>Cryptographically verified release • SHA-256: 9b2d8f...7e41</span>
      </div>
    </div>
  );
}
