const express = require("express")
const router = express.Router()
const classController = require("../controllers/classController");

router.post("/add", classController.addClass)
router.delete("/delete/:id", classController.deleteClass);
router.put("/update/:id", classController.updateClass);

module.exports = router