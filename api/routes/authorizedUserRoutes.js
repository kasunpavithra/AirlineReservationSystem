const express = require("express")
const router = express.Router()
const authorizedUserController = require('../controllers/authorizedUserController')

router.get("/all", authorizedUserController.get_all_authorized_users)
router.post("/register", authorizedUserController.register_authorized_users)
router.delete("/delete/:id", authorizedUserController.delete_authorized_users_by_id)
router.put("/update", authorizedUserController.update_authorized_user)

module.exports = router