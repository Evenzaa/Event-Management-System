import { formatPrice, getDiscountPercent } from '../../utils/formatters';


export default function DealCard({ deal }) {
  const discount = getDiscountPercent(deal.originalPrice, deal.price);

  return (
    <article className="flex items-center gap-4 rounded-2xl bg-white/10 p-3 backdrop-blur-sm">
      <img
        src={deal.imageUrl}
        alt={deal.title}
        className="h-16 w-16 shrink-0 rounded-xl object-cover"
        loading="lazy"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-white line-clamp-1">{deal.title}</h3>
        <p className="text-sm text-slate-300">
          {deal.timeLabel} &middot; {deal.venue}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="font-bold text-white">{formatPrice(deal.price)}</p>
        {discount > 0 && (
          <p className="text-xs text-slate-400 line-through">
            {formatPrice(deal.originalPrice)}
          </p>
        )}
      </div>
    </article>
  );
}
