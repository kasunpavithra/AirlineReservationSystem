const express = require("express");
const router = express.Router();
const guestcontroller = require("../controllers/guestcontroller");


router.post("/create",guestcontroller.guestCreate)
router.post("/login",guestcontroller.guestLogin)

module.exports = router;