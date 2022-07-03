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
    let sql = "select * from booking where registeredUserID =?";
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
    let sql = "select * from booking where guestUserID =?";
    db.query(sql, id, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const addBooking = (req) => {
  const userID = req.body.userID;
  const flightID = req.body.flightID;
  const bookingTimeDate = req.body.bookingTimeDate;
  const classID = req.body.classID;
  const airCraftseatID = req.body.airCraftseatID;
  const discountID = req.body.discountID;
  if (
    !userID ||
    !flightID ||
    !bookingTimeDate ||
    !classID ||
    !airCraftseatID ||
    !discountID
  )
    return res.sendStatus(400);
  return new Promise((resolve, reject) => {
    let sql =
      "insert into booking(userID,flightID,bookingTimeDate,classID,airCraftseatID,discountID) values (?,?,?,?,?,?)";
    db.query(
      sql,
      [userID, flightID, bookingTimeDate, classID, airCraftseatID, discountID],
      (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      }
    );
  });
};

const cancelBooking = (req) => {
  const bookingID = req.body.bookingID;

  if (!bookingID) return res.sendStatus(400);
  return new Promise((resolve, reject) => {
    let sql = "update booking set status=1 where bookingID=?";
    db.query(sql, bookingID, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = {
  getRegisteredBooking,
  getGuestBooking,
  addBooking,
  cancelBooking,
};
