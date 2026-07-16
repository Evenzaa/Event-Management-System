export default function GrowthChart({ data = [] }) {
  if (!data.length) return (
    <div className="flex h-48 items-center justify-center text-sm text-slate-400">No data</div>
  );
  const max = Math.max(...data.map((d) => d.value));
  const BAR_W = 32, GAP = 10, H = 180;
  const W = data.length * (BAR_W + GAP) - GAP;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-48">
      {data.map((d, i) => {
        const barH = max ? (d.value / max) * H * 0.92 : 0;
        return (
          <rect key={i} x={i * (BAR_W + GAP)} y={H - barH} width={BAR_W} height={barH}
            rx={5} fill={i % 2 === 0 ? '#c4b5fd' : '#6366f1'} opacity={i % 2 === 0 ? 0.55 : 1} />
        );
      })}
    </svg>
  );
}
