/**
 * Shared formatters for anything event/price/date related.
 * Keeping these here means components/event/* and future pages
 * (checkout, admin, etc.) all format things the same way.
 */

export function formatPrice(amount) {
  if (amount === 0) return 'Free';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateLabel(isoDate) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function getDiscountPercent(original, current) {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}
