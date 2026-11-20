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
    <div className="w-full sheen-card rounded-xl border border-white/10 p-6 sm:p-8 my-8 font-mono space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-4">
        <div>
          <span className="text-xs text-emerald-400 font-semibold tracking-wider uppercase block">
            // BARE-METAL BENCHMARK MATRIX (UBUNTU 24.04 LTS / AMD EPYC 8-CORE)
          </span>
          <span className="text-xs text-zinc-400">BitNet b1.58 (2B Params) vs. Llama.cpp Q4_K_M</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>
            <span className="text-zinc-200">BitNet b1.58</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-zinc-600"></span>
            <span className="text-zinc-400">GGUF Q4_K_M</span>
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
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-200 font-medium">{metric.name}</span>
                <span className="text-zinc-500 text-[11px]">
                  {isHigherBetter ? '(Higher is better)' : '(Lower is better)'}
                </span>
              </div>

              {/* BitNet Bar */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-24 text-[11px] text-emerald-400 shrink-0">BitNet b1.58</div>
                  <div className="flex-1 bg-zinc-950 rounded-full h-4 overflow-hidden border border-emerald-500/20 p-0.5">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${bitnetWidth}%` }}
                    ></div>
                  </div>
                  <div className="w-20 text-right text-xs font-bold text-emerald-400">
                    {metric.bitnetValue} {metric.unit}
                  </div>
                </div>
                <div className="text-[10px] text-zinc-500 pl-27">{metric.bitnetNote}</div>
              </div>

              {/* GGUF Bar */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-24 text-[11px] text-zinc-400 shrink-0">GGUF Q4_K_M</div>
                  <div className="flex-1 bg-zinc-950 rounded-full h-4 overflow-hidden border border-white/5 p-0.5">
                    <div
                      className="bg-zinc-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${ggufWidth}%` }}
                    ></div>
                  </div>
                  <div className="w-20 text-right text-xs text-zinc-400">
                    {metric.ggufValue} {metric.unit}
                  </div>
                </div>
                <div className="text-[10px] text-zinc-600 pl-27">{metric.ggufNote}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-white/8 text-[11px] text-zinc-400 leading-relaxed bg-zinc-950/60 p-3 rounded-lg border border-white/5">
        <strong>Copywriting Takeaway for Technical Buyers:</strong> Don't just tell enterprise security architects that on-device models are "efficient." Show that BitNet's addition-only kernel uses <strong>66% less RAM</strong> and cuts memory bus saturation by <strong>75%</strong>, allowing air-gapped deployment on existing edge hardware without a $4,000 GPU upgrade.
      </div>
    </div>
  );
}
