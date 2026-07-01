import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  function getPageNumbers() {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (page >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  }

  const pages = getPageNumbers();

  const baseBtn =
    'flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-sm font-medium transition-colors cursor-pointer';

  return (
    <div className="mt-10 flex items-center justify-center gap-2">

      {/* Previous */}
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`${baseBtn} border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <ChevronLeft size={16} />
        <span className="ml-1 hidden sm:inline">Previous</span>
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-1 text-slate-400">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`${baseBtn} ${
              p === page
                ? 'bg-violet-600 text-white shadow-sm'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`${baseBtn} border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <span className="mr-1 hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>

    </div>
  );
}
