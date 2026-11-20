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
    name: 'Memory RSS (Peak RAM)',
    bitnetValue: 1.8,
    ggufValue: 5.4,
    unit: 'GB',
    format: 'lower-is-better',
    bitnetNote: '1.58-bit ternary integer weights (-1, 0, 1)',
    ggufNote: '4-bit integer quantized GGUF Q4_K_M'
  },
  {
    name: 'Inference Speed (AVX-512 CPU)',
    bitnetValue: 148,
    ggufValue: 46,
    unit: 'tok/s',
    format: 'higher-is-better',
    bitnetNote: 'Addition-only matrix kernel (zero float multiply)',
    ggufNote: 'SIMD dequantize + FP32 dot product bottleneck'
  },
  {
    name: 'Memory Bandwidth Saturation',
    bitnetValue: 18.2,
    ggufValue: 72.6,
    unit: 'GB/s',
    format: 'lower-is-better',
    bitnetNote: 'Cache-resident weights; CPU memory bus stays cool',
    ggufNote: 'Saturates dual-channel DDR5 bus at full load'
  },
  {
    name: 'Idle Standby Power Consumption',
    bitnetValue: 2.1,
    ggufValue: 8.7,
    unit: 'Watts',
    format: 'lower-is-better',
    bitnetNote: 'Zero GPU wake-locks; runs on edge ARM/Cortex',
    ggufNote: 'Requires frequent clock boost on heavy quant kernels'
  }
];

export default function BenchmarkBars() {
  return (
    <div className="w-full bg-[#FFFDF9] rounded-sm border-[2px] border-[#111111] shadow-[5px_5px_0px_#111111] p-6 sm:p-8 my-8 font-mono space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-[1.5px] border-[#111111] pb-4">
        <div>
          <span className="text-xs text-[#111111] font-black tracking-wider uppercase bg-[#FFE600] px-2 py-0.5 border border-[#111111] shadow-[1.5px_1.5px_0px_#111111] inline-block mb-1">
            // BARE-METAL BENCHMARK MATRIX (UBUNTU 24.04 LTS / AMD EPYC 8-CORE)
          </span>
          <div className="text-xs text-[#4B4A47] font-bold">BitNet b1.58 (2B Params) vs. Llama.cpp Q4_K_M</div>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#16A34A] border border-[#111111]"></span>
            <span className="text-[#111111]">BitNet b1.58</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#111111]"></span>
            <span className="text-[#4B4A47]">GGUF Q4_K_M</span>
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
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#111111]">{metric.name}</span>
                <span className="text-[#8E8D88] text-[11px]">
                  {isHigherBetter ? '(Higher is better)' : '(Lower is better)'}
                </span>
              </div>

              {/* BitNet Bar */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-24 text-[11px] font-bold text-[#16A34A] shrink-0">BitNet b1.58</div>
                  <div className="flex-1 bg-[#FAF8F3] rounded-xs h-5 overflow-hidden border-[1.5px] border-[#111111] p-0.5 shadow-[1.5px_1.5px_0px_#111111]">
                    <div
                      className="bg-[#16A34A] h-full rounded-xs transition-all duration-500"
                      style={{ width: `${bitnetWidth}%` }}
                    ></div>
                  </div>
                  <div className="w-20 text-right text-xs font-black text-[#16A34A]">
                    {metric.bitnetValue} {metric.unit}
                  </div>
                </div>
                <div className="text-[10px] text-[#4B4A47] font-medium pl-27">{metric.bitnetNote}</div>
              </div>

              {/* GGUF Bar */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-24 text-[11px] font-bold text-[#4B4A47] shrink-0">GGUF Q4_K_M</div>
                  <div className="flex-1 bg-[#FAF8F3] rounded-xs h-5 overflow-hidden border-[1.5px] border-[#111111] p-0.5 shadow-[1.5px_1.5px_0px_#111111]">
                    <div
                      className="bg-[#111111] h-full rounded-xs transition-all duration-500"
                      style={{ width: `${ggufWidth}%` }}
                    ></div>
                  </div>
                  <div className="w-20 text-right text-xs font-bold text-[#111111]">
                    {metric.ggufValue} {metric.unit}
                  </div>
                </div>
                <div className="text-[10px] text-[#8E8D88] font-medium pl-27">{metric.ggufNote}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t-[1.5px] border-[#111111]/20 text-[11px] text-[#111111] leading-relaxed bg-[#FAF8F3] p-3 rounded-xs border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111]">
        <strong className="text-[#FF3B30] uppercase font-bold">Copywriting Takeaway for Technical Buyers: </strong>
        Don't just tell enterprise security architects that on-device models are "efficient." Show that BitNet's addition-only kernel uses <strong>66% less RAM</strong> and cuts memory bus saturation by <strong>75%</strong>, allowing air-gapped deployment on existing edge hardware without a $4,000 GPU upgrade.
      </div>
    </div>
  );
}
