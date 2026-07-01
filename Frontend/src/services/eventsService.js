import { apiClient } from './apiClient';
import { CATEGORIES, STATS } from '../data/mockEvents';
import { normalizeEvent } from '../utils/formatters';

function unwrap(json) {
  if (json?.success === false) {
    throw new Error(json.message || 'API returned success=false');
  }
  return json;
}

export async function getCategories() {
  return CATEGORIES;
}

export async function getStats() {
  return STATS;
}

export async function getFeaturedEvents() {
  const json = await apiClient.get('/events/featured');
  const { data } = unwrap(json);
  return data.map(normalizeEvent).slice(0, 3);
}

export async function getUpcomingEvents() {
  const json = await apiClient.get('/events');
  const { data } = unwrap(json);
  return data
    .map(normalizeEvent)
    .sort((a, b) => new Date(a.rawDate) - new Date(b.rawDate))
    .slice(0, 4);
}

export async function getLastMinuteDeals() {
  const json = await apiClient.get('/events');
  const { data } = unwrap(json);
  return data
    .map(normalizeEvent)
    .filter((evt) => evt.isLastMinute)
    .slice(0, 3);
}

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

export async function getEventById(id) {
  const json = await apiClient.get(`/events/${id}`);
  const { data } = unwrap(json);
  return normalizeEvent(data);
}
