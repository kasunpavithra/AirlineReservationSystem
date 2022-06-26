const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookingsController");

router.get("/getRegUserBooking/:id",bookingsController.getRegisteredBooking);
router.get("/getGuestUserBooking/:id",bookingsController.getGuestBooking)

module.exports = router;