import { useAuth } from "../utils/auth";
import { Navigate, useNavigate } from "react-router-dom"; 
const Contact = () => {
  const auth = useAuth();

  const handleLogout = ()=>{
      auth.logout();
      Navigate('/');
  }

  return (
    <div>
      <h1>Welcome {auth.user}</h1>
      <button onClick={handleLogout}>Logout Here</button>
    </div>
  );
};

export default Contact;
