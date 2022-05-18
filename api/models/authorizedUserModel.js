const db = require("../db/db")
const bcrypt = require("bcrypt")

//type: 0 for admin , 1 for manager

const get_all_authorized_users = () => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM authorizeduser ORDER BY userID;"
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

const get_authorized_user = (userID) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM authorizeduser WHERE userID=?;"
        db.query(sql, userID, (err, result) => {
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
        var sql = "UPDATE authorizeduser SET status=0 WHERE userID=?;"
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

const register_authorized_users = (userData) => {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO authorizeduser (firstname, lastname, email, password, address, status, type, image) VALUES (?,?,?,?,?,?,?,?);"
        const hash = bcrypt.hashSync(userData.password, 9)
        const valueSet = [userData.firstname, userData.lastname, userData.email, hash, userData.address, userData.status, userData.type, userData.image]
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
    update_authorized_user,
    register_authorized_users,
    get_authorized_user
}