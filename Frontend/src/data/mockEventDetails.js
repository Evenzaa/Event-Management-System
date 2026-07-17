// Mock data for now — see "Backend Requirements" note in BookingCheckout.jsx.
// A real GET /api/events/:id (title, location, date, image) should replace this once it exists.
const MOCK_EVENT = {
  title: 'Electric Dreams Festival 2025',
  location: 'Madison Square Garden',
  date: '2025-07-15T18:00:00.000Z',
  image: 'https://placehold.co/160x160/1a1625/ffffff?text=Event',
};

export function getEventDetails(eventId) {
  return { id: eventId, ...MOCK_EVENT };
}
