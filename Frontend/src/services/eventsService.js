import { CATEGORIES, STATS } from '../data/mockEvents';
import { normalizeEvent } from '../utils/formatters';


const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/** Core fetch wrapper — throws on non-OK responses with a clean message */
async function apiFetch(path) {
  const res = await fetch(`${BASE_URL}${path}`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `API error ${res.status}: ${path}`);
  }

  const json = await res.json();

  if (json.success === false) {
    throw new Error(json.message || `API returned success=false for ${path}`);
  }

  return json;
}

// ---------------------------------------------------------------------------
// CATEGORIES & STATS — hardcoded until backend has endpoints for these
// --------------------------------------------------------------------------

export async function getCategories() {
  return CATEGORIES;
}

export async function getStats() {
  return STATS;
}


export async function getFeaturedEvents() {
  const json = await apiFetch('/events/featured');
  return json.data.map(normalizeEvent).slice(0, 3);
}


export async function getUpcomingEvents() {
  const json = await apiFetch('/events');
  const normalized = json.data.map(normalizeEvent);

  // Sort by date ascending and return the 4 soonest events
  return normalized
    .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate))
    .slice(0, 4);
}


export async function getLastMinuteDeals() {
  const json = await apiFetch('/events');
  const normalized = json.data.map(normalizeEvent);

  return normalized.filter((evt) => evt.isLastMinute).slice(0, 3);
}


export async function searchEvents({ query = '', category = 'all' } = {}) {
  const json = await apiFetch('/events');
  const normalized = json.data.map(normalizeEvent);

  return normalized.filter((evt) => {
    const matchesQuery =
      !query || evt.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      category === 'all' || evt.category === category;
    return matchesQuery && matchesCategory;
  });
}


export async function getEventById(id) {
  const json = await apiFetch(`/events/${id}`);
  return normalizeEvent(json.data);
}
