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


  export default {
    update
  }