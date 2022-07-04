const router = require("express").Router();
const staticFlightController = require("../controllers/staticFlightController");

router.post("/addFlights", staticFlightController.addFlights);

module.exports = router;
