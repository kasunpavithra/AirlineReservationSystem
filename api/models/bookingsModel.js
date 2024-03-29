const { json } = require("express");
const db = require("../db/db");
//const bookinglist = [{id:1,name:'vinul'},{id:2, name:'Sachin'}];
// function getBooking(id,result){
//     // const booking = bookinglist.find(c=> c.id==id);
//     // result(null,booking);
//     let sql = "select * from booking where bookingID =?";
//     db.query(sql,id, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         } else {
//             result(null, res);
//         }
//     })
// }

const getRegisteredBooking = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT *
    FROM
    (select  booking.registeredUserID,bookingID,booking.flightID,paymentStatus,bookingTimeDate,class.name,booking.airCraftseatID,discount.amount,booking.status,airport.name as originName from 
        (((((booking JOIN class ON booking.classID=class.classID) LEFT JOIN  discount ON booking.discountID = discount.discountID)JOIN flight on booking.flightID=flight.flightID) 
        JOIN route on flight.RouteID=route.RouteID)JOIN airport on route.OriginID=airport.airport_id ))as B
    JOIN
    (select flighttime.dispatchTime,flighttime.endTimeDate,booking.bookingID,airport.name as destName from booking JOIN flight on booking.flightID=flight.flightID JOIN route on flight.RouteID=route.RouteID 
        JOIN airport on route.DestinationID=airport.airport_id  JOIN flighttime on flighttime.flightID=flight.flightID )as A on A.bookingID=B.bookingID where B.registeredUserID=? and  A.endTimeDate is NULL ORDER BY A.bookingID DESC`;
    
    db.query(sql, id, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const getGuestBooking = (id) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT *
    FROM
    (select  booking.guestUserID,bookingID,booking.flightID,paymentStatus,bookingTimeDate,class.name,booking.airCraftseatID,discount.amount,booking.status,airport.name as originName from 
        (((((booking JOIN class ON booking.classID=class.classID) LEFT JOIN  discount ON booking.discountID = discount.discountID)JOIN flight on booking.flightID=flight.flightID) 
        JOIN route on flight.RouteID=route.RouteID)JOIN airport on route.OriginID=airport.airport_id ))as B
    JOIN
    (select flighttime.dispatchTime,flighttime.endTimeDate,booking.bookingID,airport.name as destName from booking JOIN flight on booking.flightID=flight.flightID JOIN route on flight.RouteID=route.RouteID 
        JOIN airport on route.DestinationID=airport.airport_id  JOIN flighttime on flighttime.flightID=flight.flightID )as A on A.bookingID=B.bookingID where B.guestUserID=? and  A.endTimeDate is NULL ORDER BY A.bookingID DESC`;
    db.query(sql, id, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};


const cancelBooking = (req) => {
  const bookingID = req.body.bookingID;
//   const bookingID = parseInt(req.params.id);
  if (!bookingID) return res.sendStatus(400);
  return new Promise((resolve, reject) => {
    let sql = "update booking set status=2 where bookingID=?";
    db.query(sql, bookingID, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};


  


const getBookedseatsByFlight = (flightID) => {
    return new Promise((resolve, reject) => {
        var sql =
            "SELECT airCraftseatID FROM `booking` where status=1 AND flightID=?;";
        db.query(sql, [flightID], (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
};

const addBooking = (bookingInfo) => {
    return new Promise((resolve, reject) => {
        if (!bookingInfo?.registeredUserID && !bookingInfo?.guestUserID) return reject(new Error("BadRequest"));
        if (bookingInfo.registeredUserID && bookingInfo.guestUserID) return reject(new Error("BadRequest"));
        console.log(bookingInfo);
        if (!bookingInfo?.flightID || !bookingInfo?.classID || !bookingInfo.airCraftseatIDList) return reject(new Error("BadRequest"));


        db.beginTransaction(async (err) => {
            if (err) return reject(err);

            var childCount = bookingInfo.under18;
            for (let i = 0; i < bookingInfo.airCraftseatIDList.length; i++) {
                var isChild = (childCount>0)? 1:0;
                childCount--;
                try {

                    var success = await new Promise((resolve1, reject1) => {
      
              
                      db.query("set @discountID_value = 0;",
                            [bookingInfo.registeredUserID],
                            function (err1, result1) {
                                if (err1) {
                                  console.log(err1);
                                    db.rollback();
                                    return reject1(false);
                                }
                        
                                db.query(" call get_dicountID_for_a_userID(?, @discountID_value)",
                                [bookingInfo.registeredUserID],
                                function (err2, result2) {
                                    if (err2) {
                                      console.log(err2);
                                        db.rollback();
                                        return reject1(false);
                                    }
                                 
                                    db.query("select @discountID_value"
                                    ,
                                    function (err3, result3) {
                                        if (err3) {
                                          console.log(err3);
                                            db.rollback();
                                            return reject1(false);
                                        }
                                        console.log(result3)
                                        console.log('dsdf',result3[0]['@discountID_value'])
                                        // resolve1(true);
                                        db.query("INSERT INTO `booking` (registeredUserID,guestUserID,flightID,classID,airCraftseatID,under18,discountID,status) VALUES (?,?,?,?,?,?,?,1);",
                                        [bookingInfo.registeredUserID, bookingInfo.guestUserID, bookingInfo.flightID, bookingInfo.classID, bookingInfo.airCraftseatIDList[i], isChild,result3[0]['@discountID_value']],
                                        function (err4, result4) {
                                            if (err4) {
                                              console.log(err4);
                                                db.rollback();
                                                return reject1(false);
                                            }
                                            console.log(result4)
                                            resolve1(true);
            
                                        });
        
                                    });

                                 
                                  
    
                                });
                                
                             

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
                db.commit(function (err5) {
                    if (err5) {
                        db.rollback(function () {
                            return reject(err5);
                        });
                    }
                    return resolve();
                });
            } else {
                reject(new Error("ErrorWhileBookingSeats"));
            }
        });
    });
};

module.exports = { getRegisteredBooking, getGuestBooking, getBookedseatsByFlight, addBooking,cancelBooking };

