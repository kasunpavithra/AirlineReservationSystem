const express = require('express')
const router = express.Router()
const upload=require('../middlewares/multer')
const registeredCustomerController = require('../controllers/registeredCustomerController');

router.get("/all", registeredCustomerController.get_all_customers)
router.get("/onlyActive", registeredCustomerController.get_only_active_customers)
router.get("/onlyDeleted", registeredCustomerController.get_only_deleted_customers)
router.post("/register", registeredCustomerController.register_customer)
router.delete("/delete/:id", registeredCustomerController.delete_customers_by_id)
router.put("/update", registeredCustomerController.update_customer)
router.put("/updatebycustomer",upload.single('Image'), registeredCustomerController.update_customer_by_customer)
router.get("/get/:id", registeredCustomerController.get_customer_by_id)
router.get("/total", registeredCustomerController.get_total_registered_customers)

module.exports = router