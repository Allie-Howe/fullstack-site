import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Basic styles for the navbar - consider moving to a CSS file for more complex styling
const navStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 2rem',
  backgroundColor: '#333', // Dark background
  color: 'white',
  width: '100%', // Ensure it spans full width
  boxSizing: 'border-box', // Include padding in width calculation
};

const linkStyle: React.CSSProperties = {
  color: 'white',
  textDecoration: 'none',
  marginRight: '1rem',
};

// Updated styles
const userInfoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  color: '#ccc', // Lighter color for greeting
};

const logoutLinkStyle: React.CSSProperties = {
  color: '#aaa', // Even lighter color for logout link
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
      <div> {/* Group left-side links */}
        <Link to="/" style={linkStyle}>Home</Link>
      </div>
      <div> {/* Group right-side links/button */}
        {!isAuthenticated ? (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        ) : (
          <div style={userInfoStyle}> {/* Wrap user info and logout */}
            <span>{getGreeting()}, {user?.firstName || 'User'}!</span> {/* Display greeting */}
            <button onClick={handleLogout} style={logoutLinkStyle}>Not you? Logout</button> {/* Styled logout */}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar;
