const express = require("express")
const router = express.Router()
const airCraftTypeController = require("../controllers/airCraftTypeController");

router.post("/add", airCraftTypeController.addAirCraftType)
router.delete("/delete/:id", airCraftTypeController.deleteAirCraftType);
router.put("/update/:id", airCraftTypeController.updateAirCraftType);

module.exports = router