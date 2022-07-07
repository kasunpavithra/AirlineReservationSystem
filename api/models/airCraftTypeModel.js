const db = require("../db/db");

const addAirCraftType = (data) => {
  console.log("AAAwa")
  console.log(data) 
    return new Promise((resolve, reject) => {
      var imgsrc = '/src/images/aircrafttypes/' + data.Image.filename
      var sql = "INSERT INTO aircrafttype (aircraftTypeID, name, description, image, status) VALUES (DEFAULT, ?,?,?, 1);"
      const valueSet = [data.name, data.description, [imgsrc]]
      db.query(sql, valueSet, (err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result);
        }
      })
    })
  };
  
  const deleteAirCraftType = (deleteId) => {
    console.log(deleteId)
    return new Promise((resolve, reject) => {
      var sql = "UPDATE aircrafttype SET status=0 WHERE aircraftTypeID=?;"
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
  
  const updateAirCraftType = (data) => {

    return new Promise((resolve, reject) => {
      if( data.Image){
      var imgsrc = '/src/images/aircrafttypes/' + data.Image.filename
      var sql = "UPDATE aircrafttype SET name=?, description=?, image=? WHERE aircraftTypeID=?;"
      const valueSet = [data.name, data.description, [imgsrc],data.id]
      db.query(sql, valueSet, (err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result);
        }
      })
    }
    else{
      console.log(data)
      var sql = "UPDATE aircrafttype SET name=?, description=?  WHERE aircraftTypeID=?;"
      const valueSet = [data.name, data.description,data.id]
      db.query(sql, valueSet ,(err, result) => {
          if (err) {
              return reject(err)
          } else {
              return resolve(result);
          }
      })
  
  }
    })
  };

 

  const  getAllAirCraftTypes  = () => {
    return new Promise((resolve, reject) => {
      var sql = "Select * from aircrafttype where  status!=0"
      db.query(sql,(err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result);
        }
      })
    })
  };

  const    getAirCraftType = (aircraftypeID) => {
    return new Promise((resolve, reject) => {
      var sql = "Select * from aircrafttype where  aircraftTypeID=?"
      const valueset=[aircraftypeID]
      db.query(sql,valueset,(err, result) => {
        if (err) {
          return reject(err)
        } else {
          return resolve(result);
        }
      })
    })
  };




module.exports = {
    addAirCraftType,
    deleteAirCraftType,
    updateAirCraftType,
    getAllAirCraftTypes,
    getAirCraftType
}