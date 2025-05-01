import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  email: string;
  firstName: string;
  exp: number;
  iat: number;
}

interface AuthContextType {
  token: string | null;
  user: { firstName: string } | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ firstName: string } | null>(null);

  const processToken = (tokenToProcess: string | null) => {
    if (tokenToProcess) {
      try {
        const decoded = jwtDecode<DecodedToken>(tokenToProcess);
        if (decoded.exp * 1000 > Date.now()) {
          setToken(tokenToProcess);
          setUser({ firstName: decoded.firstName });
          localStorage.setItem('authToken', tokenToProcess);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        logout();
      }
    } else {
      logout();
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    processToken(storedToken);
  }, []);

  const login = (newToken: string) => {
    processToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
