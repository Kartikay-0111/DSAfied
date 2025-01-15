import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }
  // Render the children components if the user is authenticated
  return <Outlet/>;
};

export default ProtectedRoute;