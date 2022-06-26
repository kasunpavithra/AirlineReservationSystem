const db = require("../db/db");

const getUserByEmail = (email)=>{
    return  new Promise((resolve,reject)=>{
        db.query("SELECT * FROM registeredcustomer where email=?", email, (err, result) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
    
}

const getAuthUserByEmail = (email)=>{
    return new Promise((resolve,reject)=>{
        db.query("SELECT * FROM authorizeduser WHERE email=?",email,(err,result)=>{
            if (err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
}

module.exports = {getUserByEmail,getAuthUserByEmail}