const router = require("express").Router();
const classPriceController = require('../controllers/classPriceController');


router.post("/addClassPrice",classPriceController.addClassPrice);
router.put("/updateClassPrice",classPriceController.updateClassPrice);
router.get("/getClassPriceByIDs/:RouteID/:classID",classPriceController.getClassPriceBYIDs);


module.exports =router;