import { useState } from "react";
import Axios from "axios";

const Home = () => {

  const [authStatus, setauthStatus] = useState("");

  const checkAuth = ()=>{
    Axios.get("http://localhost:3001/api/auth/checklogin", {headers:{
      "authorization": localStorage.getItem("token")
    }}).then((response)=>{
      if (response.data.auth) setauthStatus("You are Authenticated!");
      else setauthStatus("You're not authenticated!");
    }).catch((err)=>{
      console.log(err);
      setauthStatus("You're not authenticated!");
    });
  }

  return (
    <>
      <h1>Home</h1>
      <h2>Authentication status:{authStatus}</h2>
      <button onClick={checkAuth}>Check Authentication Status</button>
    </>
  );
};

export default Home;
