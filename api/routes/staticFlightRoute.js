const router = require("express").Router();
const staticFlightController = require("../controllers/staticFlightController");

router.post("/addFlights", staticFlightController.addFlights);
router.get("/getRouteData/:routeID", staticFlightController.getRouteData);
module.exports = router;
