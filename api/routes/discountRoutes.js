const express = require("express")
const router = express.Router()
const discountController = require("../controllers/discountController");

router.get("/all", discountController.getAllDiscounts)
router.post("/add", discountController.addDiscount);
router.delete("/delete/:id", discountController.deleteDiscount);

module.exports = router