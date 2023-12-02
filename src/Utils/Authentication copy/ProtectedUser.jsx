// import React from 'react'
// import AuthHandle from "./AuthHandle";
// import { Navigate, Outlet } from 'react-router-dom';

// export const ProtectedUser = ({component: Component,...rest}) => {
//   const isAuthenticated = AuthHandle.signin();
//   return isAuthenticated ? <Outlet/> : <Navigate to="/" />
// }
// Import necessary components and libraries
import React from 'react';
import AuthHandle from "./AuthHandle";
import { Navigate, Outlet } from 'react-router-dom';

// ProtectedUser component
export const ProtectedUser = ({ component: Component, ...rest }) => {
  const isAuthenticated = AuthHandle.signin();

  if (isAuthenticated) {
    // If authenticated, navigate to "/admin/dashboard"
    return <Outlet />;
  }

  // If not authenticated, render the Outlet (nested routes)
  return <Navigate to="/" />;
};
