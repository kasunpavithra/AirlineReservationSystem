const airportModel = require("../models/airportModel");

const getAllAirPorts = async (req, res) => {
  await airportModel
    .getAllAirPorts()
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      });
    });
};

const addAirport = async (req, res) => {
  await airportModel
      .addAirport(req.body)
      .then((result) => {
          res.status(201).json({     //201 for created
              success: true,
              result,
          });
      })
      .catch((err) => {
          if(err?.message==="BadRequest") return res.status(400).json({        //400 bad request
              success: false,
              err,
          });
          res.status(500).json({        //500 for server err
              success: false,
              err,
          });
      });
};

const deleteAirport = async (req, res) => {
  await airportModel
      .deleteAirport(parseInt(req.params.id))
      .then((result) => {
          res.status(200).json({
              success: true,
              result,
          });
      })
      .catch((err) => {
          res.status(500).json({        //500 for server err
              success: false,
              err,
          });
      });
};


const updateAirport = async (req, res) => {
  await airportModel
      .updateAirport(req.body)
      .then((result) => {
          res.status(200).json({     
              success: true,
              result,
          });
      })
      .catch((err) => {
          if(err?.message==="BadRequest") return res.status(400).json({        //400 bad request
              success: false,
              err,
          });
          res.status(500).json({        //500 for server err
              success: false,
              err,
          });
      });
};

module.exports = { getAllAirPorts,addAirport,deleteAirport,updateAirport};
