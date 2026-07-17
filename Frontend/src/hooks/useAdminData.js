import { useCallback, useEffect, useState } from 'react';
import {
  getAdminStats, getAdminUsers, getAdminEvents,
  updateUserRole, deleteUser, approveEvent, rejectEvent,
  getCoupons, createCoupon, deleteCoupon
} from '../services/adminService';

/**
 * useAdminData
 * ---------------------------------------------------------------
 * Loads all data the admin dashboard needs.
 * Each section (stats, users, events) has its own loading state
 * so they can render independently.
 * ---------------------------------------------------------------
 */
export function useAdminData() {
  const [stats, setStats]   = useState(null);
  const [users, setUsers]   = useState([]);
  const [events, setEvents] = useState([]);
  const [coupons, setCoupons] = useState([]);
  
  const [loadingStats,  setLoadingStats]  = useState(true);
  const [loadingUsers,  setLoadingUsers]  = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingCoupons, setLoadingCoupons] = useState(true);
  const [error, setError] = useState(null);

  // Load all on mount
  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch(setError)
      .finally(() => setLoadingStats(false));

    getAdminUsers()
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoadingUsers(false));

    getAdminEvents()
      .then((raw) => {
        // The backend populates organizerId as { _id, name, email }.
        // Normalize it into a flat `organizer` field so components
        // never accidentally render an object directly.
        const normalized = raw.map((e) => ({
          ...e,
          organizer: typeof e.organizerId === 'object' && e.organizerId !== null
            ? e.organizerId          // already populated → use it
            : (e.organizer ?? null), // already normalized or absent
        }));
        setEvents(normalized);
      })
      .catch(setError)
      .finally(() => setLoadingEvents(false));

    getCoupons()
    .then(setCoupons)
    .catch(setError)
    .finally(() => setLoadingCoupons(false));
  }, []);

  // Derived counts
  const pendingEvents = events.filter((e) => e.status === 'pending');

  // Actions — optimistic UI: update local state immediately, rollback on error
  const handleUpdateRole = useCallback(async (userId, role) => {
    setUsers((prev) => prev.map((u) => u._id === userId ? { ...u, role } : u));
    try { await updateUserRole(userId, role); }
    catch { setUsers((prev) => prev.map((u) => u._id === userId ? { ...u, role: u.role } : u)); }
  }, []);

  const handleDeleteUser = useCallback(async (userId) => {
    setUsers((prev) => prev.filter((u) => u._id !== userId));
    try { await deleteUser(userId); }
    catch (err) {
      // Rollback is complex without a cache; just re-fetch
      getAdminUsers().then(setUsers);
    }
  }, []);

  const handleApproveEvent = useCallback(async (eventId) => {
    setEvents((prev) => prev.map((e) => e._id === eventId ? { ...e, status: 'approved' } : e));
    try { await approveEvent(eventId); }
    catch { getAdminEvents().then(setEvents); }
  }, []);

  const handleRejectEvent = useCallback(async (eventId) => {
    setEvents((prev) => prev.map((e) => e._id === eventId ? { ...e, status: 'rejected' } : e));
    try { await rejectEvent(eventId); }
    catch { getAdminEvents().then(setEvents); }
  }, []);

  const handleCreateCoupon = useCallback(async (data) => {
    try {
      const newCoupon = await createCoupon(data);
      
      // Safety check: Only append if newCoupon is a valid object
      if (newCoupon && newCoupon.code) {
        setCoupons((prev) => [...prev, newCoupon]);
      } else {
        // Fallback: If the API response structure behaves unexpectedly, just refetch the list
        getCoupons().then(setCoupons);
      }
      
      return { success: true };
    } catch (err) {
      setError(err);
      return { success: false, message: err.message };
    }
  }, []);

  const handleDeleteCoupon = useCallback(async (couponId) => {
    setCoupons((prev) => prev.filter((c) => c._id !== couponId));
    try { 
      await deleteCoupon(couponId); 
    } catch (err) {
      getCoupons().then(setCoupons); // Rollback on fail
    }
  }, []);

  return {
  stats, users, events, pendingEvents, coupons,
  loadingStats, loadingUsers, loadingEvents, loadingCoupons,
  error,
  handleUpdateRole, handleDeleteUser, handleApproveEvent, handleRejectEvent,
  handleCreateCoupon, handleDeleteCoupon
  };

}