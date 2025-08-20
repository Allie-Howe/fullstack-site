import { useCallback } from 'react'
import { useAuth } from './context/AuthContext'

// TODO: This is a dumb way of doing this - put in an env file
const PROD_API_URL = 'https://google.com'
const ABSOLUTE_API_URL = import.meta.env.MODE === 'production' ? PROD_API_URL : '';

export const useAuthFetch = () => {
  const { token } = useAuth();

  const unAuthFetch = useCallback(async (url: RequestInfo | URL, inOptions?: RequestInit) => {
    const options = {
      ...inOptions,
      headers: {
        ...inOptions?.headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };

    const res = await fetch(`${ABSOLUTE_API_URL}/api/${url}`, options);
    const data: Record<string, any> = await res.json();

    if (res.ok) return data;

    console.error(res);
    // TODO: This is dumb, change to a proper thing when possible
    alert(data);
  }, []);

  const authFetch = useCallback(async (url: RequestInfo | URL, inOptions?: RequestInit) => {
    if (!token) {
      console.warn('No token available for authenticated request:', url);
      return Promise.reject(new Error('Authentication required'));
    }

    const options = {
      ...inOptions,
      headers: {
        ...inOptions?.headers,
        'Authorization': `Bearer ${token}`
      }
    }

    return unAuthFetch(url, options);
  }, [token, unAuthFetch]);

  return {authFetch, unAuthFetch};
}
