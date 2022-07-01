const router  = require('express').Router();
const airportInfoController = require('../controllers/airportInfoController');

router.post("/addAirportInfo",airportInfoController.addAirportInfo);
router.get("/getAirportInfoByID/:id",airportInfoController.getAirportInfoByID);
router.put("/updateAirportInfo",airportInfoController.updateAirportInfo);


module.exports = router;