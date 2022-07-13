const db = require("../db/db");

const getAllLevels = () => {
  return new Promise((resolve, reject) => {
    var sql =
      "SELECT levelID,levelName,levelrank FROM `level` where status=1 order by levelrank desc;";
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const deleteLevel = (id) => {
  return new Promise((resolve, reject) => {
    var sql =
    "UPDATE `level` SET status=0 WHERE levelID=?;"
    db.query(sql,[id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const addLevel = (levelInfo) => {
  return new Promise((resolve, reject) => {
    var sql =
      "INSERT INTO `level` (levelName,levelrank,status) VALUES (?,?,1);";
    if(!levelInfo?.levelName || !levelInfo?.levelrank) return reject(new Error("BadRequest"));
    
    db.query(sql,[levelInfo.levelName,levelInfo.levelrank] ,(err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const updateLevel = (levelInfo) => {
  return new Promise((resolve, reject) => {
    var sql =
      "UPDATE `level` SET levelName=? ,levelrank=? WHERE levelID=?;";
    if(!levelInfo?.levelName || !levelInfo?.levelrank || !levelInfo?.id) return reject(new Error("BadRequest"));
    
    db.query(sql,[levelInfo.levelName,levelInfo.levelrank,levelInfo.id] ,(err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};


module.exports ={getAllLevels,addLevel,deleteLevel, updateLevel}