import { useAuth } from "./auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// export const RequireAuth = ({ children, allowedRoles }) => {
//   const location = useLocation();

//   try {
//     // var user=jwtDecode(Token.getAccessToken())
//   } catch (err) {
//     var user = null;
//   }

//   return allowedRoles?.find((role) => user?.role?.includes(role)) ? (
//     children
//   ) : user ? (
//     <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />
//   ) : (
//     <Navigate to="/login" state={{ from: location.pathname }} replace />
//   );
// };

export const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.role && allowedRoles.includes(auth.role) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
