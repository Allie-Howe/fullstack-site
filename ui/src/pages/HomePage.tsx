import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAuthFetch } from '../useAuthenticatedFetch';

function HomePage() {
  const [message, setMessage] = useState('');
  const { isAuthenticated } = useAuth();
  const { unAuthFetch } = useAuthFetch();

  useEffect(() => {
    unAuthFetch('hello').then(data => setMessage(data?.message));
  }, []);

  return <>
    <h1>Welcome!</h1>
    <h4>{isAuthenticated ? 'You are logged in.' : 'Please log in or register.'}</h4>
    <p>{message}</p>
  </>;
}

export default HomePage;
