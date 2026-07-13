import { useCallback, useEffect, useState } from 'react';

function readUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState(readUser);
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));

  // Stay in sync if another tab logs in/out
  useEffect(() => {
    function onStorage() {
      setUser(readUser());
      setToken(localStorage.getItem('authToken'));
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  }, []);

  return {
    user,
    token,
    isLoggedIn: !!token && !!user,
    logout,
  };
}
