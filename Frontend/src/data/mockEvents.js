export const CATEGORIES = [
  { id: 'music', label: 'Music', icon: 'Music' },
  { id: 'tech', label: 'Tech & Conferences', icon: 'Laptop' },
  { id: 'sports', label: 'Sports', icon: 'Trophy' },
  { id: 'arts', label: 'Arts & Culture', icon: 'Palette' },
  { id: 'food', label: 'Food & Drink', icon: 'UtensilsCrossed' },
  { id: 'education', label: 'Education', icon: 'GraduationCap' },
  { id: 'wellness', label: 'Health & Wellness', icon: 'HeartPulse' },
  { id: 'more', label: 'More', icon: 'MoreHorizontal' },
];

export const STATS = [
  { id: 'events', value: '50K+', label: 'Events Listed' },
  { id: 'attendees', value: '2M+', label: 'Happy Attendees' },
  { id: 'satisfaction', value: '98%', label: 'Satisfaction Rate' },
];

export const FEATURED_EVENTS = [
  {
    id: 'evt-001',
    title: 'Electric Dreams Festival 2025',
    date: '2025-07-15',
    dateLabel: 'Jul 15',
    venue: 'Madison Square Garden, NY',
    priceFrom: 89,
    imageUrl:
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop',
    category: 'music',
    featured: true,
  },
  {
    id: 'evt-002',
    title: 'Global Tech Summit 2025',
    date: '2025-08-03',
    dateLabel: 'Aug 3',
    venue: 'San Francisco Convention Center',
    priceFrom: 199,
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
    category: 'tech',
    featured: true,
  },
  {
    id: 'evt-003',
    title: 'NBA Finals Watch Party',
    date: '2025-06-28',
    dateLabel: 'Jun 28',
    venue: 'Barclays Center, Brooklyn',
    priceFrom: 45,
    imageUrl:
      'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=1200&auto=format&fit=crop',
    category: 'sports',
    featured: true,
  },
];

export const UPCOMING_EVENTS = [
  {
    id: 'evt-101',
    title: 'Blue Note Jazz Evening',
    date: '2025-06-20',
    dateLabel: 'Jun 20',
    venue: 'The Blue Note, NYC',
    price: 35,
    imageUrl:
      'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=600&auto=format&fit=crop',
    category: 'music',
    badgeLabel: 'Music',
  },
  {
    id: 'evt-102',
    title: 'Laugh Factory Live Show',
    date: '2025-06-25',
    dateLabel: 'Jun 25',
    venue: 'Laugh Factory, LA',
    price: 25,
    imageUrl:
      'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=600&auto=format&fit=crop',
    category: 'comedy',
    badgeLabel: 'Comedy',
  },
  {
    id: 'evt-103',
    title: 'NYC Summer Marathon',
    date: '2025-07-04',
    dateLabel: 'Jul 4',
    venue: 'Central Park, NYC',
    price: 15,
    imageUrl:
      'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=600&auto=format&fit=crop',
    category: 'sports',
    badgeLabel: 'Sports',
  },
  {
    id: 'evt-104',
    title: 'Modern Art Expo 2025',
    date: '2025-07-10',
    dateLabel: 'Jul 10',
    venue: 'MoMA, New York',
    price: 20,
    imageUrl:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=600&auto=format&fit=crop',
    category: 'arts',
    badgeLabel: 'Arts',
  },
];

export const LAST_MINUTE_DEALS = [
  {
    id: 'deal-201',
    title: 'Neon Nights Club Mix',
    timeLabel: 'Tonight',
    venue: 'Club XO, Miami',
    price: 29,
    originalPrice: 60,
    imageUrl:
      'https://images.unsplash.com/photo-1571266028243-d220c6f4f3fa?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'deal-202',
    title: 'Italian Cooking Masterclass',
    timeLabel: 'Tomorrow',
    venue: 'Grand Hyatt, Chicago',
    price: 45,
    originalPrice: 90,
    imageUrl:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 'deal-203',
    title: 'Sunrise Yoga Retreat',
    timeLabel: 'This Weekend',
    venue: 'Malibu Beach, CA',
    price: 55,
    originalPrice: 110,
    imageUrl:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=300&auto=format&fit=crop',
  },
];
