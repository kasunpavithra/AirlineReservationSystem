import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
// import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider, useAuth } from "./utils/auth";
import { RequireAuth } from "./utils/RequireAuth";
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

            <Route
              exact
              path="/redirect"
              element={<Navigate to="/register" />}
            />

            {/* {localStorage.getItem("token") ? (
            <Route exact path="blogs" element={<Blogs />} />
          ) : (
            <Navigate to="/login" />
          )} */}

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
            <Route exact path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
