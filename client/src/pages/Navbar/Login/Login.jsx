import React from 'react'
import './Login.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/auth";

function Login() {
  const [inputs, setInputs] = useState({});
  const auth = useAuth();
  const navigate = useNavigate();

  const handlelogin = () => {
    auth.login({
      email: inputs.username,
      password: inputs.password,
    })
    navigate("/home", { replace: true });
    
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    // console.log(JSON.stringify(inputs));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // alert(JSON.stringify(inputs));
    handlelogin();
  };

  return (
    
        <div className=" logincontainer">
            <div className="mt-5 d-flex justify-content-center h-100">
                <div className="logincard">
                    <div className="logincard-header">
                        <h1 >Log In</h1>
                        <div className="d-flex justify-content-end loginsocial_icon">
                            <span><i className="fab fa-facebook-square"></i></span>
                            <span><i className="fab fa-google-plus-square"></i></span>
                            <span><i className="fab fa-twitter-square"></i></span>
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" name="username" className="form-control" placeholder="username" value={inputs.username || ""} onChange={handleChange} />
                                
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" name="password" className="form-control" placeholder="password" value={inputs.password || ""} onChange={handleChange}/>
                            </div>
                            <div className="row align-items-center loginremember">
                                <input type="checkbox"/>Remember Me
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Login" className=" float-right loginlogin_btn"/>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center loginlinks">
                            Don't have an account?<a href="#">Sign Up</a>
                        </div>
                        <div className="d-flex justify-content-center">
                            <a href="#">Forgot your password?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
  )
}
export default Login


   

