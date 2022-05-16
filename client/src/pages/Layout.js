import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../utils/auth";

//const auth = useAuth();

const Layout = () => {
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
{
 // !auth.use
}
      <Outlet />
    </>
  );
};

export default Layout;