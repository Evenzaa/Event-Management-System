export function formatPrice(amount) {
  if (!amount || amount === 0) return 'Free';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateLabel(isoDate) {
  if (!isoDate) return '';
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

export function normalizeEvent(raw) {
  return {
    // Identity
    id:            raw._id,
    title:         raw.title,
    description:   raw.description,

    // Location & time
    venue:         raw.location,
    rawDate:       raw.date,
    dateLabel:     formatDateLabel(raw.date),

    // Pricing
    price:         raw.price,
    priceFrom:     raw.price,                     
    originalPrice: raw.discountPrice ?? null,     
    timeLabel:     deriveTimeLabel(raw.date),     

    // Media
    imageUrl:      raw.images?.[0] ?? '',

    // Taxonomy
    category:      raw.category?.toLowerCase(),   
    badgeLabel:    raw.category ?? '',

    // Status flags
    featured:      raw.featured ?? false,
    isLastMinute:  raw.isLastMinute ?? false,
    availableSeats: raw.availableSeats,
    capacity:      raw.capacity,
    status:        raw.status,

    // Relations
    organizerId:   raw.organizerId,
    tags:          raw.tags ?? [],
  };
}

function deriveTimeLabel(isoDate) {
  if (!isoDate) return '';
  const now   = new Date();
  const event = new Date(isoDate);
  const diffDays = Math.round((event - now) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0)  return 'Tonight';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays <= 6)  return 'This Weekend';
  return formatDateLabel(isoDate);
}
