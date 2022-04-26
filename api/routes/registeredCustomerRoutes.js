const express = require('express')
const router = express.Router()
const registeredCustomerController = require('../controllers/registeredCustomerController');

router.get("/all", registeredCustomerController.get_all_customers)

module.exports = router