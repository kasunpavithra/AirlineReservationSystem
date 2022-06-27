import { Outlet, Link } from "react-router-dom";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import './Layout.css'
import Logo from "../../../photos/B Airways.png"



const Layout = () => {
  
  try{
    // var user=jwtDecode(Token.getAccessToken())
   }
   catch(err){
     var user=null
   }
  return (
    <div className='Layout.css'>
      <Navbar className="navbar navbar-expand-sm navbar-dark bg-dark NAV" >
        
        <div className="contents">
          <Container>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/"  className="navlink" style={{borderRadius: "30px",textDecoration: "none"}}>Home </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="navlink" style={{borderRadius: "30px",textDecoration: "none", color: "#1376BD"}}> Contact </Nav.Link>
              <Nav.Link as={Link} to="/dashboard" className="navlink" style={{borderRadius: "30px",textDecoration: "none", color: "#1376BD"}}> Dashboard </Nav.Link>
              <Nav.Link as={Link} to="/register" className="navlink" style={{borderRadius: "30px",textDecoration: "none", color: "#1376BD"}}> Register </Nav.Link>
              <Nav.Link as={Link} to="/admin" className="navlink" style={{borderRadius: "30px",textDecoration: "none", color: "#1376BD"}}> Admin </Nav.Link>
              {user && (
              <Nav.Link as={Link} to='/logout' className="navlink" style={{borderRadius: "30px",textDecoration: "none", color: "#1376BD"}}>Logout</Nav.Link>
              )}
            </Nav>
          </Container>
        </div>
        <div className="logo">
          <img width='400' height="300" src={Logo} alt="" />
        </div>
      </Navbar>
    
     
      <Outlet />
    </div>
   

      // {!auth.user && <Link onClick={auth.logout} to="/login"> LogoutHere </Link>}
  );
};

export default Layout;