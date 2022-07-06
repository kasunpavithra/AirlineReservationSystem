const express = require("express")
const router = express.Router()
const discountController = require("../controllers/discountController");

router.get("/all", discountController.getAllDiscounts)
router.post("/add", discountController.addDiscount);
// router.put("/update/:id", discountController.updateClass);

module.exports = router