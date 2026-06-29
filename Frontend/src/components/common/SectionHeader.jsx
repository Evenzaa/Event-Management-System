
export default function SectionHeader({ title, actionLabel, onActionClick }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      {actionLabel && (
        <button
          type="button"
          onClick={onActionClick}
          className="flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700 cursor-pointer"
        >
          {actionLabel}
          <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  );
}
