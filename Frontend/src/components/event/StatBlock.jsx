export default function StatBlock({ value, label }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-white sm:text-3xl">{value}</p>
      <p className="text-sm text-slate-300">{label}</p>
    </div>
  );
}
