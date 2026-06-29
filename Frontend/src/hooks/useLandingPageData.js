import { useEffect, useState } from 'react';
import {
  getCategories,
  getStats,
  getFeaturedEvents,
  getUpcomingEvents,
  getLastMinuteDeals,
} from '../services/eventsService';

export function useLandingPageData() {
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [deals, setDeals] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAll() {
      try {
        setIsLoading(true);
        const [categoriesRes, statsRes, featuredRes, upcomingRes, dealsRes] =
          await Promise.all([
            getCategories(),
            getStats(),
            getFeaturedEvents(),
            getUpcomingEvents(),
            getLastMinuteDeals(),
          ]);

        if (!isMounted) return;

        setCategories(categoriesRes);
        setStats(statsRes);
        setFeaturedEvents(featuredRes);
        setUpcomingEvents(upcomingRes);
        setDeals(dealsRes);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadAll();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    categories,
    stats,
    featuredEvents,
    upcomingEvents,
    deals,
    isLoading,
    error,
  };
}
