import { Routes, Route } from 'react-router-dom';

// Public
import LandingPage from '../pages/public/LandingPage';
import EventListing from '../pages/public/EventListing';
// import EventDetails from '../pages/public/EventDetails';

// Auth
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import VerifyEmail from "../pages/auth/VerifyEmail";
import ResetPassword from "../pages/auth/ResetPassword";

// // User
import EditProfile from '../pages/user/EditProfile';
// import MyBookings from '../pages/user/MyBookings';
// import Favorites from '../pages/user/Favorites';

// // Checkout Flow
// import SeatSelection from '../pages/checkout/SeatSelection';
// import BookingCheckout from '../pages/checkout/BookingCheckout';
// import PaymentConfirmation from '../pages/checkout/PaymentConfirmation';

// // Organizer
// import OrganizerDashboard from '../pages/organizer/OrganizerDashboard';
// import CreateEvent from '../pages/organizer/CreateEvent';
// import MyEvents from '../pages/organizer/MyEvents';

// // Admin
// import AdminDashboard from '../pages/admin/AdminDashboard';
// import AdminEventApproval from '../pages/admin/AdminEventApproval';


export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/event-listing" element={<EventListing />} />
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password/:token"element={<ResetPassword />}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/profile" element={<EditProfile />} />
      <Route path="/verify/:token"element={<VerifyEmail />}
      
/>
      {/* 
      <Route path="/events" element={<EventListing />} />
      <Route path="/events/:id" element={<EventDetails />} />




      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/favorites" element={<Favorites />} />


      <Route path="/book/:eventId/seats" element={<SeatSelection />} />
      <Route path="/checkout" element={<BookingCheckout />} />
      <Route path="/confirmation" element={<PaymentConfirmation />} />


      <Route path="/organizer" element={<OrganizerDashboard />} />
      <Route path="/organizer/create-event" element={<CreateEvent />} />
      <Route path="/organizer/my-events" element={<MyEvents />} />


      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/approvals" element={<AdminEventApproval />} /> 
      */}
    </Routes>
  );
}