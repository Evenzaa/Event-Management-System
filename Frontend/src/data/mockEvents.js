export const CATEGORIES = [
  { id: 'music',      label: 'Music',             icon: 'Music' },
  { id: 'technology', label: 'Tech & Conferences', icon: 'Laptop' },
  { id: 'sports',     label: 'Sports',             icon: 'Trophy' },
  { id: 'art',        label: 'Arts & Culture',     icon: 'Palette' },
  { id: 'food',       label: 'Food & Drink',       icon: 'UtensilsCrossed' },
  { id: 'education',  label: 'Education',          icon: 'GraduationCap' },
  { id: 'business',   label: 'Business',           icon: 'Briefcase' },
  { id: 'more',       label: 'More',               icon: 'MoreHorizontal' },
];

// NOTE: these will eventually come from a GET /api/stats endpoint.
// When that's ready, move them to eventsService.getStats() like the others.
export const STATS = [
  { id: 'events',       value: '50K+', label: 'Events Listed' },
  { id: 'attendees',    value: '2M+',  label: 'Happy Attendees' },
  { id: 'satisfaction', value: '98%',  label: 'Satisfaction Rate' },
];
