
const db = require('../db/db');

const registerUser = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        let firstname = userInfo.FirstName;
        let lastname = userInfo.LastName;
        let email = userInfo.Email;
        let address = userInfo.Address;
        let mobile = userInfo.mobile;
        let birthday = userInfo.birthday;
        let password = userInfo.password;

        if (!firstname || !lastname || !email || !address || !mobile || !birthday || !password || !userInfo.gender) return reject(new Error("BadReqest"));

        let gender;
        (userInfo.gender === "male") ? gender = 1 : gender = 0;



        try {
            const isExist = await isEmailExist(email);

            if (!isExist) {
                let sql = "INSERT INTO registeredcustomer (firstname, lastname, email, address, password, gender,birthday) VALUES (?,?,?,?,?,?,?)";

                db.beginTransaction((err) => {
                    if (err) {
                        return reject(err);
                    }

                    db.query(sql, [firstname, lastname, email, address, password, gender, birthday], (err, data) => {
                        if (err) {
                            db.rollback();
                            return reject(err);
                        }
                        let sqlAddmobile = "INSERT INTO userphone (registeredUserID,phoneNumber) VALUES((SELECT userID FROM registeredcustomer WHERE email=?),?)";
                        db.query(sqlAddmobile, [email, mobile], (err, data) => {
                            if (err) {
                                db.rollback();
                                return reject(err);
                            }
                            db.commit(function (err4) {
                                if (err4) {
                                    db.rollback(function () {
                                        return reject(err4);
                                    });
                                }
                                return resolve(true);
                            });
                        });

                    });

                });

            } else reject(new Error("EmailAlreadyExists"));
        } catch (err) {
            reject(err);
        }



    });
}

const isEmailExist = (email) => {
    return new Promise((resolve, reject) => {
        checkEmailSQL = "SELECT * FROM registeredcustomer WHERE email=?";
        db.query(checkEmailSQL, email, (err, data) => {
            // console.log(data.length);
            if (err) return reject(err);

            else if (data.length > 0) {
                return resolve(true);
            }
            return resolve(false)
        });
    })
}

module.exports = {
    registerUser
}