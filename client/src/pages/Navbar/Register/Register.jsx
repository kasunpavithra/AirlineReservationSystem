import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./registerStyle.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const NAME_REGEX = /^[a-z ,.'-]+$/i;
const MOBILE_REGEX =
  /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{9}|(\d[ -]?){10}\d$/;

const Register = () => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const errRef = useRef();

  const [fName, setFName] = useState("");
  const [validFName, setValidFName] = useState(false);
  const [fNameFocus, setFNameFocus] = useState(false);

  const [LName, setLName] = useState("");
  const [validLName, setValidLName] = useState(false);
  const [LNameFocus, setLNameFocus] = useState(false);

  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [addressFocus, setAddressFocus] = useState(false);

  const [mobile, setMobile] = useState("");
  const [validMobile, setValidMobile] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);

  const [bDay, setBDay] = useState("");
  const [validBDay, setValidBDay] = useState(false);
  const [bDayFocus, setBDayFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [gender, setGender] = useState("");
  const [validGender, setValidGender] = useState(false);
  const [genderFocus, setGenderFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = NAME_REGEX.test(fName);
    setValidFName(result);
  }, [fName]);

  useEffect(() => {
    const result = NAME_REGEX.test(LName);
    setValidLName(result);
  }, [LName]);

  useEffect(() => {
    const result = MOBILE_REGEX.test(mobile);
    setValidMobile(result);
  }, [mobile]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd, fName, LName, address, mobile, gender, bDay]);

  const handleSubmit = (event) => {
    // event.preventDefault();
    // axios
    //   .post("http://localhost:3001/api/register", inputs)
    //   .then((res) => {
    //     if (res.data.success) navigate("/login", { replace: true });
    //     else console.log(res.data.err); //handle already exists here
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Create Account
                    </h3>
                    <p
                      ref={errRef}
                      className={errMsg ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              onChange={(e) => setFName(e.target.value)}
                              ref={nameRef}
                              className="form-control"
                              id="inputFirstName"
                              name="FirstName"
                              type="text"
                              placeholder="Enter your first name"
                              onFocus={() => setFNameFocus(true)}
                              onBlur={() => setFNameFocus(false)}
                              required
                            />
                            <label htmlFor="inputFirstName">First name</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              onChange={(e) => setLName(e.target.value)}
                              className="form-control"
                              id="inputLastName"
                              name="LastName"
                              type="text"
                              placeholder="Enter your last name"
                              onFocus={() => setLNameFocus(true)}
                              onBlur={() => setLNameFocus(false)}
                            />
                            <label htmlFor="inputLastName">Last name</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          id="inputEmail"
                          type="email"
                          name="Email"
                          placeholder="name@example.com"
                          autoComplete="off"
                          aria-invalid={validEmail ? "false" : "true"}
                          aria-describedby="uidnote"
                          onFocus={() => setEmailFocus(true)}
                          onBlur={() => setEmailFocus(false)}
                          required
                        />
                        <p
                          id="uidnote"
                          className={
                            emailFocus && email && !validEmail
                              ? "instructions"
                              : "offscreen"
                          }
                        ></p>
                        <label htmlFor="inputEmail">
                          Email address
                          <span className={validEmail ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                          <span
                            className={
                              validEmail || !email ? "hide" : "invalid"
                            }
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </span>
                        </label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control"
                          id="inputAddress"
                          type="text"
                          name="Address"
                          placeholder="Your address"
                          onFocus={() => setAddressFocus(true)}
                          onBlur={() => setAddressFocus(false)}
                          required
                        />
                        <label htmlFor="inputEmail">Address</label>
                      </div>
                      {/* <!--Edditing to add phone to the form--> */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              onChange={(e) => setMobile(e.target.value)}
                              className="form-control"
                              id="inputmobile"
                              name="mobile"
                              type="tel"
                              placeholder="Enter your phone number"
                              onFocus={() => setMobileFocus(true)}
                              onBlur={() => setMobileFocus(false)}
                              required
                            />
                            <label htmlFor="inputmobile">Mobile</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              onChange={(e) => setBDay(e.target.value)}
                              className="form-control"
                              id="inputBirthday"
                              name="birthday"
                              type="date"
                              required
                            />
                            <label htmlFor="inputmobile">Birthday</label>
                          </div>
                        </div>
                      </div>
                      {/* <!--end of phone--> */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              onChange={(e) => setPwd(e.target.value)}
                              className="form-control"
                              id="inputPassword"
                              name="password"
                              type="password"
                              placeholder="Create a password"
                              onFocus={() => setPwdFocus(true)}
                              onBlur={() => setPwdFocus(false)}
                              required
                            />
                            <label htmlFor="inputPassword">Password</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              onChange={(e) => setMatchPwd(e.target.value)}
                              className="form-control"
                              id="inputPasswordConfirm"
                              name="confirm"
                              type="password"
                              placeholder="Confirm password"
                              onFocus={() => setMatchFocus(true)}
                              onBlur={() => setMatchFocus(false)}
                              required
                            />
                            <label htmlFor="inputPasswordConfirm">
                              Confirm Password
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <select
                              onChange={(e) => setGender(e.target.value)}
                              value={gender || ".."}
                              className="form-select"
                              name="gender"
                              id="inputGender"
                            >
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
                        <div className="d-grid">
                          <input
                            className="btn btn-primary btn-block"
                            type="submit"
                            name="Create"
                            value="Create Account"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center py-3">
                    <div className="small">
                      <a href="login.html">Have an account? Go to login</a>
                    </div>
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
