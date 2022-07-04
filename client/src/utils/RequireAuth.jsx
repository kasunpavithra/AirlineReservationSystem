import { useAuth } from "./auth";
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import jwtDecode from "jwt-decode";
import { allow } from "joi";

export const RequireAuth = ({ children, allowedRoles }) => {
  const location = useLocation();

  try {
    var user=jwtDecode(localStorage.getItem('AccessToken'))
  } catch (err) {
    var user = null;
  }


 
  // console.log
  console.log(user?.userInfo?.role)
  console.log(allowedRoles)
  console.log('path',location)
  console.log('kfdsfd',location.pathname.split("/")[1]
  )
  
  return allowedRoles?.find((role) => user?.userInfo?.role==role) ? (
    children
  ) : user? (
    <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />
  ) : (
  
    location.pathname.split("/")[1]=='admin' || location.pathname.split("/")[1]=='manager'  ?
    <Navigate to="/authorizelogin" state={{ from: location.pathname }} replace /> :<Navigate to="/login" state={{ from: location.pathname }} replace /> 
    
  );
};

//kasun

// export const RequireAuth = ({ allowedRoles }) => {
//   const { auth } = useAuth();
//   const location = useLocation();

//   return auth?.role && allowedRoles.includes(auth.role) ? (
//     <Outlet />
//   ) : auth?.user ? (
//     <Navigate to="/unauthorized" state={{ from: location }} replace />
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };
