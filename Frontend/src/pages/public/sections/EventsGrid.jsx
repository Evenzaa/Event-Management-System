import { formatPrice } from '../../../utils/formatters';
import Badge from '../../../components/common/Badge';
import Button from '../../../components/common/Button';


function ExploreEventCard({ event, onBook }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-52">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {event.category && (
          <Badge
            tone={event.category}
            className="absolute left-3 top-3 capitalize"
          >
            {event.badgeLabel}
          </Badge>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-1 font-semibold text-slate-900 line-clamp-1">
          {event.title}
        </h3>
        <p className="mb-4 text-sm text-slate-500">
          {event.dateLabel} &middot; {event.venue}
        </p>

        <div className="flex items-center justify-between">
          <p className="font-bold text-violet-600">
            From {formatPrice(event.priceFrom)}
          </p>
          <Button size="sm" onClick={() => onBook?.(event)}>
            Book
          </Button>
        </div>
      </div>
    </article>
  );
}

/**
 * EventsGrid
 * ---------------------------------------------------------------
 * Renders the results grid, empty state, and loading skeletons.
 * ---------------------------------------------------------------
 */
export default function EventsGrid({ events, isLoading, onBook }) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="h-52 animate-pulse bg-slate-100" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
              <div className="h-8 w-full animate-pulse rounded-full bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-4xl">🔍</p>
        <p className="mt-4 text-lg font-semibold text-slate-700">No events found</p>
        <p className="mt-1 text-sm text-slate-400">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <ExploreEventCard key={event.id} event={event} onBook={onBook} />
      ))}
    </div>
  );
}
