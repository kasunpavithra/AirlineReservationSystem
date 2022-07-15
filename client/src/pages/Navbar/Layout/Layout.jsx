import { Outlet, Link } from "react-router-dom";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import './Layout.css'
import Logo from "../../../photos/B Airways.png"
import jwtDecode from "jwt-decode";



const Layout = (props) => {
  
  try{
    var user=jwtDecode(localStorage.getItem("AccessToken"))
   }
   catch(err){
     var user=null
   }
  return (
    <div class='fixed-top row' >
      {/* <Navbar className="fixed-top bg-light NAV  " > */}
      {/* <section className="landing-header"> */}
    
            <div className="fixed-top  pt-2 landing-nav-links1">
            <div className="fixed-top logo  col-1 ">
              <img width='200' height="314" src={Logo} alt="" />
            </div>
        
            <ul>
              {/* <Nav.Link style={{color:'red',hover:'blue'}} as={Link} to="/"><b>Home </b></Nav.Link>
              <li><b><a href="/about-us">About-us </a></b></li>
              {
                user?.userInfo?.role==5002 && (<li><b><a href="/admin">Dashboard </a></b></li>)
              }
               {
                user?.userInfo?.role==5003 && (<li><b><a href="/manager">Dashboard </a></b></li>)
              }
               {
                (user?.userInfo?.role!=5002  && user?.userInfo?.role!=5003)  && (<li><b><a href="/dashboard">Dashboard </a></b></li>)
              }
              {(((props.content!='login'|| props.user=='authorized')  && !user)&& (<li><b><a href="/login">CustomerLogin</a></b></li>))}
              {(((props.content!='login'|| props.user=='public')  && !user)&& (<li><b><a href="/authorizelogin">AuthorizeLogin</a></b></li>))}
              
              {((props.content!='register' && !user)) && (<li><b><a href="/register">Sign Up </a></b></li>)}
              {(user?.userInfo?.role==5000 && props.content!='update') && (
              <li><b><a href="/update">Update </a></b></li>
              )}
              {/* <li><b><a href="/admin">Admin </a></b></li> */}
              {/* {user && (
              <li><b><a href="/logout">Logout </a></b></li>
              )} */}

              <Nav.Link bsPrefix='button' style={{color:'Orange'}} as={Link} to="/"><b>Home </b></Nav.Link>
              <Nav.Link bsPrefix="button" style={{color:'Orange'}}   as={Link} to="/about-us"><b>About-us </b></Nav.Link>
              {
                user?.userInfo?.role==5002 && (<Nav.Link bsPrefix="button" style={{color:'Orange'}}  as={Link} to="/admin"><b>Dashboard</b></Nav.Link>)
              }
               {
                user?.userInfo?.role==5003 && (<Nav.Link bsPrefix="button" style={{color:'Orange'}}  as={Link} to="/manager"><b>Dashboard</b></Nav.Link>)
              }
               {
                (user?.userInfo?.role!=5002  && user?.userInfo?.role!=5003)  && (<Nav.Link bsPrefix="button" style={{color:'Orange'}}  as={Link} to="/dashboard"><b>Dashboard</b></Nav.Link>)
              }
              {(((props.content!='login'|| props.user=='authorized')  && !user)&& (<Nav.Link bsPrefix="button" style={{color:'Orange'}}  as={Link} to="/login"><b>CustomerLogin</b></Nav.Link>))}
              {(((props.content!='login'|| props.user=='public')  && !user)&& (<Nav.Link bsPrefix="button"style={{color:'Orange'}}  as={Link} to="/authorizelogin"><b>AuthorizeLogin</b></Nav.Link>))}
              
              {((props.content!='register' && !user)) && (<Nav.Link bsPrefix="button" style={{color:'Orange'}}  as={Link} to="/register"><b>Sign Up </b></Nav.Link>)}
              {(user?.userInfo?.role==5000 && props.content!='update') && (
              <Nav.Link bsPrefix="button" style={{color:'Orange'}}  as={Link} to="/update"><b>Update</b></Nav.Link>
              )}
              {/* <li><b><a href="/admin">Admin </a></b></li> */}
              {user && (
              <Nav.Link bsPrefix="button" style={{color:'Orange'}}  as={Link} to="/logout"><b>Logout</b></Nav.Link>
              )}
              
                </ul>
            </div>
          
      
          
        {/* </section> */}
      {/* </Navbar> */}

     
    </div>
    
  
      /* <div className="fixed-top">
         <div className=" fixed-top landing-header1">
                <div className="landing-headerGradient1"></div> */
/*             
                <nav className="fixed-top landing-nav1">
                <div className="logo">
              <img width='400' height="300" src={Logo} alt="" />
            </div> */
                    /* <a href="index.html"><img src="Dedsec.png" /></a> */
                    /* <div className="landing-nav-links1">
                        <ul>
                            <li><b><a href="/login">LOGIN</a></b></li>
                            <li><b><a href="/register">REGISTER</a></b></li>
                            <li><b><a href="/about">ABOUT</a></b></li>
                            <li><b><a href="/contact">CONTACT</a></b></li>
                        </ul>
                    </div>
                </nav> */
            /* </div>
            </div> */
             
            /* <Outlet /> */

   

      // {!auth.user && <Link onClick={auth.logout} to="/login"> LogoutHere </Link>}
  );
};

export default Layout;