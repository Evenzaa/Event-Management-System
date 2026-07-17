import { apiClient } from './apiClient';

/**
 * adminService
 * ---------------------------------------------------------------
 * All admin API calls. Every function uses the shared apiClient
 * so the admin JWT token is automatically sent in every request.
 * ---------------------------------------------------------------
 */

function unwrap(json) {
  if (json?.success === false) throw new Error(json.message || 'API error');
  return json;
}

// GET /api/dashboards/admin
export async function getAdminStats() {
  const json = await apiClient.get('/dashboards/admin');
  return unwrap(json).data ?? unwrap(json);
}

// GET /api/admin/users
export async function getAdminUsers() {
  const json = await apiClient.get('/admin/users');
  return unwrap(json).data ?? unwrap(json).users ?? unwrap(json);
}

// GET /api/admin/events
export async function getAdminEvents() {
  const json = await apiClient.get('/admin/events');
  return unwrap(json).data ?? unwrap(json).events ?? unwrap(json);
}

// PUT /api/admin/users/:id/role
export async function updateUserRole(id, role) {
  const json = await apiClient.put(`/admin/users/${id}/role`, { role });
  return unwrap(json);
}

// DELETE /api/admin/users/:id
export async function deleteUser(id) {
  const json = await apiClient.delete(`/admin/users/${id}`);
  return unwrap(json);
}

// PUT /api/admin/events/:id/approve
export async function approveEvent(id) {
  const json = await apiClient.put(`/admin/events/${id}/approve`, {});
  return unwrap(json);
}

// PUT /api/admin/events/:id/reject
export async function rejectEvent(id) {
  const json = await apiClient.put(`/admin/events/${id}/reject`, {});
  return unwrap(json);
}

// GET /api/coupons
export async function getCoupons() {
  const json = await apiClient.get('/coupons');
  const payload = unwrap(json);
  // Safely locate the array whether the API nests it in .coupons, .data, or returns it directly
  const couponsArray = payload.coupons || payload.data || payload;
  // Guarantee an array is returned so .map() never crashes[cite: 11]
  return Array.isArray(couponsArray) ? couponsArray : [];
}

// POST /api/coupons
export async function createCoupon(data) {
  const response = await apiClient.post('/coupons', data);
  // Safely extract the payload whether apiClient uses an interceptor or raw Axios
  const payload = response.data || response;
  unwrap(payload);
  // Return the nested coupon object specifically
  return payload.coupon;
}

// DELETE /api/coupons/:id
export async function deleteCoupon(id) {
  const json = await apiClient.delete(`/coupons/${id}`);
  return unwrap(json);
}