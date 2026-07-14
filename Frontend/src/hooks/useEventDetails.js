import { useState, useEffect } from 'react';
import { fetchEventDetails } from '../services/api';

export function useEventDetails(eventId) {
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!eventId) {
      setIsLoading(false);
      return;
    }

    const loadEventDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const details = await fetchEventDetails(eventId);
        setEventDetails(details);
      } catch (err) {
        setError(err.message || "Failed to load event details.");
      } finally {
        setIsLoading(false);
      }
    };

    loadEventDetails();
  }, [eventId, retryCount]);

  return {
    eventDetails,
    isLoading,
    error,
    retry: () => setRetryCount((c) => c + 1)
  };
}
