import { useCallback, useEffect, useState } from 'react';
import {
  getAdminStats, getAdminUsers, getAdminEvents,
  updateUserRole, deleteUser, approveEvent, rejectEvent,
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

  const [loadingStats,  setLoadingStats]  = useState(true);
  const [loadingUsers,  setLoadingUsers]  = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
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

  return {
    stats, users, events, pendingEvents,
    loadingStats, loadingUsers, loadingEvents,
    error,
    handleUpdateRole,
    handleDeleteUser,
    handleApproveEvent,
    handleRejectEvent,
  };
}