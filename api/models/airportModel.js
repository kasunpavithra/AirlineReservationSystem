const db = require("../db/db");

const getAllAirPorts = () => {
  return new Promise((resolve, reject) => {
    // var sql = "SELECT * FROM airport a join `airportleveldetail` ad using(airport_id) join level using(levelID)    WHERE a.status=1 and ad.status=1  order by (airport_id)";
    var sql = "SELECT airport_id,name FROM airport where status=1 ";
    // "SELECT levelID,value,levelName,levelrank,airportlevelDetailID FROM `airportleveldetail` ad join level using(levelID)  WHERE airport_id=? AND ad.status=1 order by levelrank desc;"
    db.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        var resultarray = [];

        const addLevel=(result)=> 
          new Promise((resolve, reject) => {
            db.query(
              "SELECT levelID,value,levelName,levelrank,airportlevelDetailID FROM `airportleveldetail` ad join level using(levelID)  WHERE airport_id=? AND ad.status=1 order by levelrank desc",
              [result.airport_id],
              function (err3, result3) {
                if (err3) {
                  // console.log('fdfdssdfds')
                  return reject(false);
                } else {
                  var v = {airport_id: result.airport_id,name:result.name, location: result3 };
                  // console.log(resultarray)
                  // console.log(v)
                  return resolve(v);

                }
              }
            );
          })
            .then((res) => {
              resultarray.push(res);
              // console.log(resultarray.length)
              // console.log(resultarray)
              return true;
            })
            .catch((err) => {
              return false;
            });
        
       
        const test= async()=>{
          var isGet = false;
          for (let i = 0; i < result.length; i++) {
            
        
            isGet = await addLevel(result[i])
            // await addLevel(result[i])
  
            // console.log(isGet)
            if (isGet === false) {
              break;
            } else {
              continue;
            }
          }
          if (isGet === true) {
            console.log(resultarray);
            return resolve(resultarray);
          } else {
            return reject([]);
          }
        

        }
        test();
        
      
      }
    });
  });
};

const addAirport = (airportInfo) => {
  return new Promise((resolve, reject) => {
    var sql = "INSERT INTO `airport` (name,status) VALUES (?,1);";
    if (!airportInfo?.name) return reject(new Error("BadRequest"));

    db.query(sql, [airportInfo.name], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const deleteAirport = (id) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    var sql = "UPDATE `airport` SET status=0 WHERE airport_id=?;";
    db.query(sql, [id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

const updateAirport = (airportInfo) => {
  console.log(airportInfo);
  return new Promise((resolve, reject) => {
    var sql = "UPDATE `airport` SET name=?  WHERE airport_id=? AND status=1;";
    if (!airportInfo?.name || !airportInfo?.id)
      return reject(new Error("BadRequest"));

    db.query(sql, [airportInfo.name, airportInfo.id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = {
  getAllAirPorts,
  addAirport,
  deleteAirport,
  updateAirport,
};
