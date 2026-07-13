import { Routes, Route } from 'react-router-dom';

// Public
import LandingPage from '../pages/public/LandingPage';
import EventListing from '../pages/public/EventListing';
import EventDetails from '../pages/public/EventDetails';

// Auth
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import VerifyEmail from "../pages/auth/VerifyEmail";
import ResetPassword from "../pages/auth/ResetPassword";
import CheckEmail     from '../pages/auth/CheckEmail';
import GoogleCallback from '../pages/auth/GoogleCallback';

// // User
import EditProfile from '../pages/user/EditProfile';
import Favorites from '../pages/user/Favorites';
import MyBookings from '../pages/user/MyBookings';

// // Checkout Flow
// import SeatSelection from '../pages/checkout/SeatSelection';
// import BookingCheckout from '../pages/checkout/BookingCheckout';
// import PaymentConfirmation from '../pages/checkout/PaymentConfirmation';

// // Organizer
import Dashboard from '../pages/organizer/dashboard';
import DashHome from '../pages/organizer/dashHome';
import Events from '../pages/organizer/events/events';
import Booking from '../pages/organizer/booking/booking';
import Review from '../pages/organizer/review/review';

// // ErrorPage
import ErrorPage from '../pages/shared/errorpage';



// // Admin
// import AdminDashboard from '../pages/admin/AdminDashboard';
// import AdminEventApproval from '../pages/admin/AdminEventApproval';


export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/event-listing" element={<EventListing />} />
      <Route path="/events/:id" element={<EventDetails />} />
      
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />}/>
      <Route path="/verify/:token" element={<VerifyEmail />}/>
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      
      {/* User */}
      <Route path="/profile" element={<EditProfile />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/my-bookings" element={<MyBookings />} />

      {/* organizer */}
  
        <Route path="/organizer-dashboard" element={<Dashboard />}>
          <Route index element={<DashHome />} />
          <Route path="events" element={<Events />} />
          <Route path="booking" element={<Booking />} />
          <Route path="review" element={<Review />} />

        </Route>

      {/* error-page */}
      <Route path="*" element={<ErrorPage/>} />

      {/* 



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