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

module.exports = {
  addFlights,
};
