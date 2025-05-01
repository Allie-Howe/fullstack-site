import { useState, useEffect } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function HomePage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const { isAuthenticated } = useAuth(); // Get auth state

  useEffect(() => {
    // Fetch the hello message - this endpoint is not protected in our example
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching hello message:', error));
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
