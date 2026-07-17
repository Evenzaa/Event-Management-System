import { apiClient } from './apiClient';

function unwrap(json) {
  if (json?.success === false) throw new Error(json.message || 'API error');
  return json;
}

// ── Bookings ────────────────────────────────────────────────────

export async function createBooking(payload) {
  const json = await apiClient.post('/bookings', payload);
  return unwrap(json).data;
}

export async function getMyBookings() {
  const json = await apiClient.get('/bookings/my');
  return unwrap(json).data ?? [];
}

// ── Coupon — real API ───────────────────────────────────────────
// POST /api/coupons/validate
// Body:     { code, eventId, totalPrice }
// Response: { success, data: { couponCode, discount, discountAmount, finalPrice } }

export async function validateCoupon({ code, eventId, totalPrice }) {
  const json = await apiClient.post('/coupons/validate', { code, eventId, totalPrice });
  return unwrap(json).data;
  // Returns: { couponCode, discount (%), discountAmount, finalPrice }
}

// ── Payment — real API ──────────────────────────────────────────
// POST /api/payment/pay
// Body:     { bookingId, paymentMethod }
// Response: 200 Payment successful

export async function payBooking({ bookingId, paymentMethod }) {
  const json = await apiClient.post('/payment/pay', { bookingId, paymentMethod });
  return unwrap(json);
}