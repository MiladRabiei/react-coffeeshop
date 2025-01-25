import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import CircleSpinner from '../CircleSpinner/CircleSpinner';

export default function PrivateRoute() {
  let { userInfos, isLoggedIn, isLoading } = useContext(AuthContext);
  let location = useLocation();
  
  let isCmsPage = location.pathname.toLowerCase() === "/cms"; 

  if (isLoading) {
    return <CircleSpinner />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/Login" replace />;
  }

  if (isCmsPage && userInfos && userInfos.role !== "admin") {
    return <Navigate to="/Forbidden" replace />;
  }
    
  
  return <Outlet />;
}
