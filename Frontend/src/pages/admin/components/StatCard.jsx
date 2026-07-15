export default function StatCard({ icon: Icon, value, label, highlight = false, iconColor = 'text-violet-500' }) {
  return (
    <div className={`rounded-2xl p-6 ${highlight
      ? 'bg-gradient-to-br from-violet-500 to-blue-500 text-white'
      : 'bg-white text-slate-800'}`}>
      <Icon size={22} className={highlight ? 'text-white/80' : iconColor} />
      <p className={`mt-3 text-3xl font-bold tracking-tight ${highlight ? 'text-white' : 'text-slate-900'}`}>
        {value}
      </p>
      <p className={`mt-1 text-sm ${highlight ? 'text-white/70' : 'text-slate-500'}`}>{label}</p>
    </div>
  );
}
