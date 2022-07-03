const express = require("express")
const router = express.Router()
const airCraftSeatController = require("../controllers/airCraftSeatController");

router.post("/add", airCraftSeatController.addAirCraftSeat)
router.delete("/delete/:id", airCraftSeatController.deleteAirCraftSeat);
router.put("/update/:id", airCraftSeatController.updateAirCraftSeat);
router.get("/getSeatsByflightID/:id",airCraftSeatController.getSeatsByflightID)

module.exports = router