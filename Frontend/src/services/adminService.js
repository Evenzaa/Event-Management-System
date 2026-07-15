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
