import axios from "axios";
import config from "../src/config.json";

const APIEndpoint = config.DOMAIN_NAME + '/api';


const addaircrafttype = (formData) => {
    console.log('aircrafttype')
    return axios({
      method: "post",
      url: APIEndpoint + `/airCraftType/add`,
      data:formData,
    //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
    });
  };

const getallaircrafttypes=()=>{
  return axios({
    method: "get",
    url: APIEndpoint + `/airCraftType/get`,
  //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });

}

const getaircraft=(id)=>{
  return axios({
    method: "get",
    url: APIEndpoint + `/airCraftType/get/${id}`,
  //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });

}



  

  export default{
    addaircrafttype,
    getallaircrafttypes,
    getaircraft
}

