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

  
const addaircraft = (formData) => {
  console.log('aircrafttype')
  return axios({
    method: "post",
    url: APIEndpoint + `/airCraft/add`,
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

const  updateaircrafttype=(data)=>{
  return axios({
    method: "put",
    url: APIEndpoint + `/airCraftType/update/${data.id}`,
    data:data
  //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });

}

const  updateaircraft=(data,id)=>{
  return axios({
    method: "put",
    url: APIEndpoint + `/airCraft/update/${id}`,
    data:data
  //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });

}


const    getallaircrafts=()=>{
  return axios({
    method: "get",
    url: APIEndpoint + `/airCraft/all`,
  //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });

}

const getaircraftbyid=(id)=>{
  return axios({
    method: "get",
    url: APIEndpoint + `/airCraft/getAirCraft/${id}`,
  //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });

}


  

  export default{
    addaircrafttype,
    getallaircrafttypes,
    getaircraft,
    updateaircrafttype,
    getallaircrafts,
    addaircraft,
    getaircraftbyid,
    updateaircraft
}

