const express = require("express")
const router = express.Router()
const authorizedUserController = require('../controllers/authorizedUserController')

router.get("/all", authorizedUserController.get_all_authorized_users)

module.exports = router