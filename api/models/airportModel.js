const db = require("../db/db");

const getAllAirPorts = () => {
  return new Promise((resolve, reject) => {
    // var sql = "SELECT * FROM airport a join `airportleveldetail` ad using(airport_id) join level using(levelID)    WHERE a.status=1 and ad.status=1  order by (airport_id)";
    var sql = "SELECT airport_id FROM airport "
    // "SELECT levelID,value,levelName,levelrank,airportlevelDetailID FROM `airportleveldetail` ad join level using(levelID)  WHERE airport_id=? AND ad.status=1 order by levelrank desc;"
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        var resultarray=[]
        
        for (let i = 0; i < result.length; i++) {
     
          db.query('SELECT levelID,value,levelName,levelrank,airportlevelDetailID FROM `airportleveldetail` ad join level using(levelID)  WHERE airport_id=? AND ad.status=1 order by levelrank desc', [result[i].airport_id],  function (err3, result3) {
              if (err3) {
                  console.log("AKAFADS");
                  db.rollback();
                  return reject1(false);
              }
              else{
       
                var v={'id':result[i],'values':result3}
                
                
                // console.log(resultarray)
              // resultarray.push(...v)
               
              }
               
          });
        
          
                  
      }
      return  resolve(resultarray)
      
      

      }
    });
  });
};

const addAirport = (airportInfo) => {
  return new Promise((resolve, reject) => {
    var sql =
      "INSERT INTO `airport` (name,status) VALUES (?,1);";
    if(!airportInfo?.name) return reject(new Error("BadRequest"));
    
    db.query(sql,[airportInfo.name] ,(err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const deleteAirport = (id) => {
  console.log(id)
  return new Promise((resolve, reject) => {
    var sql =
    "UPDATE `airport` SET status=0 WHERE airport_id=?;"
    db.query(sql,[id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const updateAirport = (airportInfo) => {
  console.log(airportInfo)
  return new Promise((resolve, reject) => {
    var sql =
      "UPDATE `airport` SET name=?  WHERE airport_id=? AND status=1;";
    if(!airportInfo?.name || !airportInfo?.id) return reject(new Error("BadRequest"));
    
    db.query(sql,[airportInfo.name, airportInfo.id] ,(err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = {
  getAllAirPorts, addAirport, deleteAirport, updateAirport
};
