const express = require("express");
const router = express.Router();
const routeController = require("../controllers/routeController");
const ROLES_LIST = require("../config/rolesList");
const verifyRoles = require("../middleware/verifyRoles");
const verifyJWT = require('../middleware/verifyJWT');

router.get("/all", routeController.getAllRoutes);
router.get("/routePrice/:routeID",verifyJWT,verifyRoles(ROLES_LIST.Manager), routeController.getRoutePrices);
router.post("/addRoute",verifyJWT,verifyRoles(ROLES_LIST.Manager),routeController.addRoute);
router.delete("/deleteRoute/:id",verifyJWT,verifyRoles(ROLES_LIST.Manager),routeController.deleteRoute);
router.get("/allRoutesForManager",verifyJWT,verifyRoles(ROLES_LIST.Manager), routeController.getAllRoutesForManager);


module.exports = router;
