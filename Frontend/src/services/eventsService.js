import { apiClient } from './apiClient';
import { CATEGORIES, STATS } from '../data/mockEvents';
import { normalizeEvent } from '../utils/formatters';


function unwrap(json) {
  if (json?.success === false) {
    throw new Error(json.message || 'API returned success=false');
  }
  return json;
}

// ---------------------------------------------------------------------------
// Filtering & sorting helpers (client-side, until backend adds query params)
// ---------------------------------------------------------------------------

function applyFilters(events, { query, category, dateFilter, minPrice, maxPrice, location }) {
  let results = events;

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (e) => e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q)
    );
  }
  if (category && category !== 'all') {
    results = results.filter((e) => e.category === category);
  }
  if (location) {
    results = results.filter((e) =>
      e.venue.toLowerCase().includes(location.toLowerCase())
    );
  }
  results = results.filter(
    (e) => e.price >= (minPrice ?? 0) && e.price <= (maxPrice ?? 99999)
  );
  if (dateFilter && dateFilter !== 'all') {
    const now = new Date();
    results = results.filter((e) => {
      const d = new Date(e.rawDate);
      if (dateFilter === 'this-weekend') {
        const toFri = (5 - now.getDay() + 7) % 7;
        const fri = new Date(now); fri.setDate(now.getDate() + toFri);
        const sun = new Date(fri); sun.setDate(fri.getDate() + 2);
        return d >= fri && d <= sun;
      }
      if (dateFilter === 'this-month') {
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }
      if (dateFilter === 'next-month') {
        const nm = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        return d.getMonth() === nm.getMonth() && d.getFullYear() === nm.getFullYear();
      }
      return true;
    });
  }
  return results;
}

function applySort(events, sort) {
  const copy = [...events];
  if (sort === 'date')       return copy.sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate));
  if (sort === 'price-asc')  return copy.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') return copy.sort((a, b) => b.price - a.price);
  return copy; 
}

// ---------------------------------------------------------------------------
// CATEGORIES & STATS — hardcoded until backend has endpoints for these
// ---------------------------------------------------------------------------

export async function getCategories() {
  return CATEGORIES;
}

export async function getStats() {
  return STATS;
}

// ---------------------------------------------------------------------------
// FEATURED EVENTS  →  GET /api/events/featured
// ---------------------------------------------------------------------------

export async function getFeaturedEvents() {
  const json = await apiClient.get('/events/featured');
  const { data } = unwrap(json);
  return data.map(normalizeEvent).slice(0, 3);
}

// ---------------------------------------------------------------------------
// UPCOMING EVENTS  →  GET /api/events
// ---------------------------------------------------------------------------

export async function getUpcomingEvents() {
  const json = await apiClient.get('/events');
  const { data } = unwrap(json);
  return data
    .map(normalizeEvent)
    .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate))
    .slice(0, 4);
}

// ---------------------------------------------------------------------------
// LAST MINUTE DEALS  →  GET /api/events (filtered by isLastMinute: true)
// ---------------------------------------------------------------------------

export async function getLastMinuteDeals() {
  const json = await apiClient.get('/events');
  const { data } = unwrap(json);
  return data
    .map(normalizeEvent)
    .filter((evt) => evt.isLastMinute)
    .slice(0, 3);
}

// ---------------------------------------------------------------------------
// SEARCH  →  GET /api/events (client-side filter for now)
// ---------------------------------------------------------------------------

export async function searchEvents({ query = '', category = 'all' } = {}) {
  const json = await apiClient.get('/events');
  const { data } = unwrap(json);
  return data.map(normalizeEvent).filter((evt) => {
    const matchesQuery =
      !query || evt.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      category === 'all' || evt.category === category;
    return matchesQuery && matchesCategory;
  });
}

// ---------------------------------------------------------------------------
// SINGLE EVENT  →  GET /api/events/:id
// ---------------------------------------------------------------------------

export async function getEventById(id) {
  const json = await apiClient.get(`/events/${id}`);
  const { data } = unwrap(json);
  return normalizeEvent(data);
}


export async function getAllEvents({
  query      = '',
  category   = 'all',
  dateFilter = 'all',
  minPrice   = 0,
  maxPrice   = 500,
  location   = '',
  sort       = 'popular',
  page       = 1,
  limit      = 9,
} = {}) {
  const json = await apiClient.get('/events');
  const { data } = unwrap(json);

  let results = data.map(normalizeEvent);
  results = applyFilters(results, { query, category, dateFilter, minPrice, maxPrice, location });
  results = applySort(results, sort);

  const total      = results.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const events     = results.slice((page - 1) * limit, page * limit);

  return { events, total, totalPages, page };
}

export async function getCategoryCounts() {
  const json = await apiClient.get('/events');
  const { data } = unwrap(json);

  return data.reduce((acc, raw) => {
    const cat = raw.category?.toLowerCase();
    if (cat) acc[cat] = (acc[cat] ?? 0) + 1;
    return acc;
  }, {});
}
