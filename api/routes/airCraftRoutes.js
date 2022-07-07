const express = require("express");
const router = express.Router();
const airCraftController = require("../controllers/airCraftController");

router.get("/getAirCraftByRoute", airCraftController.getAirCraftByRoute);
router.get("/getAirCraftByFlight", airCraftController.getAirCraftByFlight);
router.post("/add", airCraftController.addAirCraft);
router.delete("/delete/:id", airCraftController.deleteAirCraft);
router.put("/update/:id", airCraftController.updateAirCraft);
router.get("/all", airCraftController.getAllAirCrafts);
router.get("/getAirCraft/:id", airCraftController.getAirCraft);

module.exports = router;
