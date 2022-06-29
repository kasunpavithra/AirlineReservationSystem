const express = require("express");
const router = express.Router();
const airportController = require("../controllers/airportController");

router.get("/all", airportController.getAllAirPorts);
router.post("/addAirport", airportController.addAirport);
router.delete("/deleteAirport/:id",airportController.deleteAirport);
router.post('/updateAirport',airportController.updateAirport);

module.exports = router;
