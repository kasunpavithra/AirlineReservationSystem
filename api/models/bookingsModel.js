const { json } = require('express');
const db = require('../db/db');
//const bookinglist = [{id:1,name:'vinul'},{id:2, name:'Sachin'}];
function getBooking(id,result){
    // const booking = bookinglist.find(c=> c.id==id);
    // result(null,booking);
    let sql = "select * from booking where bookingID =?";
    db.query(sql,id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } else {
            result(null, res);
        }
    })
}

module.exports= {getBooking};