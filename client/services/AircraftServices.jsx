import axios from "../services/HttpServices";
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
    url: APIEndpoint + `/airCraft/allAirCraftsByManager`,
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



const    getallairports=()=>{
  return axios({
    method: "get",
    url: APIEndpoint + `/airport/all`,
  //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
}

const  getalllevels=()=>{
  return axios({
    method: "get",
    url: APIEndpoint + `/level/allLevels`,
  //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
}


const  getairportlevels=(id)=>{
  console.log(id)
  return axios({ 
    method: "get",
    url: APIEndpoint + `/airportInfo/getAirportInfoByID/${id}`,
  //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
}

const getallroutes=()=>{

  return axios({ 
    method: "get",
    url: APIEndpoint + `/routes/allRoutesForManager`,
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
    updateaircraft,
    getallairports,
    getalllevels,
    getairportlevels,
    getallroutes
}

