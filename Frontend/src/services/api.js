import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:5000/api",
});


export const fetchEventDetails = async (eventId) => {
  if (!eventId) {
    throw new Error("Event ID is required");
  }

  const { data } = await api.get(`/events/${eventId}`);

  return {
    id: data._id,

    title: data.title,

    bannerImage:
      data.images && data.images.length > 0
        ? data.images[0]
        : "",

    gallery: data.images || [],

    tags: data.tags || [],

    date: data.date,

    location: data.location,

    organizer: data.organizerId?.name,

    about: data.description,

    tickets: {
      remaining: data.availableSeats,

      options: [
        {
          id: "general",
          name: "General",
          description: "Standard Admission",
          price: data.discountPrice || data.price,
          isHot: true,
        },
        {
          id: "vip",
          name: "VIP",
          description: "VIP Access",
          price: data.price,
          isHot: false,
        },
      ],
    },
  };
};


export const bookTickets = async (eventId, quantities) => {
  const token = localStorage.getItem("token");

  const quantity = Object.values(quantities).reduce(
    (sum, value) => sum + value,
    0
  );

  const { data } = await api.post(
    "/bookings",
    {
      eventId,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    message: data.message,
    bookingId: data.booking?._id,
  };
};

export default api;