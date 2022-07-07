const { json } = require("express");
const db = require("../db/db");

const addFlights = (grpOfFlights) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) {
        return reject(err);
      }
      let sql1 =
        "INSERT INTO STATICFLIGHT(AIRCRAFTID,ROUTEID,DISPATCHTIME,STATUS) VALUES(?,?,?,?)";
      db.query("DELETE FROM STATICFLIGHT", (err, res) => {
        if (err) {
          return reject("serverError");
        } else {
          console.log("Deleted!!");

          addFlightToDB();
        }
      });
      const AddRecord = (flight) =>
        new Promise((resolve, reject) => {
          if (
            !flight["aircraftID"] ||
            !flight["RouteID"] ||
            !flight["dispatchTime"] ||
            !flight["status"]
          ) {
            return reject("BadRequest");
          }
          db.query(
            sql1,
            [
              flight["aircraftID"],
              flight["RouteID"],
              flight["dispatchTime"],
              flight["status"],
            ],
            (err, result) => {
              if (err) {
                return reject("BadRequest");
              } else {
                console.log(flight);
                return resolve(true);
              }
            }
          );
        })
          .then((res) => {
            console.log("Inside Res");
            return true;
          })
          .catch((err) => {
            db.rollback();
            console.log(JSON.stringify(flight), "Rolled back");
            if (err === "BadRequest") {
              return err;
            } else {
              return "serverError";
            }
          });

      const addFlightToDB = async () => {
        for (let flg of grpOfFlights) {
          var isAdded = await AddRecord(flg);

          console.log("Here ", isAdded);
          switch (isAdded) {
            case "serverError":
              return reject("serverError");

            case "BadRequest":
              return reject("BadRequest");

            default:
              continue;
          }
        }
        if (isAdded) {
          db.commit((err) => {
            if (err) {
              console.log("Error while commiting");
              return reject(false);
            } else {
              console.log("Commited Successfully");
              return resolve(true);
            }
          });
        }
      };
    });
  });
};

const updateFlights = (grpOfFlights) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) {
        return reject(err);
      }
      let sql1 =
        "UPDATE STATICFLIGHT SET DISPATCHTIME=?,AIRCRAFTID=? WHERE STATICFLIGHTID=?";

      const AddRecord = (flight) =>
        new Promise((resolve, reject) => {
          if (
            !flight["aircraftID"] ||
            !flight["RouteID"] ||
            !flight["dispatchTime"] ||
            !flight["status"]
          ) {
            return reject("BadRequest");
          }
          db.query(
            sql1,
            [
              flight["dispatchTime"],
              flight["aircraftID"],
              flight["staticflightid"],
            ],
            (err, result) => {
              if (err) {
                console.log(err);
                return reject("BadRequest");
              } else {
                console.log(flight);
                return resolve(true);
              }
            }
          );
        })
          .then((res) => {
            console.log("Inside Res");
            return true;
          })
          .catch((err) => {
            db.rollback();
            console.log(JSON.stringify(flight), "Rolled back");
            if (err === "BadRequest") {
              return err;
            } else {
              return "serverError";
            }
          });

      const addFlightToDB = async () => {
        for (let flg of grpOfFlights) {
          var isAdded = await AddRecord(flg);

          console.log("Here ", isAdded);
          switch (isAdded) {
            case "serverError":
              return reject("serverError");

            case "BadRequest":
              return reject("BadRequest");

            default:
              continue;
          }
        }
        if (isAdded) {
          db.commit((err) => {
            if (err) {
              console.log("Error while commiting");
              return reject(false);
            } else {
              console.log("Commited Successfully");
              return resolve(true);
            }
          });
        }
        if (grpOfFlights.length === 0) {
          return reject("emptyRequest");
        }
      };
      addFlightToDB();
    });
  });
};

const getRouteData = (data) => {
  return new Promise((resolve, reject) => {
    const sql = "select * from staticflight where routeID=? LIMIT 1";
    db.query(sql, data, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getRoutesData = (data) => {
  return new Promise((resolve, reject) => {
    const sql =
      "select aircraftid,staticflightid,routeid,name,dispatchtime,originid,destinationid from staticflight inner join aircraft using(aircraftid) inner join aircrafttype using(aircrafttypeid) inner join route using(routeID) where route.status=1 and aircraft.status=1 and aircrafttype.status=1 order by routeid";
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
  addFlights,
  getRouteData,
  getRoutesData,
  updateFlights,
};
