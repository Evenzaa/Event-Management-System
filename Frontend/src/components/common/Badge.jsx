const TONE_CLASSES = {
  // UI tones
  violet:     'bg-violet-600 text-white',
  pink:       'bg-pink-500/90 text-white',

  // Category tones — match normalizeEvent()'s category (lowercased)
  music:      'bg-violet-100 text-violet-700',
  technology: 'bg-blue-100 text-blue-700',
  sports:     'bg-amber-100 text-amber-700',
  art:        'bg-pink-100 text-pink-700',
  education:  'bg-emerald-100 text-emerald-700',
  business:   'bg-indigo-100 text-indigo-700',
  food:       'bg-orange-100 text-orange-700',

  // Legacy aliases (kept so nothing breaks if old data comes through)
  comedy:     'bg-emerald-100 text-emerald-700',
  arts:       'bg-pink-100 text-pink-700',
};

export default function Badge({ children, tone = 'violet', className = '' }) {
  const toneClass = TONE_CLASSES[tone] ?? TONE_CLASSES.violet;
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
}
