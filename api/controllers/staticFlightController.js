const staticFlightModel = require("../models/staticFlightModel");
const addFlights = async (req, res) => {
  const data = req.body;
  await staticFlightModel
    .addFlights(data.grpOfFlights)
    .then((result) => {
      console.log("Static Schedule added");
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      console.log("ERROR WHEN ADDING Static Schedule " + err);
      res.status(500).json({
        success: false,
        err,
      });
    });
};

module.exports = {
  addFlights,
};
