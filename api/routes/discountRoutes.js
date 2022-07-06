const express = require("express")
const router = express.Router()
const discountController = require("../controllers/discountController");

router.get("/all", discountController.getAllDiscounts)
// router.delete("/delete/:id", discountController.deleteClass);
// router.put("/update/:id", discountController.updateClass);

module.exports = router