const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookingsController");

router.get("/getBooking/:id",bookingsController.getBooking);

module.exports = router;