const db = require("../db/db");

const getAllDiscounts = () => {
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM discount ORDER BY discountID DESC;"
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

    var err = {
      message: "",
      type: ""
    }
    if (discountData.discountClassType !== "FREQUENT" && discountData.discountClassType !== "GOLDEN") {
      console.log("1");
      err.message = "invalid discount type"
      err.type = "bad_request"
      return reject(err)
    }

    if (parseFloat(discountData.amount) >= 1) {
      console.log("2");
      err.message = "invalid discount amount (should be less than 1)"
      err.type = "bad_request"
      return reject(err)
    }

    if ((new Date(discountData.startTimeDate)) > (new Date(discountData.endTimeDate))) { 
      console.log("3");
      err.message = "invalid discount start or/and end dates"
      err.type = "bad_request"
      return reject(err)
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

const deleteDiscount = (deleteID) => {
  return new Promise((resolve, reject) => {
    var sql = "UPDATE discount SET status=0 WHERE discountID=?"
    db.query(sql, deleteID, (err, result) => {
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
  addDiscount,
  deleteDiscount
}