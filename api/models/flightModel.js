const db = require("../db/db");
const getAllFlights = () => {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT flightID,routeID,dispatchTime,flightTimeID FROM `flight` right OUTER JOIN `flighttime` using(`flightID`);";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};
const cancelFlight = (flightID) => {
  return new Promise((resolve, reject) => {
    var sql = "update flight set status=0 where flightID=?";
    db.query(sql, [flightID], (err, result) => {
      if (err) {

        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};
const getAllDestinations = () => {
  return new Promise((resolve, reject) => {
    var sql = "SELECT name,airport_id FROM `airport`;";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getAllPassengerTypes = () => {
  return new Promise((resolve, reject) => {
    var sql = "SELECT classID,name FROM `class`;";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getAllAirCraftTypes = () => {
  return new Promise((resolve, reject) => {
    var sql = "SELECT aircraftTypeID,name FROM `aircrafttype`;";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getFlightsbyDate = (params) => {
  console.log(params);
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT flightID,routeID,dispatchTime,flightTimeID,endTimeDate,aircraftID,flight.status FROM `flight` right OUTER JOIN `flighttime` using(`flightID`) where dispatchTime like '%" +
      params.year +
      "-" +
      (params.month.length === 1 ? "0" + params.month : params.month) +
      "-" +
      (params.date.length === 1 ? "0" + params.date : params.date) +
      "%';";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        console.log(result);
        console.log(sql);
        return resolve(result);
      }
    });
  });
};
const getFlightsOnwards = (params) => {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT * FROM `flight` NATURAL JOIN `flighttime`,`route` where route.routeID=flight.routeID AND flighttime.dispatchTime >= '" +
      params.year +
      "-" +
      (params.month.length === 1 ? "0" + params.month : params.month) +
      "-" +
      (params.date.length === 1 ? "0" + params.date : params.date) +
      "' and route.originID=" +
      params.originID +
      " and route.destinationID=" +
      params.destinationID +
      ";";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getFlightsById = (params) => {
  console.log(params);
  return new Promise((resolve, reject) => {
    var sql = "SELECT flightID FROM `flight` order by flightID;";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        console.log(result);
        return resolve(result);
      }
    });
  });
};

const getPassengersByDateDestination = (params) => {
  console.log("params", params);
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT count(*) as passengers FROM `booking` where status=1 and flightID in ( select flightID from flighttime where endTimeDate is null and dispatchTime between ? and ?) and flightID in  (SELECT flightID FROM `flight` join `route` using(RouteID)  where DestinationID=?)";
    // "SELECT count(*) as passengers FROM `booking` where status=1 and flightID in (  select flightID from (Select flightID from flighttime group by flightID having max(dispatchTime)  between ? and ?) as dispatchdate  where flightID in  (SELECT flightID FROM `flight` join `route` using(RouteID)  where DestinationID=?));"
    const valueSet = [params.StartDate, params.EndDate, params.Destination];
    console.log(valueSet);
    db.query(sql, valueSet, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        console.log(result);
        return resolve(result);
      }
    });
  });
};

const getAllBookings = (params) => {
  console.log("haa");
  console.log(params);
  return new Promise((resolve, reject) => {
    var sql =
      "select (SELECT count(*) FROM `booking` where classID=? and under18=? and registeredUserID is not null and flightID in ( select flightID from flighttime where endTimeDate is null and dispatchTime between ? and ?))as Registercount,(SELECT count(*) FROM `booking` where classID=? and under18=? and registeredUserID is null and flightID in ( select flightID from flighttime where endTimeDate is null and dispatchTime between ? and ?))as Guestcount,(SELECT count(*) FROM `booking` where classID=? and under18=?  and flightID in ( select flightID from flighttime where endTimeDate is null and dispatchTime between ? and ?))as Total";
    // "SELECT count(*) as passengers FROM `booking` where classID=? and under18=? and flightID in (  select flightID from (Select flightID from flighttime group by flightID having max(dispatchTime)  between ? and ?) as dispatchdate;"

    // "SELECT count(*) as passengers  FROM `booking` where classID=? and under18=? and flightID in ( select flightID from flighttime where endTimeDate is null and dispatchTime between ? and ?)"

    const valueSet = [
      params.ClassId,
      params.AgeType,
      params.StartDate,
      params.EndDate,
      params.ClassId,
      params.AgeType,
      params.StartDate,
      params.EndDate,
      params.ClassId,
      params.AgeType,
      params.StartDate,
      params.EndDate,
    ];
    console.log(valueSet);
    db.query(sql, valueSet, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        console.log(result);
        return resolve(result);
      }
    });
  });
};

const getPassengersByFlightId = (params) => {
  console.log(params);
  return new Promise((resolve, reject) => {
    var sql =
      "select (SELECT count(*)  FROM `booking` where flightID=? and under18=? and registeredUserID is not null and status=1 and paymentStatus=1) as Registercount, (SELECT count(*)  FROM `booking` where flightID=? and under18=? and registeredUserID is null and status=1 and paymentStatus=1) as Guestcount,(SELECT count(*)  FROM `booking` where flightID=? and under18=?  and status=1 and paymentStatus=1) as Total";
    // "SELECT * FROM `booking` where flightID=? and under18=? and registeredUserID is null and status=1 and paymentStatus=1 union ";
    const valueSet = [
      params.FlightNo,
      params.AgeType,
      params.FlightNo,
      params.AgeType,
      params.FlightNo,
      params.AgeType,
    ];
    db.query(sql, valueSet, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        console.log(result);
        return resolve(result);
      }
    });
  });
};

