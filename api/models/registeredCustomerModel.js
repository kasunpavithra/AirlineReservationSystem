const db = require("../db/db")
const bcrypt = require("bcrypt")

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

const update_customer = (userData) => {
    return new Promise((resolve, reject) => {
        var sql = "UPDATE registeredcustomer SET userID=?, firstname=?, lastname=?, email=?, password=?, address=?, status=?, image=?, gender=?, birthday=? WHERE userID=?;"
        const hash = bcrypt.hashSync(userData.password, 9)
        const valueSet = [userData.userID, userData.firstname, userData.lastname, userData.email, hash, userData.address, userData.status, userData.image, userData.gender, userData.birthday, userData.userID]
        db.query(sql, valueSet ,(err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

const get_customer_by_id = (userID) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM registeredcustomer WHERE userID=?;"
        db.query(sql, userID, (err, result) => {
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
    delete_customers_by_id,
    update_customer,
    get_customer_by_id
}