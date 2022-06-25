import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../../utils/auth";


const Layout = () => {
  const auth = useAuth();
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/"> Home</Link>
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
          <li>
            <Link to="/admin"> admin </Link>
          </li>
        </ul>
      </nav>
      <Outlet />

      {!auth.user && <Link onClick={auth.logout} to="/login"> LogoutHere </Link>}
    </>
  );
};

export default Layout;