const db = require("../db/db");

const getAllAirPorts = () => {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM airport WHERE status=1 order by name;";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const addAirport = (airportInfo) => {
  return new Promise((resolve, reject) => {
    var sql =
      "INSERT INTO `airport` (name,status) VALUES (?,1);";
    if(!airportInfo?.name) return reject(new Error("BadRequest"));
    
    db.query(sql,[airportInfo.name] ,(err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const deleteAirport = (id) => {
  return new Promise((resolve, reject) => {
    var sql =
    "UPDATE `airport` SET status=0 WHERE airport_id=?;"
    db.query(sql,[id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const updateAirport = (airportInfo) => {
  return new Promise((resolve, reject) => {
    var sql =
      "UPDATE `airport` SET name=?  WHERE airport_id=? AND status=1;";
    if(!airportInfo?.name || !airportInfo?.id) return reject(new Error("BadRequest"));
    
    db.query(sql,[airportInfo.name, airportInfo.id] ,(err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = {
  getAllAirPorts, addAirport, deleteAirport, updateAirport
};
