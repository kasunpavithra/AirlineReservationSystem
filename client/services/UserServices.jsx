import axios from "axios";
import config from "../src/config.json";

const APIEndpoint = config.DOMAIN_NAME + '/api';

const update = (formData) => {
    // console.log(data);
    console.log('hello')
    return axios({
      method: "put",
      url: APIEndpoint + '/registered-customer/updatebycustomer',
      data:formData,
      // headers: { 'content-type': 'multipart/form-data'}

    //   },
    //   headers: {Authorization: `Bearer ${token.getAccessToken()}`}
    });
  };

  
const createGuest = (formData) => {
  // console.log(data);
  console.log('hello')
  return axios({
    method: "post",
    url: APIEndpoint + '/guest/create',
    data:formData,
    // headers: { 'content-type': 'multipart/form-data'}

  //   },
  //   headers: {Authorization: `Bearer ${token.getAccessToken()}`}
  });
};



  const getcustomer = (customerid) => {
    // console.log(data);
    console.log('hello')
    return axios({
      method: "get",
      url: APIEndpoint + `/registered-customer/get/${customerid}`,
      // headers: { Authorization: `Bearer ${token.getAccessToken()}` },
    });
  };
  


  export default {
    update,
    getcustomer,
    createGuest
  }