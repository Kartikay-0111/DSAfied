import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently();
          localStorage.setItem('token', accessToken);
          setToken(accessToken);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
        localStorage.removeItem('token');
        setToken(null);
      }
    };

    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      token, 
      user,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};