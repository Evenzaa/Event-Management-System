import { useState } from 'react';
import { Search } from 'lucide-react';
import Button from '../common/Button';


export default function HeroSearchBar({ categories = [], onSearch, isSearching = false }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch?.({ query, category });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-2xl bg-white p-2 shadow-xl sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-2 px-3">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events, artists, venues..."
          className="w-full border-none py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-600 focus:outline-none sm:border-none"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.label}
          </option>
        ))}
      </select>

      <Button type="submit" size="md" disabled={isSearching} className="shrink-0">
        {isSearching ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
}
