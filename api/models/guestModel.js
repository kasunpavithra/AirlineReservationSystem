
const db = require("../db/db");
const guestCreate = (userData) => {
  console.log(userData)
    return new Promise((resolve, reject) => {
      var sql = "INSERT INTO guest (firstname, lastname, email,address, gender, birthday) VALUES (?,?,?,?,?,?);"
      const valueSet = [userData['First Name'], userData['Last Name'], userData.Email,userData.Address, userData.Gender, userData.Birthday]
      db.query(sql, valueSet, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  };

  const  guestLogin = (userData) => {
    console.log(userData)
      return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM guest WHERE email=? and userID=?"
        const valueSet = [userData['Email'], userData['Refno']]
        db.query(sql, valueSet, (err, result) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(result);
          }
        });
      });
    };
  

  module.exports ={guestCreate,guestLogin}