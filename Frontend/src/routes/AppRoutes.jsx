import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Public
import LandingPage       from '../pages/public/LandingPage';
import EventListing      from '../pages/public/EventListing';
import EventDetails      from '../pages/public/EventDetails';
import CategoriesPage    from '../pages/public/CategoriesPage';
import ForOrganizersPage from '../pages/public/ForOrganizersPage';

// Auth
import Login          from '../pages/auth/Login';
import Signup         from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import VerifyEmail    from '../pages/auth/VerifyEmail';
import ResetPassword  from '../pages/auth/ResetPassword';
import CheckEmail     from '../pages/auth/CheckEmail';
import GoogleCallback from '../pages/auth/GoogleCallback';

// User
import EditProfile from '../pages/user/EditProfile';
import Favorites   from '../pages/user/Favorites';
import MyBookings  from '../pages/user/MyBookings';

// // Checkout Flow
import SeatSelection from '../pages/checkout/SeatSelection';
import BookingCheckout from '../pages/checkout/BookingCheckout'; // NEW
import ConfirmedBooking from '../pages/confirmedbooking/confirmedbooking';


// Organizer
import Dashboard from '../pages/organizer/dashboard';
import DashHome  from '../pages/organizer/dashHome';
import Events    from '../pages/organizer/events/events';
import Booking   from '../pages/organizer/booking/booking';
import Review    from '../pages/organizer/review/review';
import OrganizerDetails from '../pages/organizer/organizerdetails';

// Admin
import AdminDashboard  from '../pages/admin/AdminDashboard';
import AdminUsers      from '../pages/admin/AdminUsers';
import AdminEvents     from '../pages/admin/AdminEvents';
import AdminApprovals  from '../pages/admin/AdminApprovals';
import AdminCoupons from '../pages/admin/AdminCoupons';
import AdminModeration from '../pages/admin/AdminModeration';

// Error
import ErrorPage from '../pages/shared/errorpage';



export default function AppRoutes() {
  return (
    <Routes>

      {/* ── Public ── */}
      <Route path="/"               element={<LandingPage />} />
      <Route path="/event-listing"  element={<EventListing />} />
      <Route path="/events/:id"     element={<EventDetails />} />
      <Route path="/categories"     element={<CategoriesPage />} />
      <Route path="/for-organizers" element={<ForOrganizersPage />} />

      {/* ── Auth ── */}
      <Route path="/login"                 element={<Login />} />
      <Route path="/signup"                element={<Signup />} />
      <Route path="/forgot-password"       element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/verify/:token"         element={<VerifyEmail />} />
      <Route path="/check-email"           element={<CheckEmail />} />
      <Route path="/auth/google/callback"  element={<GoogleCallback />} />

      {/* ── User (any logged-in user) ── */}
      <Route path="/profile" element={
        <ProtectedRoute><EditProfile /></ProtectedRoute>
      } />
      <Route path="/favorites" element={
        <ProtectedRoute><Favorites /></ProtectedRoute>
      } />
      <Route path="/my-bookings" element={
        <ProtectedRoute><MyBookings /></ProtectedRoute>
      } />
      

      {/* ── Organizer (organizer role only) ── */}
      <Route path="/organizer-dashboard" element={
        <ProtectedRoute requiredRole="organizer"><Dashboard /></ProtectedRoute>
      }>
        <Route index          element={<DashHome />} />
        <Route path="events"  element={<Events />} />
        <Route path="booking" element={<Booking />} />
        <Route path="review"  element={<Review />} />
        
      </Route>
      
      {/* organizer-details */}
      <Route path="organizerdetails/:id" element={<OrganizerDetails />} />

   
      {/* ── Checkout (must be logged in) ── */}
      <Route path="/book/:eventId/seats" element={
        <ProtectedRoute><SeatSelection /></ProtectedRoute>
      } />
      <Route path="/checkout" element={
        <ProtectedRoute><BookingCheckout /></ProtectedRoute>
      } />
      <Route path="/confirmed-booking" element={
        <ProtectedRoute><ConfirmedBooking /></ProtectedRoute>
      } />


      {/* ── Admin (admin role only) ── */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute requiredRole="admin"><AdminUsers /></ProtectedRoute>
      } />
      <Route path="/admin/events" element={
        <ProtectedRoute requiredRole="admin"><AdminEvents /></ProtectedRoute>
      } />
      <Route path="/admin/approvals" element={
        <ProtectedRoute requiredRole="admin"><AdminApprovals /></ProtectedRoute>
      } />
      <Route path="/admin/coupons" element={
        <ProtectedRoute requiredRole="admin"><AdminCoupons /></ProtectedRoute>
      } />
      <Route path="/admin/moderation" element={
        <ProtectedRoute requiredRole="admin"><AdminModeration /></ProtectedRoute>
      } />


      {/* ── 404 ── */}
      <Route path="*" element={<ErrorPage />} />

    </Routes>
  );
}