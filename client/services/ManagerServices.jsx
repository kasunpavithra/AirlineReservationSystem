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

  

  
const getPassengerTypes = () => {
  return axios({
    method: "get",
    url: APIEndpoint + "/flights/allPassengerTypes",
  //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

  const getDestinationNames = () => {
    return axios({
      method: "get",
      url: APIEndpoint + "/flights/allDestinations",
    //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
    });
  };

  

  const getDateDestinationPassengers = (Data) => {
    return axios({
      method: "get",
      url: APIEndpoint + `/flights/allDateDestinationPassengers/${Data['Destination Id']}/${Data['Start Date']}/${Data['End Date']}`,
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
    getFlightNumberPassengers,
    getDestinationNames,
    getDateDestinationPassengers,
    getPassengerTypes
}