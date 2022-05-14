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

module.exports = {
  getAllRoutes,
};