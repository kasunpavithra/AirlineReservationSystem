const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");

router.get("/all", flightController.getAllFlights);
router.get("/allFlightIds", flightController.getFlightsById);
router.get("/allFlightIdsPassengers/:FlightNo/:AgeType", flightController.getPassengersByFlightId);
router.get("/allDestinations", flightController.getAllDestinations);
router.get("/allDateDestinationPassengers/:Destination/:StartDate/:EndDate", flightController.getPassengersByDateDestination);
router.get("/allPassengerTypes", flightController.getAllPassengerTypes)
router.get("/allBookings/:ClassId/:AgeType/:StartDate/:EndDate", flightController.getAllBookings);
router.get("/allAirCraftTypes", flightController.getAllAirCraftTypes)
router.get("/getRevenue/:AirCraftId", flightController.getRevenue)
router.get("/getPastFlights/:OriginID/:DestinationID", flightController.getPastFlights)
router.post("/addFlights",flightController.addFlights)

router.put("/updateFlight", flightController.updateFlight);


router.get(
  "/year/:year/month/:month/date/:date",
  flightController.getFlightsbyDate
);
router.get("/getFlightsOnwards", flightController.getFlightsOnwards);
module.exports = router;
