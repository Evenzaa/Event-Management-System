const TONE_CLASSES = {
  violet: 'bg-violet-600 text-white',
  music: 'bg-violet-100 text-violet-700',
  comedy: 'bg-emerald-100 text-emerald-700',
  sports: 'bg-amber-100 text-amber-700',
  arts: 'bg-pink-100 text-pink-700',
  pink: 'bg-pink-500/90 text-white',
};

export default function Badge({ children, tone = 'violet', className = '' }) {
  const toneClass = TONE_CLASSES[tone] || TONE_CLASSES.violet;
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}
