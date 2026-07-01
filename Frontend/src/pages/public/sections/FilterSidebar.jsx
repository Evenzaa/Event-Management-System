import { CATEGORIES } from '../../../data/mockEvents';
import Button from '../../../components/common/Button';
import { MapPin } from 'lucide-react';

const DATE_OPTIONS = [
  { id: 'this-weekend', label: 'This Weekend' },
  { id: 'this-month',   label: 'This Month' },
  { id: 'next-month',   label: 'Next Month' },
];


export default function FilterSidebar({
  pendingFilters,
  categoryCounts,
  onUpdate,
  onApply,
  onReset,
}) {
  const { category, dateFilter, minPrice, maxPrice, location } = pendingFilters;

  function toggleCategory(id) {
    onUpdate('category', category === id ? 'all' : id);
  }

  return (
    <aside className="w-full shrink-0 lg:w-56 xl:w-60">
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Filters</h2>
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-medium text-violet-600 hover:text-violet-700 cursor-pointer"
          >
            Reset
          </button>
        </div>

        <div className="h-px bg-slate-100 mb-6" />

        {/* Category */}
        <section className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Category</h3>
          <ul className="space-y-2.5">
            {CATEGORIES.filter((c) => c.id !== 'more').map((cat) => {
              const isChecked = category === cat.id;
              const count = categoryCounts[cat.id] ?? 0;
              return (
                <li key={cat.id}>
                  <label className="flex cursor-pointer items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCategory(cat.id)}
                        className="h-4 w-4 accent-violet-600 cursor-pointer"
                      />
                      <span
                        className={`text-sm ${
                          isChecked ? 'font-semibold text-slate-900' : 'text-slate-600'
                        }`}
                      >
                        {cat.label}
                      </span>
                    </div>
                    {count > 0 && (
                      <span className="text-xs text-slate-400">({count})</span>
                    )}
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="h-px bg-slate-100 mb-6" />

        {/* Date */}
        <section className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Date</h3>
          <div className="space-y-2">
            {DATE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onUpdate('dateFilter', dateFilter === opt.id ? 'all' : opt.id)
                }
                className={`w-full rounded-xl px-4 py-2.5 text-sm font-medium text-center transition-colors cursor-pointer ${
                  dateFilter === opt.id
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        <div className="h-px bg-slate-100 mb-6" />

        {/* Price Range */}
        <section className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Price Range</h3>
          <input
            type="range"
            min={0}
            max={500}
            value={maxPrice}
            onChange={(e) => onUpdate('maxPrice', Number(e.target.value))}
            className="w-full accent-violet-600 cursor-pointer"
          />
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>Free</span>
            <span className="font-medium text-violet-600">up to ${maxPrice}</span>
          </div>
        </section>

        <div className="h-px bg-slate-100 mb-6" />

        {/* Location */}
        <section className="mb-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Location</h3>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <MapPin size={15} className="shrink-0 text-slate-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => onUpdate('location', e.target.value)}
              placeholder="Enter city or zip..."
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </section>

        {/* Apply */}
        <Button className="w-full" size="md" onClick={onApply}>
          Apply Filters
        </Button>

      </div>
    </aside>
  );
}
