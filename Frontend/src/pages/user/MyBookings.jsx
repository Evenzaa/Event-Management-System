import { useEffect, useState } from "react";
import {
  getMyBookings,
  cancelBooking,
} from "../../services/mybooking";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import Container from "../../components/common/Container";
// import UserSidebar from "../../layouts/userdash/UserSidebar";
import BookingCard from "../../components/user/BookingCard";

const TABS = [
  { id: "all", label: "All Bookings" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
  { id: "cancelled", label: "Cancelled" },
];

// TODO: Replace with backend API integration (GET /api/bookings/my)
// Minimal, temporary placeholder so the page has something to render
// until the real bookings list is wired up. Shape mirrors the Booking
// model (Backend/src/models/Booking.js) plus a few display-only fields.


export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  useEffect(() => {
  async function loadBookings() {
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error("Failed to load bookings:", error);
    }
  }

  loadBookings();
}, []);

  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === activeTab);

  // TODO: Replace with DELETE /api/bookings/:id once the backend is wired up
  const handleCancel = async (id) => {
  try {
    await cancelBooking(id);

    const data = await getMyBookings();
    setBookings(data);
  } catch (error) {
    console.error("Failed to cancel booking:", error);
  }
};

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <Container className="flex flex-col gap-6 py-10 lg:flex-row">
        {/* <UserSidebar /> */}

        <main className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
          </div>

          <div className="mb-6 inline-flex flex-wrap gap-1 rounded-full bg-slate-100 p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-violet-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {filteredBookings.length === 0 ? (
              <p className="rounded-2xl bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                No bookings in this category yet.
              </p>
            ) : (
              filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onCancel={handleCancel}
                />
              ))
            )}
          </div>
        </main>
      </Container>

      <Footer />
    </div>
  );
}
