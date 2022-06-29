const router  = require('express').Router();
const airportInfoController = require('../controllers/airportInfoController')

router.post("/addAirportInfo",airportInfoController.addAirportInfo)


module.exports = router;