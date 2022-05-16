const db = require("../db/db")
const bcrypt = require("bcrypt")

const get_all_authorized_users = () => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM authorizeduser;"
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

const delete_authorized_users_by_id = (userID) => {
    return new Promise((resolve, reject) => {
        var sql = "DELETE FROM authorizeduser WHERE userID=?;"
        db.query(sql, userID, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

const update_authorized_user = (userData) => {
    return new Promise((resolve, reject) => {
        var sql = "UPDATE authorizeduser SET userID=?, firstname=?, lastname=?, email=?, password=?, address=?, status=?, type=?, image=? WHERE userID=?;"
        const hash = bcrypt.hashSync(userData.password, 9)
        const valueSet = [userData.userID, userData.firstname, userData.lastname, userData.email, hash, userData.address, userData.status, userData.type, userData.image, userData.userID]
        db.query(sql, valueSet ,(err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

module.exports = {
    get_all_authorized_users,
    delete_authorized_users_by_id,
    update_authorized_user
}