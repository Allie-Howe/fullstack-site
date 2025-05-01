import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavigationBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav style={{ marginBottom: '2rem', borderBottom: '1px solid #555', paddingBottom: '1rem' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      {!isAuthenticated && (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      {isAuthenticated && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
}

export default NavigationBar;
