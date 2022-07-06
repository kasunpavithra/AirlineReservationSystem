const db = require("../db/db");

const getAllDiscounts = () => {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM discount;"
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result);
      }
    })
  })
};

const addDiscount = (discountData) => {
  return new Promise((resolve, reject) => {
    var sql = "INSERT INTO discount (discountID, discountClassType, amount, status, startTimeDate, endTimeDate) VALUES (DEFAULT, ?,?,1,?,?);"
    const valueSet = [discountData.discountClassType, discountData.amount, discountData.startTimeDate, discountData.endTimeDate]

    if (discountData.discountClassType !== "FREQUENT" || discountData.discountClassType !== "FREQUENT") {
      return reject("bad_request")
    }

    if (parseFloat(discountData.amount) >= 1) {
      return reject("bad_request")
    }

    if ((new Date(discountData.startTimeDate)) > (new Date(discountData.endTimeDate))) { 
      return reject("bad_request")
    }
    
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
  getAllDiscounts,
  addDiscount
}