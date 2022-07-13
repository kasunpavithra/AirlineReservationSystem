const express = require("express");
const router = express.Router();
const routeController = require("../controllers/routeController");

router.get("/all", routeController.getAllRoutes);
router.get("/routePrice/:routeID", routeController.getRoutePrices);
router.post("/addRoute",routeController.addRoute);
router.delete("/deleteRoute/:id",routeController.deleteRoute);
router.get("/allRoutesForManager", routeController.getAllRoutesForManager);


module.exports = router;
