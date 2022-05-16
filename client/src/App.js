import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
<<<<<<< HEAD
import Update from "./pages/Update";
import { AuthProvider } from "./utils/auth";

=======
import { AuthProvider, useAuth } from "./utils/auth";
import { RequireAuth } from "./utils/RequireAuth";
import AdminDashboard from "./pages/admin/AdminDashboard";
>>>>>>> bd0eba56771d6de2dabb197d6b82fea4f4f0ade8
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
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />

            <Route exact path="/login" element={<Login />} />
<<<<<<< HEAD
            <Route exact path="/redirect" element={<Navigate to="/register" />}/>
=======

            <Route
              exact
              path="/redirect"
              element={<Navigate to="/register" />}
            />
>>>>>>> bd0eba56771d6de2dabb197d6b82fea4f4f0ade8

            {/* {localStorage.getItem("token") ? (
            <Route exact path="blogs" element={<Blogs />} />
          ) : (
            <Navigate to="/login" />
          )} */}
<<<<<<< HEAD
            <Route exact path="/blogs" element={false ? <Blogs /> : <Navigate to="/login" />}/>
            <Route exact path="/contact" element={<Contact />} />
=======

            <Route
              path="/blogs"
              element={
                <RequireAuth>
                  <Blogs />
                </RequireAuth>
              }
            />

            <Route exact path="/register" element={<Register />} />

            <Route
              exact
              path="/contact"
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

>>>>>>> bd0eba56771d6de2dabb197d6b82fea4f4f0ade8
            <Route exact path="*" element={<NoPage />} />
            <Route exact path="/update" element={<Update/>} />
          </Route>

          <Route exact path="/admin/*" element={<AdminDashboard />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
