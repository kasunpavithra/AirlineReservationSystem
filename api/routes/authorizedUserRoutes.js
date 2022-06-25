const express = require("express")
const router = express.Router()
const authorizedUserController = require('../controllers/authorizedUserController')

router.get("/all", authorizedUserController.get_all_authorized_users)
router.get("/onlyActive", authorizedUserController.get_only_active_authorized_users)
router.get("/onlyDeleted", authorizedUserController.get_only_deleted_authorized_users)
router.post("/register", authorizedUserController.register_authorized_users)
router.delete("/delete/:id", authorizedUserController.delete_authorized_users_by_id)
router.put("/update", authorizedUserController.update_authorized_user)
router.get("/get/:id", authorizedUserController.get_authorized_user)
router.get("/total", authorizedUserController.get_total_authorized_users)

module.exports = router