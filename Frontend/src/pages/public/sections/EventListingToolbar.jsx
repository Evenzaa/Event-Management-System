import { Search, ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'popular',    label: 'Most Popular' },
  { value: 'date',       label: 'Soonest First' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];


export default function EventListingToolbar({ query, sort, total, onQueryChange, onSortChange }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">

      {/* Search */}
      <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <Search size={16} className="shrink-0 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search events..."
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      {/* Sort */}
      <div className="relative shrink-0">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-9 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              Sort: {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}
