import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../../layouts/Navbar';
import Footer from '../../layouts/Footer';
import { useEventListing } from '../../hooks/useEventListing';

import FilterSidebar       from './sections/FilterSidebar';
import EventListingToolbar from './sections/EventListingToolbar';
import EventsGrid          from './sections/EventsGrid';
import Pagination          from './sections/Pagination';

export default function EventListing() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    events, total, totalPages, page,
    categoryCounts,
    isLoading, error,
    filters, pendingFilters,
    setQuery, setSort,
    updatePendingFilter,
    applyFilters, resetFilters,
    goToPage,
  } = useEventListing({
    initialQuery:    searchParams.get('q')        || '',
    initialCategory: searchParams.get('category') || 'all',
  });

  function handleBookNow(event) {
    navigate(`/events/${event.id}`);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Browse Events</h1>
          {!isLoading && (
            <p className="mt-1 text-sm text-slate-500">
              Showing {total} event{total !== 1 ? 's' : ''}
              {filters.location ? ` near ${filters.location}` : ''}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

          <FilterSidebar
            pendingFilters={pendingFilters}
            categoryCounts={categoryCounts}
            onUpdate={updatePendingFilter}
            onApply={applyFilters}
            onReset={resetFilters}
          />

          <div className="flex-1 min-w-0">
            <EventListingToolbar
              query={filters.query}
              sort={filters.sort}
              total={total}
              onQueryChange={setQuery}
              onSortChange={setSort}
            />

            {error ? (
              <div className="rounded-2xl bg-red-50 p-6 text-center text-sm text-red-600">
                Something went wrong loading events. Please try again.
              </div>
            ) : (
              <>
                <EventsGrid
                  events={events}
                  isLoading={isLoading}
                  onBook={handleBookNow}
                />
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                />
              </>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
