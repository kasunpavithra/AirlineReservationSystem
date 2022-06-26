const { json } = require('express');
const db = require('../db/db');
//const bookinglist = [{id:1,name:'vinul'},{id:2, name:'Sachin'}];
// function getBooking(id,result){
//     // const booking = bookinglist.find(c=> c.id==id);
//     // result(null,booking);
//     let sql = "select * from booking where bookingID =?";
//     db.query(sql,id, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         } else {
//             result(null, res);
//         }
//     })
// }

const getRegisteredBooking =(id) =>{
    return new Promise((resolve,reject)=>{
        let sql = "select * from booking where registeredUserID =?";
    db.query(sql,id, (err, result) => {
        if (err) {
            return reject(err);
        } else {
            return resolve(result);
        }
    })
    })
}

const getGuestBooking =(id) =>{
    return new Promise((resolve,reject)=>{
        let sql = "select * from booking where guestUserID =?";
    db.query(sql,id, (err, result) => {
        if (err) {
            return reject(err);
        } else {
            return resolve(result);
        }
    })
    })
}

module.exports= {getRegisteredBooking,getGuestBooking};