import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../utils/auth";

<<<<<<< HEAD
//const auth = useAuth();
=======

>>>>>>> bd0eba56771d6de2dabb197d6b82fea4f4f0ade8

const Layout = () => {
  const auth = useAuth();
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/blogs"> Blogs </Link>
          </li>
          <li>
            <Link to="/contact"> Contact </Link>
          </li>
          <li>
            <Link to="/login"> Login </Link>
          </li>
          <li>
            <Link to="/register"> Register </Link>
          </li>
        </ul>
      </nav>
<<<<<<< HEAD
{
 // !auth.use
}
=======
>>>>>>> bd0eba56771d6de2dabb197d6b82fea4f4f0ade8
      <Outlet />

      {!auth.user && <Link to="/login"> LogoutHere </Link>}
    </>
  );
};

export default Layout;