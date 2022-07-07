const staticFlightModel = require("../models/staticFlightModel");
const addFlights = async (req, res) => {
  const data = req.body;
  await staticFlightModel
    .addFlights(data.grpOfFlights)
    .then((result) => {
      console.log("Static Schedule added");
      res.status(201).json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      console.log("ERROR WHEN ADDING Static Schedule " + err);
      err == "BadRequest"
        ? res.status(400).json({
            success: false,
            err,
          })
        : err === "serverError"
        ? res.status(500).json({
            success: false,
            err,
          })
        : res.status(404).json({
            success: false,
            err: "Not Found",
          });
    });
};

const updateFlights = async (req, res) => {
  const data = req.body;
  console.log(data.grpOfFlights);
  await staticFlightModel
    .updateFlights(data.grpOfFlights)
    .then((result) => {
      console.log("Static Schedule updated");
      res.status(201).json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      console.log("ERROR WHEN UPDATING Static Schedule " + err);
      err == "BadRequest"
        ? res.status(400).json({
            success: false,
            err,
          })
        : err === "serverError"
        ? res.status(500).json({
            success: false,
            err,
          })
        : err === "emptyRequest"
        ? res.status(204).json({
            success: false,
            err: "Empty Request",
          })
        : res.status(404).json({
            success: false,
            err: "Not Found",
          });
    });
};

const getRouteData = async (req, res) => {
  await staticFlightModel
    .getRouteData(req.params.routeID)
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
const getRoutesData = async (req, res) => {
  await staticFlightModel
    .getRoutesData()
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
module.exports = {
  addFlights,
  getRouteData,
  getRoutesData,
  updateFlights,
};
