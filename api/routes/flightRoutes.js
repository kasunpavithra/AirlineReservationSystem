const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");

router.get("/all", flightController.getAllFlights);
router.get(
  "/year/:year/month/:month/date/:date",
  flightController.getFlightsbyDate
);
router.get("/getFlightsOnwards", flightController.getFlightsOnwards);
module.exports = router;
