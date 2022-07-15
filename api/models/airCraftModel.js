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
const getAllAirCrafts = ()=>{
  // console.log('dfdgfgg')
  return new Promise((resolve, reject) => {
    var sql =
      "select name,aircraftid from aircraft inner join aircrafttype using(aircrafttypeid)";
    
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}



const getAllAirCraftsByManager = ()=>{
  console.log('dfd')
  return new Promise((resolve, reject) => {
    var sql =
      "select name,aircraftid,EconomySeatCount,BusinessSeatCount,PlatinumSeatCount from aircraft inner join aircrafttype using(aircrafttypeid) where aircraft.status!=0";

    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
}

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

const addAirCraft = (data) => {
  return new Promise((resolve, reject) => {
    var sql =
      "INSERT INTO aircraft (aircraftTypeID , EconomySeatCount, BusinessSeatCount, PlatinumSeatCount, status) VALUES (?,?,?,?, 1);";
    const valueSet = [
      data.AircraftTypeID,
      data.EconomySeatCount,
      data.BusinessSeatCount,
      data.PlatinumSeatCount,
    ];
    db.beginTransaction((err) => {
      if (err) return reject(err);

      db.query(sql, valueSet,async (err1, result) => {
        if (err1) {
          return reject(err1);
        }
        for (let i = 0; i < data.seatInfo.length; i++) {
          try {
            var success = await new Promise((resolve1, reject1) => {
              db.query('INSERT INTO aircraftseat (airCraftID,classID, xCord,yCord,seatNumber,status) VALUES (?,?,?,?,?,1)', [result.insertId, data.seatInfo[i].classID, data.seatInfo[i].xCord, data.seatInfo[i].yCord, data.seatInfo[i].seatNumber], function (err3, result3) {
                if (err3) {
                  console.log(err3);
                  db.rollback();
                  return reject1(false);
                }
                resolve1(true);
              });
            });
            if (success) continue;
          }
          catch (err) {
            success = false;
            break;
          }
        }
        if (success) {
          db.commit(function (err4) {
            if (err4) {
              db.rollback(function () {
                return reject(err4);
              });
            }
            return resolve();
          });
        } else {
          reject(new Error("ErrorWhileAddingSeats"));
        }

      });

    });
  });
};

const deleteAirCraft = (deleteId) => {
  return new Promise((resolve, reject) => {
    var sql = "UPDATE aircraft SET status=0 WHERE aircraftID=?;";
    const valueSet = [deleteId];
    db.query(sql, valueSet, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const updateAirCraft = (updateId, aircraftData) => {
  console.log(updateId)
  console.log(aircraftData)
  return new Promise((resolve, reject) => {
    var sql =
      "UPDATE aircraft SET aircraftTypeID=?, EconomySeatCount=?, BusinessSeatCount=?, PlatinumSeatCount=? WHERE aircraftID=?;";
    const valueSet = [
      aircraftData.AircraftTypeID,
      aircraftData.EconomySeatCount,
      aircraftData.BusinessSeatCount,
      aircraftData.PlatinumSeatCount,
      updateId,
    ];
    db.query(sql, valueSet, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getAirCraft = (data) => {
  console.log(data)
  return new Promise((resolve, reject) => {
    var sql =
      "Select * from aircraft join aircrafttype using(aircraftTypeID) WHERE aircraftID=?;"
    db.query(sql, data, (err, result) => {
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
  addAirCraft,
  deleteAirCraft,
  updateAirCraft,
  getAllAirCrafts,
  getAirCraft,
  getAllAirCraftsByManager
};
