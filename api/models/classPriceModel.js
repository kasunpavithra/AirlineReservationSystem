const db = require("../db/db");

const addClassPrice = (classPriceInfo) => {
  return new Promise((resolve, reject) => {
    var sql =
      "INSERT INTO `level` (levelName,levelrank,status) VALUES (?,?,1);";
    if (!classPriceInfo?.RouteID || !classPriceInfo?.classID || !classPriceInfo.Price) return reject(new Error("BadRequest"));

    db.query("SELECT * FROM `classprice` WHERE RouteID=? AND classID=? AND status=1;", [classPriceInfo.RouteID, classPriceInfo.classID], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        db.query("INSERT INTO `classprice` (RouteID,classID,Price,status) VALUES (?,?,?,1);", [classPriceInfo.RouteID, classPriceInfo.classID, classPriceInfo.Price], (err1, result1) => {
          if (err1) return reject(err1);
          else return resolve(result1);
        });
      } else if (result.length > 0) {
        db.beginTransaction((err2) => {
          if (err2) return reject(err2);

          db.query("UPDATE `classprice` SET status=0 WHERE RouteID=? AND classID=? AND status=1", [classPriceInfo.RouteID, classPriceInfo.classID], (err3, result3) => {
            if (err3) {
              db.rollback();
              return reject(err3);
            }
            db.query("INSERT INTO `classprice` (RouteID,classID,Price,status) VALUES (?,?,?,1);", [classPriceInfo.RouteID, classPriceInfo.classID, classPriceInfo.Price], (err4, result4) => {
              if (err4) return reject(err4);

              db.commit(function (err5) {
                if (err5) {
                  db.rollback(function () {
                    return reject(err5);
                  });
                }
                return resolve();
              });
            });
          });
        });
      }
    });
  });
};

const getClassPriceBYIDs = (RouteID,classID) => {
  return new Promise((resolve, reject) => {
    var sql =
    "SELECT * FROM `classprice`WHERE RouteID=? AND classID=? AND status=1;"
    db.query(sql,[RouteID,classID], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = { addClassPrice,getClassPriceBYIDs }