
const { json } = require('express');
const db = require('../db/db');

const registerUser = (userInfo) => {
    return new Promise((resolve, reject) => {
        let firstname = userInfo.FirstName;
        let lastname = userInfo.LastName;
        let email = userInfo.Email;
        let address = userInfo.Address;
        let mobile = userInfo.mobile;
        let birthday = userInfo.birthday;
        let password = userInfo.password;
        let gender;
        (userInfo.gender === "male") ? gender = 1 : gender = 0;

        let sql = "INSERT INTO registeredcustomer (firstname, lastname, email, address, password, gender,birthday) VALUES (?,?,?,?,?,?,?)";

        db.query(sql, [firstname, lastname, email, address, password, gender, birthday], (err, data) => {
            if (err) {
                return reject(err);
            } else {
                let sqlAddmobile = "INSERT INTO userphone (registeredUserID,phoneNumber) VALUES((SELECT userID FROM registeredcustomer WHERE email=?),?)";
                db.query(sqlAddmobile, [email, mobile], (err, data) => {
                    if (err) {
                        return reject(err);
                    } else {
                        resolve(true);
                        //look at here again
                    }
                });
            }
        });
    });
}

module.exports = {
    registerUser
}