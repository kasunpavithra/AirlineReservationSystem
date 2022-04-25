import { useAuth } from "./auth";
import { Navigate } from "react-router-dom";        
export const RequireAuth = ({chidren})=>{
    const auth = useAuth();
    if(!auth.user){
        return <Navigate to="/login" />
    }
    return chidren;

}