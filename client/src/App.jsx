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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Layout Router paths */}
          <Route path="/" element={<Layout />}>
            {/* Auth required routes*/}
            <Route index element={<RequireAuth><Home /></RequireAuth>} />
            <Route exact path="contact" element={<RequireAuth><Contact /></RequireAuth>} />
            <Route exact path="/home" element={<RequireAuth><Home /></RequireAuth>} />

            <Route exact path="/login" element={<Login />} />

            <Route exact path="*" element={<NoPage />} />
            <Route exact path="/register" element={<Register />} />
            {/* User routes */}
            <Route exact path="/update" element={<Update />} />
            <Route exact path="/bookSeat" element={<BookSeat />} />

          </Route>
          {/* Other routes */}
          <Route exact path="/admin/*" element={<AdminDashboard />} />
          

          {/* {localStorage.getItem("token") ? (
            <Route exact path="blogs" element={<Blogs />} />
          ) : (
            <Navigate to="/login" />
          )} */}


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;