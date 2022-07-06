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

module.exports = {
    getAllDiscounts,
}