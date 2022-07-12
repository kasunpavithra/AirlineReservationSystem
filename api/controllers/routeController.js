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

const getAllRoutesForManager = async (req, res) => {
  await routeModel
    .getAllRoutesForManager()
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

const addRoute = async (req, res) => {
  await routeModel
      .addRoute(req.body)
      .then((result) => {
          res.status(201).json({     //201 for created
              success: true,
              result,
          });
      })
      .catch((err) => {
          if(err?.message==="BadRequest") return res.status(400).json({        //400 bad request
              success: false,
              err,
          });
          res.status(500).json({        //500 for server err
              success: false,
              err,
          });
      });
};

const deleteRoute = async (req, res) => {
  await routeModel
      .deleteRoute(parseInt(req.params.id))
      .then((result) => {
          res.status(200).json({
              success: true,
              result,
          });
      })
      .catch((err) => {
          res.status(500).json({        //500 for server err
              success: false,
              err,
          });
      });
};
module.exports = { getAllRoutes, getRoutePrices,addRoute,deleteRoute,getAllRoutesForManager };
