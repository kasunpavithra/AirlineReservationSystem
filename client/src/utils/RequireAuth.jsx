import { useAuth } from "./auth";
import { Navigate, useLocation } from "react-router-dom";
export const RequireAuth = ({ chidren }) => {
  const auth = useAuth();
  const location = useLocation();
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login"  state={{path:location.pathname}} />;
  }
  console.log(chidren);
  return chidren
};
