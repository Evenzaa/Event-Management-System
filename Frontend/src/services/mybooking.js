import { apiClient } from "./apiClient";

function unwrap(json) {
  if (json?.success === false) {
    throw new Error(json.message || "API returned success=false");
  }
  return json;
}

// GET MY BOOKINGS


export async function getMyBookings() {
  const json = await apiClient.get("/bookings/my");
  const { data } = unwrap(json);
  return data;
}

// ---------------------------------------------------------------------------
// CANCEL BOOKING → DELETE /api/bookings/:id
// ---------------------------------------------------------------------------

export async function cancelBooking(id) {
  const json = await apiClient.delete(`/bookings/${id}`);
  return unwrap(json);
}