const db = require("../db/db");

const getAllRoutes = () => {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT routeID,originID,origin_name,destinationID,destination_name from origin_view LEFT OUTER JOIN destination_view using(routeID) order by origin_name,destination_name";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getAllRoutesForManager = () => {
  return new Promise((resolve, reject) => {
    var sql =
      // "SELECT routeID,originID,origin_name,destinationID,destination_name from origin_view LEFT OUTER JOIN destination_view using(routeID) order by origin_name,destination_name where status=1";
      " SELECT routeID,originID,origin_name,destinationID,destination_name from (SELECT route.RouteID AS routeID,route.OriginID AS originID,airport.airport_id AS airport_ID,airport.name AS origin_name FROM route LEFT JOIN airport ON (route.OriginID = airport.airport_id) where route.status=1) as origin LEFT OUTER JOIN ( SELECT route.RouteID AS routeID,route.DestinationID AS destinationID,airport.airport_id AS airport_ID,airport.name AS destination_name FROM route LEFT JOIN airport ON (route.DestinationID = airport.airport_id) where route.status=1) as destination using(routeID) order by routeID"
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err); 
      } else {
        return resolve(result);
      }
    });
  });
};

const getRoutePrices = (routeID) => {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT * FROM ROUTE NATURAL JOIN CLASSPRICE,CLASS WHERE CLASSPRICE.CLASSID=CLASS.CLASSID AND ROUTEID=?";
    db.query(sql, routeID, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const addRoute = (routeInfo) => {
  return new Promise((resolve, reject) => {
    var sql =
      "INSERT INTO `route` (OriginID,DestinationID,status) VALUES (?,?,1);";
    if(!routeInfo?.OriginID || !routeInfo?.DestinationID) return reject(new Error("BadRequest"));
    
    db.query(sql,[routeInfo.OriginID,routeInfo.DestinationID] ,(err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const deleteRoute = (id) => {
  return new Promise((resolve, reject) => {
    var sql =
    "UPDATE `route` SET status=0 WHERE RouteID=?;"
    db.query(sql,[id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};


module.exports = {
  getAllRoutes,
  getRoutePrices,
  addRoute,
  deleteRoute,
  getAllRoutesForManager
};
