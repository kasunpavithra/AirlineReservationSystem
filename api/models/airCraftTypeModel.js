const db = require("../db/db");

const addAirCraftType = (data) => {
    return new Promise((resolve, reject) => {
      var sql = "INSERT INTO aircrafttype (aircraftTypeID, name, description, image, status) VALUES (DEFAULT, ?,?,?, 1);"
      const valueSet = [data.name, data.description, data.image]
      db.query(sql, valueSet, (err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result);
        }
      })
    })
  };
  
  const deleteAirCraft = (deleteId) => {
    return new Promise((resolve, reject) => {
      var sql = "UPDATE aircraft SET status=0 WHERE aircraftID=?;"
      const valueSet = [deleteId]
      db.query(sql, valueSet, (err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result);
        }
      })
    })
  };
  
  const updateAirCraft = (updateId, aircraftData) => {
    return new Promise((resolve, reject) => {
      var sql = "UPDATE aircraft SET aircraftTypeID=?, EconomySeatCount=?, BusinessSeatCount=?, PlanitnumSeatCount=? WHERE aircraftID=?;"
      const valueSet = [aircraftData.aircraftTypeID, aircraftData.EconomySeatCount, aircraftData.BusinessSeatCount, aircraftData.PlanitnumSeatCount, updateId]
      db.query(sql, valueSet, (err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result);
        }
      })
    })
  };

module.exports = {
    addAirCraftType
}