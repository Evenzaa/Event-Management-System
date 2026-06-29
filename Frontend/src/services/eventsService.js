import {
  CATEGORIES,
  STATS,
  FEATURED_EVENTS,
  UPCOMING_EVENTS,
  LAST_MINUTE_DEALS,
} from '../data/mockEvents';


const MOCK_DELAY_MS = 300;

function mockResolve(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), MOCK_DELAY_MS);
  });
}

export async function getCategories() {
  return mockResolve(CATEGORIES);
}

export async function getStats() {
  return mockResolve(STATS);
}

export async function getFeaturedEvents() {
  return mockResolve(FEATURED_EVENTS);
}

export async function getUpcomingEvents() {
  return mockResolve(UPCOMING_EVENTS);
}

export async function getLastMinuteDeals() {
  return mockResolve(LAST_MINUTE_DEALS);
}

export async function searchEvents({ query = '', category = 'all' } = {}) {
  const all = [...FEATURED_EVENTS, ...UPCOMING_EVENTS];
  const filtered = all.filter((evt) => {
    const matchesQuery = evt.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'all' || evt.category === category;
    return matchesQuery && matchesCategory;
  });
  return mockResolve(filtered);
}
