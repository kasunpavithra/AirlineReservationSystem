const express = require("express");
const router = express.Router();
const routeController = require("../controllers/routeController");

router.get("/all", routeController.getAllRoutes);
router.get("/routePrice/:routeID", routeController.getRoutePrices);
module.exports = router;
