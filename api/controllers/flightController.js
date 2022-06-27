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

const getAllDestinations = async (req, res) => {
  await flightModel
    .getAllDestinations()
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


const getPassengersByFlightId = async (req, res) => {

  await flightModel
    .getPassengersByFlightId(req.params)
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


const getPassengersByDateDestination = async (req, res) => {

  await flightModel
    .getPassengersByDateDestination(req.params)
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





const getFlightsById = async (req, res) => {
  await flightModel
    .getFlightsById()
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

module.exports = { getAllFlights, getFlightsbyDate, getFlightsOnwards,getFlightsById,getPassengersByFlightId,getAllDestinations,getPassengersByDateDestination };
