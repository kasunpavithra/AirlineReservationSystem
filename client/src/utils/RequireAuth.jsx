import { useAuth } from "./auth";
import { Navigate, useLocation } from "react-router-dom";
export const RequireAuth = ({ children,allowedRoles }) => {
  const location = useLocation();

  try{
    // var user=jwtDecode(Token.getAccessToken())
   }
   catch(err){
    var user=null
   }
  
  return (
    allowedRoles?.find(role => user?.role?.includes(role))? children
        : user? <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />
            : <Navigate to="/login" state={{ from: location.pathname }} replace />
);
};




 
