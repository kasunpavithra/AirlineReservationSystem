import React from "react";
import "./Login.css";
import { useState } from "react";
import { useNavigate, Link,useLocation} from "react-router-dom";
import { useAuth } from "../../../utils/auth";
import { useEffect } from "react";
import { useRef } from "react";
import Messages from "../../LandingPage/Messages";

// import axios from '../../../../services/HttpServices'
import axios from "../../../api/axios";
import Layout from './../Layout/Layout';
import Validation from "../../../Validation/updateValidation";
import UserServices from "../../../../services/UserServices";
const LOGIN_URL = "/api/auth/login";


function Login(prop) {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/navigation"  //you need to specify here dashboard 

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [guestemail, setGuestEmail] = useState("");
  const [guestid, setGuestID] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errors, setError] = useState("");
 
 

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleGuest =async(event)=>{
    event.preventDefault();
    const state={ 'Email':guestemail, 'Refno':guestid}
    const {value,error}=Validation.guestLogin(state)
    console.log(error);
    if (error) {
        console.log("error",error)
        if(error){
            const errors={}
            error.details.map(item => {
                errors[item.path[0]] = item.message;
            });
            setError(errors);
        
        }
        else{
            setError({})
        }
   
    } 
    else{

            try {

                // const formData = new FormData();
                // formData.append("firstname", state['First Name']);
                // formData.append("lastname",state['Last Name']);

                const response = await UserServices.guestLogin(state)
                console.log(response);
               
                if (response.status === 200 && response.data.result.length===1) {
                Messages.SuccessMessage("Success");
                console.log('dfsdfdfaa')
                navigate(`/guestuserbookings`,{state:response?.data?.result[0]});

                // setTimeout(() => {
                //     // setLoader(false);
                // }, 200);
                }
                
                
                
            } catch (error) {
                console.log(error);
                Messages.ErrorMessage({
                error: error,
                custom_message: `Update fail`,
                });
                // setLoader(false)
                navigate(0);
            }
        }
    
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('hi')
    var details={}
    if(prop.user=="authorized"){
      details= {
        email: email,
        password: pwd,
        isAuthorizedUser:true
      
      }
    }
    else 
    if(prop.user=="public"){
       details= {
        email: email,
        password: pwd, 
      }
    }

    try {
      const response = await axios.post(
        
        // prop.user=="authorized"?
        LOGIN_URL,
        details,
        {
          headers: { "Content-Type": "application/json" },
          //   withCredentials: true,
          withCredentials:true
        }
      // :
      // (LOGIN_URL,
      // {
      //   email: email,
      //   password: pwd,
       
      // },
      // {
      //   headers: { "Content-Type": "application/json" },
      //   //   withCredentials: true,
      // })

      );
      // console.log(JSON.stringify(response?.data));
      // const accessToken = response?.data?.accessToken;
      // const role = response?.data?.role;    //5000 for registered customer
      // setAuth({ user:email, role:5000, accessToken }); //you need to customise here
      localStorage.setItem("AccessToken", response?.data?.accessToken);
     
      // setEmail("");
      // setPwd("");
      if(response.status===200){
        Messages.SuccessMessage('Login Success')
      }
      console.log(location)
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
      <Layout content={'login'} user={prop.user}/>
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
                    <i className="fas fa-user" style={{color:'red'}}></i>
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
                    <i className="fas fa-key" style={{color:'red'}}></i>
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
              {/* <div className="row align-items-center loginremember">
                <input type="checkbox" />
                Remember Me
              </div> */}
              <div className="form-group mt-4">
                <input
                  type="submit"
                  value="Login"
                  className=" float-right loginlogin_btn"
                />
              </div>
            </form>
          </div>
          <div className="card-footer">
            {/* <div className="d-flex justify-content-center loginlinks">
              Don't have an account?
            </div> */}
            <div className="d-flex justify-content-center loginlinks mt-2" style={{color:'red'}}>
              Have done any bookings as a guest?
            </div>
            <form onSubmit={handleGuest} className="d-flex justify-content-center loginlinks mr-5">
              <div class='row'>
              <div class="row d-flex justify-content-center loginlinks ">
                <div class="col-lg-10  col-lg-offset-3">
                  <div class="input-group">
                    <input type="text"   onChange={(e) => setGuestEmail(e.target.value)} class="form-control" size="300" name="Ref_no" placeholder="Enter Email"/> 
                    {/* <span class="input-group-btn">
                      <button class="btn btn-success" type="submit">Submit</button>
                    </span>	 */}
                    {/* <div class="col-3">

                    </div> */}
                    <br></br>
                   
                  </div>
                  {errors['Email'] !== '' && <p className="error">{errors['Email']}</p>}
                </div>
              </div>
              <div class="row d-flex justify-content-center loginlinks mt-2">
                <div class="col-lg-10 col-lg-offset-3">
                  <div class="input-group ">
                    <input type="text" onChange={(e) => setGuestID(e.target.value)}  class="form-control" size="300" name="Ref_no" placeholder="Enter Reference Number"/> 
                    <span class="input-group-btn">
                      <button class="btn btn-success" type="submit">Submit</button>
                    </span>	
                  </div>
                  {errors['Refno'] !== '' && <p className="error ml-2">{errors['Refno']}</p>}
                </div>
              </div>
              </div>
        
              
              
          </form>
            {/* <div className="d-flex justify-content-center">
              <a href="#">Forgot your password?</a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
