import axios from "axios";
import config from "../src/config.json";

const APIEndpoint = config.DOMAIN_NAME + '/api';


const getFlightNumbers = () => {
    return axios({
      method: "get",
      url: APIEndpoint + "/flights/allFlightIds",
    //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
    });
  };

const getFlightNumberPassengers = (Data) => {
  
  return axios({
    method: "get",
    url: APIEndpoint + `/flights/allFlightIdsPassengers/${Data['Flight No']}/${Data['Age Type']}`,
  //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

export default{
    getFlightNumbers,
    getFlightNumberPassengers
}