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
  
  const deleteAirCraftType = (deleteId) => {
    return new Promise((resolve, reject) => {
      var sql = "UPDATE aircrafttype SET status=0 WHERE aircraftTypeID=?;"
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
  
  const updateAirCraftType = (updateId, aircraftTypeData) => {
    return new Promise((resolve, reject) => {
      var sql = "UPDATE aircrafttype SET name=?, description=?, image=?, status=? WHERE aircraftTypeID=?;"
      const valueSet = [aircraftTypeData.name, aircraftTypeData.description, aircraftTypeData.image, aircraftTypeData.status, updateId]
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
    addAirCraftType,
    deleteAirCraftType,
    updateAirCraftType
}