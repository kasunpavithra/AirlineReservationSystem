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




const updateRefreshTokenAndLoggedAt= (refreshToken,id,role)=>{
    console.log(refreshToken)
    return new Promise((resolve,reject)=>{

        if(role==5000){
            db.query("Update registeredcustomer set refresh_token=?, logged_at=? WHERE userID=?",[refreshToken,new Date(),id],(err,result)=>{
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result);
                }
            });

        }
        else if(role==5002 || role ==5003){
            db.query("Update authorizeduser set refresh_token=?, logged_at=? WHERE userID=?",[refreshToken,new Date(),id],(err,result)=>{
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result);
                }
            });


        }
    
    });
}

const checkTokenFromDatabase= (refreshToken,role)=>{
    return new Promise((resolve,reject)=>{

        if(role==5000){
            db.query("Select userID from registeredcustomer where refresh_token=?",[refreshToken],(err,result)=>{
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result);
                }
            });

        }
        else if(role==5002 || role ==5003){
            db.query("Select userID from authorizeduser WHERE refresh_token=?",[refreshToken],(err,result)=>{
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result);
                }
            });


        }
    
    });
}


const updateRefreshToken= (refreshToken,role)=>{
    return new Promise((resolve,reject)=>{

        if(role==5000){
            db.query("Update registeredcustomer set refresh_token=? where refresh_token=?",[null,refreshToken],(err,result)=>{
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result);
                }
            });

        }
        else if(role==5002 || role ==5003){
            db.query("Update authorizeduser set refresh_token=? where refresh_token=?",[null,refreshToken],(err,result)=>{
                if (err) {
                    return reject(err);
                } else {
                    return resolve(result);
                }
            });


        }
    
    });
}


module.exports = {getUserByEmail,getAuthUserByEmail,updateRefreshTokenAndLoggedAt,checkTokenFromDatabase, updateRefreshToken}