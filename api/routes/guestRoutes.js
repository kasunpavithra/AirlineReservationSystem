const express = require("express");
const router = express.Router();
const guestcontroller = require("../controllers/guestcontroller");


router.post("/create",guestcontroller.guestCreate)

module.exports = router;