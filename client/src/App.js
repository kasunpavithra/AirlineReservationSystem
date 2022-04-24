import { BrowserRouter, Routes , Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="register" element={<Register />} />
          <Route exact path="blogs" element={<Blogs />} />
          <Route exact path="contact" element={<Contact />} />
          <Route exact path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
