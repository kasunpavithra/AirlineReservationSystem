import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Navbar/Layout/Layout";
import Home from "./pages/Navbar/Home/Home";
// import Contact from "./pages/Contact";
import NoPage from "./pages/Navbar/NoPage/NoPage";
import Login from "./pages/Navbar/Login/Login";
import Register from "./pages/Navbar/Register/Register";
import Update from "./pages/User/Update/Update";
import { AuthProvider, useAuth } from "./utils/auth";
import { RequireAuth } from "./utils/RequireAuth";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import BookSeat from "./pages/User/BookSeat/BookSeat";
import ManagerDashboard from "./pages/Manager/ManagerDashboard"
import {ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/User/Dashboard/Dashboard";
import GetFlight from "./pages/User/GetFlight/GetFlight";
import Landing from "./pages/LandingPage/Landing";
import ViewBookings from "./pages/User/ViewBookings/ViewBookings";



function App() {
  const auth = useAuth();

  const Contact = () => {
    const auth = useAuth();

    const handleLogout = () => {
      auth.logout();
      Navigate("/");
    };

    return (
      <div>
        <h1>Welcome {auth.user}</h1>
        <button onClick={handleLogout}>Logout Here</button>
      </div>
    );
  };

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
            <Route path="/" element={<Layout />}>
            {/* Auth required routes*/}

            <Route index element={<Home />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/getFlight" element={<GetFlight />} />

            <Route
              exact
              path="contact"
              element={
                <RequireAuth>
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
            />

            <Route exact path="*"         element={<NoPage />} />
            <Route exact path="/register" element={<Register/>}/>
            {/* User routes */}
            <Route exact path="/update"   element={<Update/>} />
            <Route exact path="/bookSeat"   element={<BookSeat/>} />
            <Route exact path="/manager/*"   element={<ManagerDashboard/>} />
            <Route exact path="/login" element={<Login />} />

            {/* User routes */}
  
            <Route exact path="/userbookings" element={<ViewBookings/>} />

          </Route>
          {/* Other routes */}
          <Route exact path="/admin/*" element={<AdminDashboard />} />
          <Route exact path="/landing" element={<Landing />} />


          {/* {localStorage.getItem("token") ? (
            <Route exact path="blogs" element={<Blogs />} />
          ) : (
            <Navigate to="/login" />
          )} */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </div>
  );
}

export default App;
