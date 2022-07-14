// import AuthServices from '../services/AuthServices';
import {useEffect,useState } from 'react';
import axios from "axios";
// import Loader from "./loader/Loader";
import Token from '../../../../services/Token'
const Logout=()=>{
  // const [loader, setLoader] = useState(false);
  useEffect(()=>{
    logout();
  },[])
  const logout = async () => {
    
    try {
      // setLoader(true);
      
      const user=Token.getAuth()
    
      const response = await axios({
        method: "get",
        url:  `http://localhost:3001/api/auth/logout/${user.userInfo.role}`,
        withCredentials:true
      });
      localStorage.clear();
      window.location.href="/";

    } catch (error) {
      localStorage.clear();
      window.location.href="/";
      
    }
    // setLoader(false); 
    
  }
  // if(loader){
  //   return <Loader/>
  // }


}

export default Logout;