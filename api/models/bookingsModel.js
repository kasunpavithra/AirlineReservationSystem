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
    let sql = "select * from ((booking LEFT JOIN class ON booking.classID=class.classID) LEFT JOIN  discount ON booking.discountID = discount.discountID)  where booking.registeredUserID =? ORDER BY booking.bookingID DESC";
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
    let sql = "select * from ((booking LEFT JOIN class ON booking.classID=class.classID) LEFT JOIN  discount ON booking.discountID = discount.discountID)  where booking.guestUserID =? ORDER BY booking.bookingID DESC";
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
                        db.query("INSERT INTO `booking` (registeredUserID,guestUserID,flightID,classID,airCraftseatID,under18,status) VALUES (?,?,?,?,?,?,1);",
                            [bookingInfo.registeredUserID, bookingInfo.guestUserID, bookingInfo.flightID, bookingInfo.classID, bookingInfo.airCraftseatIDList[i], isChild],
                            function (err3, result3) {
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
                reject(new Error("ErrorWhileBookingSeats"));
            }
        });
    });
};

module.exports = { getRegisteredBooking, getGuestBooking, getBookedseatsByFlight, addBooking,cancelBooking };

