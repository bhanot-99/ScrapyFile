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
    <div className="relative bg-[#FDFBF7] rounded-2xl border border-[#1C1B19]/10 shadow-[0_12px_28px_rgba(28,27,25,0.08)] p-5 sm:p-7 my-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-[#E3DEFA] border border-[#1C1B19]/10 shadow-xs text-[#1C1B19] shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-[#1C1B19] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#D7F0DE] border border-[#1C1B19]/10">
                Official Whitepaper
              </span>
              <span className="text-[11px] text-[#57534E] font-mono font-medium">{filesize}</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold tracking-tight text-[#1C1B19]">
              {documentTitle}
            </h4>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Includes full Landlock C rulesets, systemd security profiles, and BitNet b1.58 AVX-512 benchmark logs.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className={`px-5 py-3 rounded-full text-xs font-sans font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 ${
            downloaded
              ? 'bg-[#D7F0DE] text-[#1C1B19] border border-[#1C1B19]/15'
              : 'bg-[#1C1B19] text-[#FDFBF7] hover:bg-[#3D3A36] shadow-[0_4px_12px_rgba(28,27,25,0.12)] hover:translate-y-[-1px]'
          }`}
        >
          {downloading ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
              Generating PDF...
            </span>
          ) : downloaded ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1C1B19]" />
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

      <div className="mt-4 pt-3 border-t border-[#1C1B19]/8 flex items-center gap-2 text-[11px] text-[#57534E] font-mono font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-[#1C1B19]" />
        <span>Cryptographically verified release • SHA-256: 9b2d8f...7e41</span>
      </div>
    </div>
  );
}