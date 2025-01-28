import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const {isLoading} = useAuth0();

  if(isLoading){
    return <h1>Loading...</h1>
  }
  
  if (!token) {
    return <Navigate to="/" replace />;
  }
  // Render the children components if the user is authenticated
  return <Outlet/>;
};

export default ProtectedRoute;