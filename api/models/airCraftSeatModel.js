const db = require("../db/db");

const addAirCraftSeat = (data) => {
    return new Promise((resolve, reject) => {
      var sql = "INSERT INTO aircraftseat (airCraftseatID , airCrafftID , classID , xCord, yCord, seatNumber, status) VALUES (DEFAULT, ?,?,?,?,?, 1);"
      const valueSet = [data.airCrafftID, data.classID, data.xCord, data.yCord, data.seatNumber]
      db.query(sql, valueSet, (err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result);
        }
      })
    })
  };
  
  const deleteAirCraftSeat = (deleteId) => {
    return new Promise((resolve, reject) => {
      var sql = "UPDATE aircraftseat SET status=0 WHERE airCraftseatID=?;"
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
  
  const updateAirCraftSeat = (updateId, aircraftSeatData) => {
    return new Promise((resolve, reject) => {
      var sql = "UPDATE aircraftseat SET airCrafftID=? , classID=? , xCord=?, yCord=?, seatNumber=?, status=? WHERE airCraftseatID=?;"
      const valueSet = [aircraftSeatData.airCrafftID, aircraftSeatData.classID, aircraftSeatData.xCord, aircraftSeatData.yCord, aircraftSeatData.seatNumber, aircraftSeatData.status, updateId]
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
    addAirCraftSeat,
    deleteAirCraftSeat,
    updateAirCraftSeat
}