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
const cancelFlight = async (req, res) => {
  console.log(req.body)
  console.log("-------------------------------------------------")
  await flightModel
    .cancelFlight(req.body.flightID)
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
const getAllBookings = async (req, res) => {
  await flightModel
    .getAllBookings(req.params)
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

const getAllPassengerTypes = async (req, res) => {
  await flightModel
    .getAllPassengerTypes()
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

const getAllAirCraftTypes = async (req, res) => {
  await flightModel
    .getAllAirCraftTypes()
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

const getRevenue = async (req, res) => {
  await flightModel
    .getRevenue(req.params)
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

const getPastFlights = async (req, res) => {
  await flightModel
    .getPastFlights(req.params)
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
const addFlights = async (req, res) => {
  await flightModel
    .addFlights(req)
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

const updateFlight = async (req, res) => {
  console.log(req.body);
  await flightModel
    .updateFlight(req.body)
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
module.exports = {
  addFlights,
  getAllFlights,
  getFlightsbyDate,
  getFlightsOnwards,
  getFlightsById,
  getPassengersByFlightId,
  getAllDestinations,
  getPassengersByDateDestination,
  getAllPassengerTypes,
  getAllBookings,
  getAllAirCraftTypes,
  getRevenue,
  getPastFlights,
  updateFlight,
  cancelFlight,
};
