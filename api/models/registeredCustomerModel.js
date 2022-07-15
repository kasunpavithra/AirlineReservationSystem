const db = require("../db/db")
const bcrypt = require("bcrypt")

const get_all_customers = () => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM registeredcustomer ORDER BY userID;"
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

const get_only_active_customers = () => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM registeredcustomer WHERE status=1 ORDER BY userID;"
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

const get_only_deleted_customers = () => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM registeredcustomer WHERE status=0 ORDER BY userID;"
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

const delete_customers_by_id = (userID) => {
    return new Promise((resolve, reject) => {
        var sql = "UPDATE registeredcustomer SET status=0 WHERE userID=?;"
        db.query(sql, userID ,(err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

const update_customer = (userData) => {
    console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW", userData)
    if(userData.status === null) userData.status=1;
    
    return new Promise((resolve, reject) => {
        var sql = "UPDATE registeredcustomer SET userID=?, firstname=?, lastname=?, email=?, password=?, address=?, status=?, image=?, gender=?, birthday=? WHERE userID=?;"
        const hash = bcrypt.hashSync(userData.password, 9)
        const valueSet = [userData.userID, userData.firstname, userData.lastname, userData.email, hash, userData.address, userData.status, userData.image, userData.gender, userData.birthday, userData.userID]
        db.query(sql, valueSet ,(err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

const update_customer_by_customer = (userData) => {
    console.log(userData)
    return new Promise((resolve, reject) => {
        if( userData.Image){
            var imgsrc = '/src/images/' + userData.Image.filename
            var sql = "UPDATE registeredcustomer SET firstname=?, lastname=?, address=?, image=?, gender=?, birthday=? WHERE userID=?;"
            const valueSet = [userData.firstname, userData.lastname, userData.address,[imgsrc], userData.gender, userData.birthday, userData.userID]
            db.query(sql, valueSet ,(err, result) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(result);
                }
            })
        }
        else{
            var sql = "UPDATE registeredcustomer SET firstname=?, lastname=?, address=?, gender=?, birthday=? WHERE userID=?;"
            const valueSet = [userData.firstname, userData.lastname, userData.address, userData.gender, userData.birthday, userData.userID]
            db.query(sql, valueSet ,(err, result) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(result);
                }
            })
       
        }

       
    })
}

const get_customer_by_id = (userID) => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT * FROM registeredcustomer as r left outer join userphone as u on r.userID = u.registeredUserID WHERE userID=?;"
        db.query(sql, userID, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

const register_customer = (userData) => {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO registeredcustomer (firstname, lastname, email, password, address, status, image, gender, birthday) VALUES (?,?,?,?,?,?,?,?,?);"
        const hash = bcrypt.hashSync(userData.password, 9)
        const valueSet = [userData.firstname, userData.lastname, userData.email, hash, userData.address, userData.status, userData.image, userData.gender, userData.birthday]
        db.query(sql, valueSet ,(err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

const get_total_registered_customers = () => {
    return new Promise((resolve, reject) => {
        var sql = "SELECT COUNT(*) AS total FROM registeredcustomer;"
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(result);
            }
        })
    })
}

module.exports = {
    get_all_customers,
    delete_customers_by_id,
    update_customer,
    update_customer_by_customer,
    get_customer_by_id,
    register_customer,
    get_only_active_customers,
    get_only_deleted_customers,
    get_total_registered_customers
}