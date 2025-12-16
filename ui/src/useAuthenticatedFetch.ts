import { useCallback } from 'react'

// TODO: This is a dumb way of doing this - put in an env file
const PROD_API_URL = 'https://google.com'
const ABSOLUTE_API_URL = import.meta.env.MODE === 'production' ? PROD_API_URL : '';

export const useFetch = () => {
  return useCallback(async (url: RequestInfo | URL, inOptions?: RequestInit) => {
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
};
