const express = require("express")
const router = express.Router()
const airCraftTypeController = require("../controllers/airCraftTypeController");

router.post("/add", airCraftTypeController.addAirCraftType)
// router.delete("/delete/:id", airCraftController.deleteAirCraft);
// router.put("/update/:id", airCraftController.updateAirCraft);

module.exports = router