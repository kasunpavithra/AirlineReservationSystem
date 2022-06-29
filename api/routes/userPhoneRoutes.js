const express = require("express")
const router = express.Router()
const userPhoneController = require("../controllers/userPhoneController");

router.post("/add", userPhoneController.addUserPhone)
router.delete("/delete/:id", userPhoneController.deleteUserPhone);
router.put("/update/:id", userPhoneController.updateUserPhone);

module.exports = router