const express = require('express')
const router = express.Router()
const registeredCustomerController = require('../controllers/registeredCustomerController');

router.get("/all", registeredCustomerController.get_all_customers)
router.delete("/delete/:id", registeredCustomerController.delete_customers_by_id)

module.exports = router