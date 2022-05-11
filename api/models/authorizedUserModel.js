const db = require("../db/db")

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

module.exports = {
    get_all_authorized_users,
    delete_authorized_users_by_id
}