const BASE_URL = "http://localhost:5000/api";

// Get all favorite events
export const getFavorites = async () => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${BASE_URL}/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }

  return response.json();
};

// Remove an event from favorites
export const removeFavorite = async (eventId) => {
  const token = localStorage.getItem("authToken");

  const response = await fetch(`${BASE_URL}/favorites/${eventId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove favorite");
  }

  return response.json();
};