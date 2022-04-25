import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../utils/auth";



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
      {!auth.user && <Link to="/login"> LogoutHere </Link>}
      <Outlet />
    </>
  );
};

export default Layout;