const db = require("../db/db");
const getAirCraftByRoute = (data) => {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT * from `aircraft` NATURAL JOIN `aircrafttype` where `aircraftID` in (SELECT aircraftID FROM `flight` NATURAL JOIN `flighttime`,`route` where flight.RouteID=route.RouteID and dispatchTime LIKE '%" +
      data.year +
      "-" +
      (data.month.length == 1 ? "0" + data.month : data.month) +
      "-" +
      (data.date.length == 1 ? "0" + data.date : data.date) +
      "%' and route.OriginID=" +
      data.originID +
      " and route.DestinationID=" +
      data.destinationID +
      ");";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getAirCraftByFlight = (data) => {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT * FROM FLIGHT NATURAL JOIN AIRCRAFT,AIRCRAFTTYPE WHERE AIRCRAFT.AIRCRAFTTYPEID=AIRCRAFTTYPE.AIRCRAFTTYPEID AND FLIGHTID=?";
    db.query(sql, data.flightID, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = {
  getAirCraftByRoute,
  getAirCraftByFlight,
};
