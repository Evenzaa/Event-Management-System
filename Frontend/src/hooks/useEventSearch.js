import { useCallback, useState } from 'react';
import { searchEvents } from '../services/eventsService';

export function useEventSearch() {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async ({ query, category }) => {
    try {
      setIsSearching(true);
      setError(null);
      const data = await searchEvents({ query, category });
      setResults(data);
      return data;
    } catch (err) {
      setError(err);
      return [];
    } finally {
      setIsSearching(false);
    }
  }, []);

  return { results, isSearching, error, search };
}
