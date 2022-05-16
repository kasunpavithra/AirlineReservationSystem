const db = require("../db/db");
const getAllAirPorts = () => {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM airport order by name;";
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
  getAllAirPorts,
};
