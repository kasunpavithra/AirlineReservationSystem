const { json } = require('express');
const db = require('../db/db');

function getUsers(result) {
    let sql = "select * from student";
    db.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } else {
            // console.log("tutorials: ", res);
            result(null, res);
        }
    })
}

function loginUser(result, data) {
    console.log(data);
}

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

// function registerUser(userInfo) {
//     let userId = "g10";
//     let firstname = userInfo.FirstName;
//     let lastname = userInfo.LastName;
//     let email = userInfo.Email;
//     let address = userInfo.Address;
//     let mobile = userInfo.mobile;
//     let birthday = userInfo.birthday;
//     let password = userInfo.password;
//     let gender = userInfo.gender;

//     let sql = "INSERT INTO registeredcustomer (userID, firstname, lastname, email, address, password, gender,birthday) VALUES (?,?,?,?,?,?,?,?)";

//     db.query(sql, [userId, firstname, lastname, email, address, password, gender, birthday], (err, data) => {
//         if (err) {
//             console.log(`Error: ${err}`);
//         } else {
//             let sqlAddmobile = "INSERT INTO userphone (registeredUserID,phoneNumber) VALUES((SELECT userID FROM registeredcustomer WHERE userID=?),?)";
//             db.query(sqlAddmobile, [userId, mobile], (err, data) => {
//                 if (err) {
//                     console.log(`Error while adding phone number: ${err}`);
//                 } else {
//                     console.log("check the database");
//                 }
//             })
//         }
//     });
// }
module.exports = {
    getUsers,
    loginUser,
    registerUser
};