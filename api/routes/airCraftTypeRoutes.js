const express = require("express")
const router = express.Router()
const upload=require('../middleware/multer')
const airCraftTypeController = require("../controllers/airCraftTypeController");

router.post("/add/",upload.single('Image'), airCraftTypeController.addAirCraftType)
router.delete("/delete/:id", airCraftTypeController.deleteAirCraftType);
router.put("/update/:id", airCraftTypeController.updateAirCraftType);
router.get("/get", airCraftTypeController.getAllAirCraftTypes);
router.get("/get/:id", airCraftTypeController.getAirCraftType);

module.exports = router