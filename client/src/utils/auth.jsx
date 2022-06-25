import { useState, createContext, useContext } from "react";
import Axios from "axios";
import { useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    // Axios.get("http://localhost:3001/api/auth/checklogin", {headers:{
    //   "x-access-token": localStorage.getItem("token")
    // }}).then((response)=>{
    //   if (response.data.auth) setUser(response.data.userID);
    // }).catch((err)=>{
    //   console.log(err);
    // });
    const userID = localStorage.getItem("userID")
    if(userID) setUser(userID);
  })

  const login = ({ email, password }) => {
    // console.log(email, password);

    Axios.post("http://localhost:3001/api/auth/login", {
      email,
      password,
    }).then((response) => {
      if (response) {
        if (response.data.auth) {
          // console.log(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userID", response.data.result.userID);
          setUser(response.data.result.userID);
          return true
        }
      }
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// import {
//   useState,
//   createContext,
//   children,
//   useContext,
//   useEffect,
// } from "react";
// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (localStorage.getItem("user")) {
//       setUser(localStorage.getItem("user"));
//     }
//   });

//   const login = (user) => {
//     setUser(user);
//     if (user) {
//       localStorage.setItem("user", user);
//     }
//   };
//   const logout = () => {
//     setUser(null);
//     localStorage.setItem("user", null);
//   };
//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
