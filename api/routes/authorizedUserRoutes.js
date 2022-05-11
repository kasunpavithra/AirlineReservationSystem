const express = require("express")
const router = express.Router()
const authorizedUserController = require('../controllers/authorizedUserController')

router.get("/all", authorizedUserController.get_all_authorized_users)
router.delete("/delete/:id", authorizedUserController.delete_authorized_users_by_id)

module.exports = router