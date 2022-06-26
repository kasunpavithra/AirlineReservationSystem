const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");

router.get("/allFlights", flightController.getAllFlights);
router.get("/allFlightIds", flightController.getFlightsById);
router.get("/allFlightIdsPassengers/:FlightNo/:AgeType", flightController.getPassengersByFlightId);
router.get(
  "/year/:year/month/:month/date/:date",
  flightController.getFlightsbyDate
);
router.get("/getFlightsOnwards", flightController.getFlightsOnwards);
module.exports = router;
