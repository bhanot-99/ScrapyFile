interface MetricItem {
  name: string;
  bitnetValue: number;
  ggufValue: number;
  unit: string;
  format?: 'lower-is-better' | 'higher-is-better';
  bitnetNote: string;
  ggufNote: string;
}

const METRICS: MetricItem[] = [
  {
    name: 'Memory Footprint (Theoretical 2B Weights)',
    bitnetValue: 1.8,
    ggufValue: 5.4,
    unit: 'GB',
    format: 'lower-is-better',
    bitnetNote: '1.58-bit ternary integer weights {-1, 0, 1}',
    ggufNote: '4-bit integer quantized GGUF Q4_K_M'
  },
  {
    name: 'Matrix Arithmetic Type',
    bitnetValue: 1,
    ggufValue: 4,
    unit: 'bits',
    format: 'lower-is-better',
    bitnetNote: 'Addition-only matrix kernel (zero float multiply)',
    ggufNote: 'SIMD dequantize + FP32 dot product multiply'
  },
  {
    name: 'Estimated Memory Bus Bandwidth Need',
    bitnetValue: 18.2,
    ggufValue: 72.6,
    unit: 'GB/s',
    format: 'lower-is-better',
    bitnetNote: 'Cache-resident weights; CPU bus demand lower',
    ggufNote: 'Continuous bus saturation on wide prompt feeds'
  }
];

export default function BenchmarkBars() {
  return (
    <div className="w-full bg-[#FDFBF7] rounded-2xl border border-[#1C1B19]/10 shadow-[0_12px_28px_rgba(28,27,25,0.08)] p-6 sm:p-8 my-8 font-sans space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1C1B19]/8 pb-4">
        <div>
          <span className="text-[11px] text-[#1C1B19] font-mono font-semibold tracking-wider uppercase bg-[#E3DEFA] px-2.5 py-1 rounded-full border border-[#1C1B19]/10 inline-block mb-1.5">
            Architecture Spec Comparison: BitNet b1.58 vs Q4_K_M
          </span>
          <div className="text-xs text-[#57534E] font-medium font-sans">
            Theoretical trade-off matrix (Hardware lab benchmark run currently in progress)
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#D7F0DE] rounded-full border border-[#1C1B19]/20"></span>
            <span className="text-[#1C1B19]">BitNet b1.58</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#1C1B19] rounded-full"></span>
            <span className="text-[#57534E]">GGUF Q4_K_M</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {METRICS.map((metric, idx) => {
          const isHigherBetter = metric.format === 'higher-is-better';
          const maxVal = Math.max(metric.bitnetValue, metric.ggufValue);
          const bitnetWidth = (metric.bitnetValue / maxVal) * 100;
          const ggufWidth = (metric.ggufValue / maxVal) * 100;

          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#1C1B19]">{metric.name}</span>
                <span className="text-[#57534E]/70 text-[11px] font-mono">
                  {isHigherBetter ? '(Higher is better)' : '(Lower is better)'}
                </span>
              </div>

              {/* BitNet Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <div className="w-24 text-[11px] font-mono font-semibold text-[#1C1B19] shrink-0">BitNet b1.58</div>
                  <div className="flex-1 bg-[#F4F1EA] rounded-full h-4 overflow-hidden border border-[#1C1B19]/10 p-0.5">
                    <div
                      className="bg-[#D7F0DE] h-full rounded-full transition-all duration-500 border border-[#1C1B19]/15"
                      style={{ width: `${bitnetWidth}%` }}
                    ></div>
                  </div>
                  <div className="w-20 text-right text-xs font-mono font-bold text-[#1C1B19]">
                    {metric.bitnetValue} {metric.unit}
                  </div>
                </div>
                <p className="text-[11px] text-[#57534E] pl-27 italic">{metric.bitnetNote}</p>
              </div>

              {/* GGUF Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <div className="w-24 text-[11px] font-mono text-[#57534E] shrink-0">GGUF Q4_K_M</div>
                  <div className="flex-1 bg-[#F4F1EA] rounded-full h-4 overflow-hidden border border-[#1C1B19]/10 p-0.5">
                    <div
                      className="bg-[#1C1B19]/60 h-full rounded-full transition-all duration-500"
                      style={{ width: `${ggufWidth}%` }}
                    ></div>
                  </div>
                  <div className="w-20 text-right text-xs font-mono text-[#57534E]">
                    {metric.ggufValue} {metric.unit}
                  </div>
                </div>
                <p className="text-[11px] text-[#57534E]/80 pl-27 italic">{metric.ggufNote}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}