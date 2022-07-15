const express = require("express");
const router = express.Router();
const airportController = require("../controllers/airportController");
const verifyJWT = require('../middleware/verifyJWT');
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/verifyRoles");

router.get("/all", airportController.getAllAirPorts);
router.post("/addAirport",verifyJWT,verifyRoles(ROLES_LIST.Manager), airportController.addAirport);
router.delete("/deleteAirport/:id",verifyJWT,verifyRoles(ROLES_LIST.Manager),airportController.deleteAirport);
router.put('/updateAirport',verifyJWT,verifyRoles(ROLES_LIST.Manager),airportController.updateAirport);

module.exports = router;
