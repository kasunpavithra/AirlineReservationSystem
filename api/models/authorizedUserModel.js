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

module.exports = {
    get_all_authorized_users
}