const getRevenue = (params) => {
  console.log(params);
  return new Promise((resolve, reject) => {
    var sql =
      "select sum(price*(1-amount)) as total from flight inner join airCraft using(airCraftID) inner join booking using(flightID) inner join classPrice cp using(classID,routeID) left outer join discount using(discountID) where ((bookingtimedate between cp.startTimeDate and cp.endTimeDate) or (bookingtimedate>cp.startTimeDate and cp.endTimedate is null)) and booking.status=1 and (aircrafttypeID=?)";
    // "select sum(eachprice) as total from (select flightID,sum(price) as eachprice from booking b join classprice c using (classId) where b.status=1  group by flightID) as sumprice where flightID in (select flightID from aircrafttype join aircraft using(aircraftTypeID) join flight  using (aircraftID) where aircraftTypeID=?)"
    // "SELECT count(*) as passengers FROM `booking` where flightID=? and under18=? and status=1;";

    // select * from aircrafttype join aircraft using(aircraftTypeID) join flight  using (aircraftID) where aircraftTypeID=1
    const valueSet = [params.AirCraftId];
    db.query(sql, valueSet, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        console.log(result);
        return resolve(result);
      }
    });
  });
};

const getPastFlights = (params) => {
  console.log(params);
  return new Promise((resolve, reject) => {
    var sql =
      "select flightID as Flightid, count(registeredUserID) as Registeredcount,count(guestUserID) as Guestcount,count(*)as Total from booking where flightID in(select flightID from flight where RouteID=(Select RouteID from route where OriginID=? and DestinationID=?)) group by flightID";

    // "select *  from booking where flightID in(select flightID from flight where RouteID=(Select RouteID from route where OriginID=? and DestinationID=?))"

    const valueSet = [params.OriginID, params.DestinationID];
    db.query(sql, valueSet, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        console.log(result);
        return resolve(result);
      }
    });
  });
};

