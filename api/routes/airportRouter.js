const express = require("express");
const router = express.Router();
const airportController = require("../controllers/airportController");

router.get("/all", airportController.getAllAirPorts);

module.exports = router;
