// import AuthServices from '../services/AuthServices';
import {useEffect,useState } from 'react';
import axios from "axios";
// import Loader from "./loader/Loader";
import Token from '../../../../services/Token'
import { useNavigate } from 'react-router-dom';
import Messages from '../../LandingPage/Messages';
const Logout=()=>{
  const navigate=useNavigate()
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
      
      navigate('/')
      Messages.ErrorMessage({
      
        custom_message: "Logged out"
    })

    } catch (error) {
      localStorage.clear();
      navigate('/')
      Messages.ErrorMessage({
      
        custom_message: "Logged out"
    })
      
    }
    // setLoader(false); 
    
  }
  // if(loader){
  //   return <Loader/>
  // }


}

export default Logout;