const addFlights = (req) => {
  // {"flights": [
  //       {
  //         "aircraftID": 5,
  //         "RouteID": 5,
  //         "dispatchTime": null,
  //         "startTimeDate": null
  //       },{
  //         "aircraftID": 3,
  //         "RouteID": 77,
  //         "dispatchTime": null,
  //         "startTimeDate": null
  //       }
  //       ]}
  return new Promise((resolve, reject) => {
    const flights = req.body.flights;

    db.beginTransaction((err) => {
      if (err) {
        return Outerreject(err);
      }

      let sql1 = "INSERT INTO FLIGHT(aircraftID,ROUTEID,STATUS) VALUES(?,?,1)";
      let sql2 =
        "INSERT INTO FLIGHTTIME(FLIGHTID,DISPATCHTIME,STARTTIMEDATE,STATUS) VALUES(?,?,?,1)";
      let sql3 = "SELECT FLIGHTID FROM FLIGHT ORDER BY FLIGHTID DESC LIMIT 1";

      const AddFlight = (flight) =>
        new Promise((resolve, reject) => {
          db.query(sql1, [flight.aircraftID, flight.RouteID], (err, result) => {
            if (err) {
              console.log("Rejected ", flight);
              reject("badRequest");
            } else {
              const fid = result.insertId;
              db.query(
                sql2,
                [fid, flight.dispatchTime, flight.startTimeDate],
                (err, result) => {
                  if (err) {
                    db.rollback();
                    console.log("Rejected ", flight);
                    reject("badRequest");
                  } else {
                    console.log("Added a record ", flight);
                    resolve("added record");
                  }
                }
              );
            }
          });
        })
          .then((res) => {
            return true;
          })
          .catch((err) => {
            return false;
          });

      async function addFlightFunc(flights) {
        for (let i = 0; i < flights.length; i++) {
          const flight = flights[i];
          var isAdded = await AddFlight(flight);
          if (!isAdded) {
            return reject(false);
          }
        }
        if (isAdded) {
          db.commit((err) => {
            if (err) {
              return reject(false);
            } else {
              console.log("Commited");
              return resolve(true);
            }
          });
        }
      }
      addFlightFunc(flights);
    });
  });
};

const updateFlight = (data) => {
  const flightID = data.flightID;
  const dispatchTime = data.dispatchTime;
  const aircraftID = data.aircraftID;
  const flightTimeID = data.flightTimeID;
  const flightDate = data.flightDate;
  let dateObj = new Date(flightDate);
  const isChangedDate = data.isChangedDate;

  const isChangedFlight = data.isChangedFlight;
  const isChangedTime = data.isChangedTime;
  dateObj.setHours(
    dispatchTime.toString().split(":")[0],
    dispatchTime.toString().split(":")[1]
  );
  console.log(dateObj.toLocaleString());

  return new Promise((resolve, reject) => {
    let sql1 = "UPDATE FLIGHTTIME SET ENDTIMEDATE=now() WHERE FLIGHTTIMEID=?";
    let sql2 =
      "INSERT INTO FLIGHTTIME(FLIGHTID,DISPATCHTIME,STARTTIMEDATE,STATUS) VALUES (?,?,NOW(),1)";
    let sql3 = "UPDATE FLIGHT SET AIRCRAFTID=? WHERE FLIGHTID=?";
    db.beginTransaction((err) => {
      if (err) {
        return reject("serverError");
      } else {
        db.query(sql3, [aircraftID, flightID], (err, res) => {
          if (err) {
            db.rollback();
            return reject("BadRequest");
          } else if (isChangedTime === true || isChangedDate === true) {
            db.query(sql1, [flightTimeID], (err, res) => {
              if (err) {
                db.rollback();
                return reject("BadRequest");
              } else {
                console.log(sql1);
                db.query(sql2, [flightID, dateObj], (err, res) => {
                  if (err) {
                    db.rollback();
                    return reject("BadRequest");
                  } else {
                    db.commit();
                    console.log("success");
                    return resolve("success");
                  }
                });
              }
            });
          } else {
            db.commit();
            return resolve("Success");
          }
        });
      }
    });
  });
};
module.exports = {
  addFlights,
  getAllFlights,
  getFlightsbyDate,
  getFlightsOnwards,
  getFlightsById,
  getPassengersByFlightId,
  getAllDestinations,
  getPassengersByDateDestination,
  getAllPassengerTypes,
  getAllBookings,
  getAllAirCraftTypes,
  getRevenue,
  updateFlight,
  getPastFlights,
  cancelFlight
};
