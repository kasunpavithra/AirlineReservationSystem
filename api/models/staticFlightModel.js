const { json } = require("express");
const db = require("../db/db");

const addFlights = (grpOfFlights) => {
  console.log(grpOfFlights);
  var isSuccess = true;
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) {
        return Outerreject(err);
      }
      let sql1 =
        "INSERT INTO STATICFLIGHT(AIRCRAFTID,ROUTEID,DISPATCHTIME,STATUS) VALUES(?,?,?,?)";
      for (let index = 0; index < grpOfFlights.length; index++) {
        const element = grpOfFlights[index];
        console.log(element);
        async function addFlightFunc(flight) {
          await new Promise((InResolve, InReject) => {
            db.query(sql1, flight, (err, result) => {
              if (err) {
                return InReject(false);
              } else if (index === grpOfFlights.length - 1) {
                db.commit((err) => {
                  if (err) {
                    return InReject(false);
                  } else {
                    return resolve("Flights Added Successfully");
                  }
                });
              } else {
                return InResolve(" a static Flight added successfully");
              }
              console.log(result);
            });
          })

            .then((result) => {
              console.log("Added");
            })
            .catch((err) => {
              db.rollback();
              console.log("Rolled Back");
              isSuccess = false;
              return reject(true);
            });
        }
        addFlightFunc(element);
        if (!isSuccess) {
          break;
        }
      }
    });
    if (!isSuccess) {
      reject(false);
    }
  });
};
module.exports = {
  addFlights,
};
