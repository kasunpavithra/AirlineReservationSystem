const express = require("express");
const router = express.Router();
const airCraftController = require("../controllers/airCraftController");

router.get("/getAirCraftByRoute", airCraftController.getAirCraftByRoute);
router.get("/gtAirCraftByFlight", airCraftController.getAirCraftByFlight);
router.post("/add", airCraftController.addAirCraft);
router.delete("/delete/:id", airCraftController.deleteAirCraft);
router.put("/update/:id", airCraftController.updateAirCraft);

module.exports = router;
