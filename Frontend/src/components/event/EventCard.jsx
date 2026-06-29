import Badge from '../common/Badge';
import Button from '../common/Button';
import { formatPrice } from '../../utils/formatters';


export default function EventCard({ event, variant = 'featured', onBookNow }) {
  const isFeatured = variant === 'featured';

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className={`relative ${isFeatured ? 'h-48' : 'h-36'}`}>
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {isFeatured && event.featured && (
          <Badge tone="violet" className="absolute left-3 top-3">
            Featured
          </Badge>
        )}
        {!isFeatured && event.badgeLabel && (
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
        <p className="mb-3 text-sm text-slate-500">
          {event.dateLabel} &middot; {event.venue}
        </p>

        <div className="flex items-center justify-between">
          <p className="font-bold text-violet-600">
            {isFeatured ? (
              <>
                From {formatPrice(event.priceFrom)}
              </>
            ) : (
              formatPrice(event.price)
            )}
          </p>

          {isFeatured && (
            <Button size="sm" onClick={() => onBookNow?.(event)}>
              Book Now
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
