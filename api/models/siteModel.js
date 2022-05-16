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




module.exports = {
    getUsers,
    loginUser
};