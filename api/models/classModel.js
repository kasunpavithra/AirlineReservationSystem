const db = require("../db/db");

const addClass = (data) => {
    return new Promise((resolve, reject) => {
      var sql = "INSERT INTO class (classID , name, status) VALUES (DEFAULT, ?, 1);"
      const valueSet = [data.name]
      db.query(sql, valueSet, (err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result);
        }
      })
    })
  };
  
  const deleteClass = (deleteId) => {
    return new Promise((resolve, reject) => {
      var sql = "UPDATE class SET status=0 WHERE classID=?;"
      const valueSet = [deleteId]
      db.query(sql, valueSet, (err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result);
        }
      })
    })
  };
  
  const updateClass = (updateId, classData) => {
    return new Promise((resolve, reject) => {
      var sql = "UPDATE class SET name=?, status=? WHERE classID=?;"
      const valueSet = [classData.name, classData.status, updateId]
      db.query(sql, valueSet, (err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result);
        }
      })
    })
  };

module.exports = {
    addClass,
    deleteClass,
    updateClass
}