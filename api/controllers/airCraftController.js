const airCraftModel = require("../models/airCraftModel");

const getAirCraftByRoute = async (req, res) => {
  await airCraftModel
    .getAirCraftByRoute(req.query)
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      });
    });
};
const getAirCraftByFlight = async (req, res) => {
  
  await airCraftModel
    .getAirCraftByFlight(req.query)
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      });
    });
};
module.exports = { getAirCraftByRoute, getAirCraftByFlight };
