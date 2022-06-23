const routeModel = require("../models/routeModel");

const getAllRoutes = async (req, res) => {
  await routeModel
    .getAllRoutes()
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
const getRoutePrices = async (req, res) => {
  const routeID = req.params.routeID;
  await routeModel
    .getRoutePrices(routeID)
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
module.exports = { getAllRoutes, getRoutePrices };
