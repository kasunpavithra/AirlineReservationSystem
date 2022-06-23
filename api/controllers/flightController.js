const flightModel = require("../models/flightModel");

const getAllFlights = async (req, res) => {
  await flightModel
    .getAllFlights()
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

const getFlightsbyDate = async (req, res) => {
  await flightModel
    .getFlightsbyDate(req.params)
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

const getFlightsOnwards = async (req, res) => {
  await flightModel
    .getFlightsOnwards(req.query)
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

module.exports = { getAllFlights, getFlightsbyDate, getFlightsOnwards };
