const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/verifyRoles");
const verifyJWT = require('../middleware/verifyJWT');


router.get("/all",flightController.getAllFlights);
router.get("/allFlightIds",verifyJWT,verifyRoles(ROLES_LIST.Manager), flightController.getFlightsById);
router.get("/allFlightIdsPassengers/:FlightNo/:AgeType",verifyJWT,verifyRoles(ROLES_LIST.Manager), flightController.getPassengersByFlightId);
router.get("/allDestinations",verifyJWT,verifyRoles(ROLES_LIST.Manager), flightController.getAllDestinations);
router.get("/allDateDestinationPassengers/:Destination/:StartDate/:EndDate",verifyJWT,verifyRoles(ROLES_LIST.Manager), flightController.getPassengersByDateDestination);
router.get("/allPassengerTypes",verifyJWT,verifyRoles(ROLES_LIST.Manager), flightController.getAllPassengerTypes)
router.get("/allBookings/:ClassId/:AgeType/:StartDate/:EndDate",verifyJWT,verifyRoles(ROLES_LIST.Manager), flightController.getAllBookings);
router.get("/allAirCraftTypes",verifyJWT,verifyRoles(ROLES_LIST.Manager), flightController.getAllAirCraftTypes)
router.get("/getRevenue/:AirCraftId",verifyJWT,verifyRoles(ROLES_LIST.Manager), flightController.getRevenue)
router.get("/getPastFlights/:OriginID/:DestinationID",verifyJWT,verifyRoles(ROLES_LIST.Manager), flightController.getPastFlights)
router.post("/addFlights",verifyJWT,verifyRoles(ROLES_LIST.Manager),flightController.addFlights)
router.put("/updateFlight", flightController.updateFlight);
router.put("/cancelFlight", flightController.cancelFlight);
router.get(
  "/year/:year/month/:month/date/:date",
  flightController.getFlightsbyDate
);
router.get("/getFlightsOnwards",flightController.getFlightsOnwards);
module.exports = router;
