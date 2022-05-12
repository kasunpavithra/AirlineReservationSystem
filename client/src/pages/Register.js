import '../styles/registerStyle.css';
import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [inputs,setInputs]= useState({});

  const register = ()=>{
    axios.post("http://localhost:3001/api/register",inputs).then(res=>{
      if(res.data.success) navigate("/login",{replace:false});
      else console.log("HI?"+res.data.err.message);
    });
  };

  const handleChange = (event)=>{
    
    const name = event.target.name;
    const value= event.target.value;
    setInputs(values=>({...values,[name]:value}));
  }

  

  const handleSubmit = (event)=>{
    event.preventDefault();
    register();
  }
  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">Create Account</h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input onChange={handleChange} className="form-control" id="inputFirstName" name="FirstName" type="text" placeholder="Enter your first name" required />
                            <label htmlFor="inputFirstName">First name</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input onChange={handleChange} className="form-control" id="inputLastName" name="LastName" type="text" placeholder="Enter your last name" />
                            <label htmlFor="inputLastName">Last name</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <input onChange={handleChange} className="form-control" id="inputEmail" type="email" name="Email" placeholder="name@example.com" required />
                        <label htmlFor="inputEmail">Email address</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input onChange={handleChange} className="form-control" id="inputAddress" type="text" name="Address" placeholder="Your address" required />
                        <label htmlFor="inputEmail">Address</label>
                      </div>
                      {/* <!--Edditing to add phone to the form--> */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input onChange={handleChange} className="form-control" id="inputmobile" name="mobile" type="tel" placeholder="Enter your phone number" required />
                            <label htmlFor="inputmobile">Mobile</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input onChange={handleChange} className="form-control" id="inputBirthday" name="birthday" type="date" required />
                            <label htmlFor="inputmobile">Birthday</label>
                          </div>
                        </div>
                      </div>
                      {/* <!--end of phone--> */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input onChange={handleChange} className="form-control" id="inputPassword" name="password" type="password" placeholder="Create a password" required />
                            <label htmlFor="inputPassword">Password</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input onChange={handleChange} className="form-control" id="inputPasswordConfirm" name="confirm" type="password" placeholder="Confirm password" required />
                            <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <select onChange={handleChange} value={inputs.gender || ".."} className="form-select" name="gender" id="inputGender">
                              <option value="..">..</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                            {/* <input className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" required /> */}
                            <label htmlFor="inputGender">Gender</label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 mb-0">
                        <div className="d-grid"><input className="btn btn-primary btn-block" type="submit" name="Create" value="Create Account" /></div>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center py-3">
                    <div className="small"><a href="login.html">Have an account? Go to login</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id="layoutAuthentication_footer">
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">Copyright &copy; CreegoAds.com</div>
              <div>
                <a href="#">Privacy Policy</a>
                &middot;
                <a href="#">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Register;
