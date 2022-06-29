const db = require("../db/db");

const addUserPhone = (data) => {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO userPhone (userPhoneID , registeredUserID, guestUserID, authUserID, phoneNumber, status) VALUES (DEFAULT, ?,?,?,?, 1);"
        const valueSet = []
        data.registeredUserID ? valueSet.push(data.registeredUserID) : valueSet.push(null);
        data.guestUserID ? valueSet.push(data.guestUserID) : valueSet.push(null);
        data.authUserID ? valueSet.push(data.authUserID) : valueSet.push(null);

        valueSet.push(data.phoneNumber)

        db.query(sql, valueSet, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
};

const deleteUserPhone = (deleteId) => {
    return new Promise((resolve, reject) => {
        var sql = "UPDATE userPhone SET status=0 WHERE userPhoneID=?;"
        const valueSet = [deleteId]
        db.query(sql, valueSet, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
};

const updateUserPhone = (updateId, userPhoneData) => {
    return new Promise((resolve, reject) => {

        var ID;
        if (userPhoneData.registeredUserID) {
            sql = "UPDATE userPhone SET registeredUserID=?, phoneNumber=?, status=? WHERE userPhoneID=?;"
            ID = userPhoneData.registeredUserID
        }
        if (userPhoneData.guestUserID) {
            sql = "UPDATE userPhone SET guestUserID=?, phoneNumber=?, status=? WHERE userPhoneID=?;"
            ID = userPhoneData.guestUserID
        }
        if (userPhoneData.authUserID) {
            sql = "UPDATE userPhone SET authUserID=?, phoneNumber=?, status=? WHERE userPhoneID=?;"
            ID = userPhoneData.authUserID
        }

        const valueSet = [ID, userPhoneData.phoneNumber, userPhoneData.status, updateId]
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
    addUserPhone,
    deleteUserPhone,
    updateUserPhone
}