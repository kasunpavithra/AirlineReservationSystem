const express = require("express")
const router = express.Router()
const airCraftSeatController = require("../controllers/airCraftSeatController");
const verifyJWT = require('../middleware/verifyJWT');
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/verifyRoles");


router.post("/add",verifyJWT, verifyRoles(ROLES_LIST.Manager), airCraftSeatController.addAirCraftSeat)
router.delete("/delete/:id",verifyJWT,verifyRoles(ROLES_LIST.Manager), airCraftSeatController.deleteAirCraftSeat);
router.put("/update/:id",verifyJWT,verifyRoles(ROLES_LIST.Manager), airCraftSeatController.updateAirCraftSeat);
router.get("/getSeatsByflightID/:id",airCraftSeatController.getSeatsByflightID)

module.exports = router