import { useCallback, useEffect, useState } from 'react';
import { getAllEvents, getCategoryCounts } from '../services/eventsService';

const DEFAULT_FILTERS = {
  query:      '',
  category:   'all',
  dateFilter: 'all',
  minPrice:   0,
  maxPrice:   500,
  location:   '',
  sort:       'popular',
};


export function useEventListing() {
  const [filters, setFilters]           = useState(DEFAULT_FILTERS);
  // pendingFilters = what the sidebar shows before "Apply Filters" is clicked
  const [pendingFilters, setPendingFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage]                 = useState(1);

  const [events, setEvents]             = useState([]);
  const [total, setTotal]               = useState(0);
  const [totalPages, setTotalPages]     = useState(1);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [isLoading, setIsLoading]       = useState(true);
  const [error, setError]               = useState(null);

  // Fetch results whenever committed filters or page change
  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await getAllEvents({ ...filters, page });
        if (!isMounted) return;
        setEvents(res.events);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, [filters, page]);

  // Load category counts once on mount
  useEffect(() => {
    getCategoryCounts().then(setCategoryCounts).catch(() => {});
  }, []);

  // Search bar + sort change immediately (no "Apply" needed)
  const setQuery = useCallback((query) => {
    setFilters((f) => ({ ...f, query }));
    setPage(1);
  }, []);

  const setSort = useCallback((sort) => {
    setFilters((f) => ({ ...f, sort }));
    setPage(1);
  }, []);

  // Sidebar pending filter changes
  const updatePendingFilter = useCallback((key, value) => {
    setPendingFilters((f) => ({ ...f, [key]: value }));
  }, []);

  // "Apply Filters" button — commits pending → active
  const applyFilters = useCallback(() => {
    setFilters(pendingFilters);
    setPage(1);
  }, [pendingFilters]);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPendingFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const goToPage = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    // Data
    events,
    total,
    totalPages,
    page,
    categoryCounts,
    isLoading,
    error,
    // Committed filters (read-only for display)
    filters,
    // Pending sidebar filters
    pendingFilters,
    // Actions
    setQuery,
    setSort,
    updatePendingFilter,
    applyFilters,
    resetFilters,
    goToPage,
  };
}
