import { useState, useEffect } from 'react';
import { useFetch } from '../useAuthenticatedFetch';

function HomePage() {
  const [message, setMessage] = useState('');
  const fetch = useFetch();

  useEffect(() => {
    fetch('hello').then(data => setMessage(data?.message));
  }, []);

  return <>
    <h1>Welcome!</h1>
    <p>{message}</p>
  </>;
}

export default HomePage;
