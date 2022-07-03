const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookingsController");

router.get("/getRegUserBooking/:id",bookingsController.getRegisteredBooking);
router.get("/getGuestUserBooking/:id",bookingsController.getGuestBooking)
router.post("/add",bookingsController.addBooking);
router.put("/cancelBooking",bookingsController.cancelBooking)
module.exports = router;