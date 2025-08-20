import { useState, useEffect } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { useAuth } from '../context/AuthContext';
import { useAuthFetch } from '../useAuthenticatedFetch';

function HomePage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const { isAuthenticated } = useAuth();
  const { unAuthFetch } = useAuthFetch();

  useEffect(() => {
    unAuthFetch('hello').then(data => setMessage(data?.message));
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>Welcome! {isAuthenticated ? 'You are logged in.' : 'Please log in or register.'}</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR (though page structure changed)
        </p>
        <p>Message from API: {message}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default HomePage;
