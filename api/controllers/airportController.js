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

module.exports = { getAllAirPorts };
