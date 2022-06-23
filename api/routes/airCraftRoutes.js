const express = require("express");
const router = express.Router();
const airCraftController = require("../controllers/airCraftController");

router.get("/getAirCraftByRoute", airCraftController.getAirCraftByRoute);
router.get("/getAirCraftByFlight", airCraftController.getAirCraftByFlight);
module.exports = router;
