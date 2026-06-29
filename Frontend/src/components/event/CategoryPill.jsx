import * as Icons from 'lucide-react';

export default function CategoryPill({ category, isActive, onClick }) {
  const IconComponent = Icons[category.icon] || Icons.Circle;

  return (
    <button
      type="button"
      onClick={() => onClick?.(category)}
      className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
        isActive
          ? 'border-transparent bg-gradient-to-r from-violet-600 to-blue-500 text-white'
          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
      }`}
    >
      <IconComponent size={16} />
      {category.label}
    </button>
  );
}
