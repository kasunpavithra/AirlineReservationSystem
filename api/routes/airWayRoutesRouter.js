const express = require("express");
const router = express.Router();
const routeController = require("../controllers/routeController");

router.get("/all", routeController.getAllRoutes);

module.exports = router;
