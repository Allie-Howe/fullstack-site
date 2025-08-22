import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 2rem',
  backgroundColor: '#333',
  color: 'white',
  width: '100%',
  boxSizing: 'border-box',
};

const linkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  marginRight: '1rem',
};

const userInfoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  color: '#ccc',
};

const logoutLinkStyle: React.CSSProperties = {
  color: '#aaa',
  textDecoration: 'underline',
  marginLeft: '1rem',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 'inherit',
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning";
  }
  if (hour < 18) {
    return "Good afternoon";
  }
  return "Good evening";
}

function NavigationBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
      </div>
      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        ) : (
          <div style={userInfoStyle}>
            <span>{getGreeting()}, {user?.firstName || 'User'}!</span>
            <button onClick={handleLogout} style={logoutLinkStyle}>Not you? Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
