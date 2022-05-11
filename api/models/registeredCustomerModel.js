const db = require("../db/db")

const get_all_customers = () => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM registeredcustomer;"
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

const delete_customers_by_id = (userID) => {
    return new Promise((resolve, reject) => {
        var sql = "DELETE FROM registeredcustomer WHERE userID=?;"
        db.query(sql, userID ,(err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

module.exports = {
    get_all_customers,
    delete_customers_by_id
}