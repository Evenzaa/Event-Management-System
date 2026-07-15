const COLORS = ['text-violet-600','text-blue-500','text-green-500','text-pink-500','text-amber-500'];
export default function TopCategories({ categories = [] }) {
  return (
    <div className="rounded-2xl bg-white p-6 h-full">
      <h3 className="mb-5 text-base font-bold text-slate-800">Top Categories</h3>
      <ul className="space-y-4">
        {categories.map((cat, i) => (
          <li key={cat.name} className="flex items-center justify-between text-sm">
            <span className="text-slate-600">{cat.name}</span>
            <span className={`font-bold ${COLORS[i % COLORS.length]}`}>{cat.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
