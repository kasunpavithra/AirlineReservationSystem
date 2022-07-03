const airCraftModel = require("../models/airCraftModel");

const getAllAirCrafts = async (req, res) => {
  await airCraftModel
    .getAllAirCrafts()
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

const addAirCraft = async (req, res) => {
  const airCraftData = req.body;
  await airCraftModel
    .addAirCraft(airCraftData)
    .then((result) => {
      console.log("Aircraft added!");
      res.status(201).json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      console.log("ERROR WHEN ADDING AN AIRCRAFT: " + err);
      res.status(500).json({
        success: false,
        err,
      });
    });
};

const deleteAirCraft = async (req, res) => {
  const deleteId = req.params.id;
  await airCraftModel
    .deleteAirCraft(deleteId)
    .then((result) => {
      console.log("Aircraft deleted!");
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      console.log("ERROR WHEN DELETING AN AIRCRAFT: " + err);
      res.status(500).json({
        success: false,
        err,
      });
    });
};

const updateAirCraft = async (req, res) => {
  const updateId = req.params.id;
  const aircraftData = req.body;
  await airCraftModel
    .updateAirCraft(updateId, aircraftData)
    .then((result) => {
      console.log("Aircraft updated!");
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      console.log("ERROR WHEN UPDATING AN AIRCRAFT: " + err);
      res.status(500).json({
        success: false,
        err,
      });
    });
};

module.exports = {
  getAirCraftByRoute,
  getAirCraftByFlight,
  addAirCraft,
  deleteAirCraft,
  updateAirCraft,
  getAllAirCrafts,
};
