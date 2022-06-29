import React from "react";
import "./Login.css";
import { useState } from "react";
import { useNavigate, Link,useLocation} from "react-router-dom";
import { useAuth } from "../../../utils/auth";
import { useEffect } from "react";
import { useRef } from "react";

import axios from "../../../api/axios";
import Layout from './../Layout/Layout';
const LOGIN_URL = "/api/auth/login";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/navigation"  //you need to specify here dashboard 

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          email: email,
          password: pwd,
        },
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
        }
      );
      // console.log(JSON.stringify(response?.data));
      // const accessToken = response?.data?.accessToken;
      // const role = response?.data?.role;    //5000 for registered customer
      // setAuth({ user:email, role:5000, accessToken }); //you need to customise here
      localStorage.setItem("AccessToken", response?.data?.accessToken);
      // setEmail("");
      // setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response!");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password!");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid username, password pair!");
      } else {
        setErrMsg("Login Failed!");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className=" logincontainer">
      <Layout/>
      <div className="mt-5 d-flex justify-content-center h-100">
        <div className="logincard">
          <div className="logincard-header">
            <h1>Log In</h1>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="d-flex justify-content-end loginsocial_icon">
              <span>
                <i className="fab fa-facebook-square"></i>
              </span>
              <span>
                <i className="fab fa-google-plus-square"></i>
              </span>
              <span>
                <i className="fab fa-twitter-square"></i>
              </span>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  name="Email"
                  autoComplete="off"
                  className="form-control"
                  placeholder="Email"
                  value={email || ""}
                  ref={emailRef}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-group form-group mt-2">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="password"
                  autoComplete="off"
                  required
                  value={pwd || ""}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </div>
              <div className="row align-items-center loginremember">
                <input type="checkbox" />
                Remember Me
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Login"
                  className=" float-right loginlogin_btn"
                />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center loginlinks">
              Don't have an account?<Link to="/register">Sign Up</Link>
            </div>
            <div className="d-flex justify-content-center">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
