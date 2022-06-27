const db = require("../db/db");
const getAllFlights = () => {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT flightID,routeID,dispatchTime,flightTimeID FROM `flight` right OUTER JOIN `flighttime` using(`flightID`);";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getAllDestinations = () => {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT name,airport_id FROM `airport`;";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};



const getAllPassengerTypes = () => {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT classID,name FROM `class`;";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getFlightsbyDate = (params) => {
  console.log(params);
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT flightID,routeID,dispatchTime,flightTimeID FROM `flight` right OUTER JOIN `flighttime` using(`flightID`) where dispatchTime like '%" +
      params.year +
      "-" +
      (params.month.length === 1 ? "0" + params.month : params.month) +
      "-" +
      (params.date.length === 1 ? "0" + params.date : params.date) +
      "%';";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        console.log(result);
        return resolve(result);
      }
    });
  });
};
const getFlightsOnwards = (params) => {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT * FROM `flight` NATURAL JOIN `flighttime`,`route` where route.routeID=flight.routeID AND flighttime.dispatchTime >= '" +
      params.year +
      "-" +
      (params.month.length === 1 ? "0" + params.month : params.month) +
      "-" +
      (params.date.length === 1 ? "0" + params.date : params.date) +
      "' and route.originID=" +
      params.originID +
      " and route.destinationID=" +
      params.destinationID +
      ";";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getFlightsById = (params) => {
  console.log(params);
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT flightID FROM `flight` order by flightID;";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        console.log(result);
        return resolve(result);
      }
    });
  });
};




const getPassengersByDateDestination = (params) => {
  
  return new Promise((resolve, reject) => {
    var sql =
    "SELECT count(*) as passengers FROM `booking` where status=0 and flightID in (  select flightID from (Select flightID from flighttime group by flightID having max(dispatchTime)  between ? and ?) as dispatchdate  where flightID in  (SELECT flightID FROM `flight` join `route` using(RouteID)  where DestinationID=?));"
    const valueSet=[params.StartDate,params.EndDate,params.Destination]
    console.log(valueSet)
    db.query(sql,valueSet, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        console.log(result);
        return resolve(result);
      }
    });
  });
};


const getPassengersByFlightId= (params) => {
  console.log(params);
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT count(*) as passengers FROM `booking` where flightID=? and under18=? and status=0;";
    const valueSet=[params.FlightNo,params.AgeType]
    db.query(sql,valueSet, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        console.log(result);
        return resolve(result);
      }
    });
  });
};



module.exports = {
  getAllFlights,
  getFlightsbyDate,
  getFlightsOnwards,
  getFlightsById,
  getPassengersByFlightId,
  getAllDestinations,
  getPassengersByDateDestination,
  getAllPassengerTypes
};
