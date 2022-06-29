import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Navbar/Layout/Layout";
import Home from "./pages/Navbar/Home/Home";
import Contact from "./pages/Navbar/Contact/Contact";
import NotFound from "./pages/Navbar/NoPage/NoPage";
import Login from "./pages/Navbar/Login/Login";
import Register from "./pages/Navbar/Register/Register";
import Update from "./pages/User/Update/Update";
import { AuthProvider, useAuth } from "./utils/auth";
import { RequireAuth } from "./utils/RequireAuth";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import BookSeat from "./pages/User/BookSeat/BookSeat";
import ManagerDashboard from "./pages/Manager/ManagerDashboard";
import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/User/Dashboard/Dashboard";
import GetFlight from "./pages/User/GetFlight/GetFlight";
import Landing from "./pages/LandingPage/Landing";
import ViewBookings from "./pages/User/ViewBookings/ViewBookings";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import Navigation from './pages/Navigation/Navigation';
import Logout from "./pages/Navbar/Logout/logout";

const ROLES = {
  RegisteredUser: 5000,
  Guest: 5001,
  Admin: 5002,
  Manager: 5003,
};

function App() {
  // const auth = useAuth();

  // const Contact = () => {
  //   // const auth = useAuth();

  //   // const handleLogout = () => {
  //   //   auth.logout();
  //   //   Navigate("/");
  //   // };

  //   return (
  //     <div>
  //       <h1>Welcome {auth.user}</h1>
  //       <button onClick={handleLogout}>Logout Here</button>
  //     </div>
  //   );
  // };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Layout Router paths */}
            {/* <Route path="/" element={<Layout />}> */}
              {/* Auth required routes*/}
{/* 
              <Route index element={<Home />} /> */}

              {/* <Route
                exact
                path="contact"
                element={
                  <RequireAuth allowedRoles={[ROLES.RegisteredUser]}>
                    <Contact />
                  </RequireAuth>
                }
              />
              <Route
                exact
                path="/home"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              /> */}

               {/* NavigationBar routings */}
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/navigation" element={<RequireAuth allowedRoles={[ROLES.RegisteredUser,ROLES.Manager,ROLES.Admin]} ><Navigation/></RequireAuth>} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/logout" element={<Logout />} />
             
              {/* Prohibited routings */}
              <Route exact path="*" element={<NotFound />} />
              <Route exact path="/unauthorized" element={<Unauthorized />} />

              {/* Admin Routings */}
              <Route exact path="/admin/*" element={<AdminDashboard />} />

              {/* Manager Routings */}
              <Route exact path="/manager/*" element={<ManagerDashboard />} />
              <Route exact path="/userbookings" element={<RequireAuth allowedRoles={[ROLES.Manager]} ><ViewBookings /></RequireAuth>} />

              {/* User routes */}
              <Route exact path="/dashboard" element={<RequireAuth allowedRoles={[ROLES.RegisteredUser]} ><Dashboard /></RequireAuth>} />
              <Route exact path="/update" element={<RequireAuth allowedRoles={[ROLES.RegisteredUser]} ><Update /></RequireAuth>} />
              <Route exact path="/getFlight" element={<RequireAuth allowedRoles={[ROLES.RegisteredUser,ROLES.Manager,ROLES.Admin]} ><GetFlight /></RequireAuth>} />

              {/* No auth */}
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/bookSeat" element={<BookSeat />} />
            {/* </Route>
           */}

            {/* {localStorage.getItem("token") ? (
            <Route exact path="blogs" element={<Blogs />} />
          ) : (
            <Navigate to="/login" />
          )} */}

            {/* there should be catch all route for 404 requests */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
