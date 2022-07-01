const airCraftSeatModel = require("../models/airCraftSeatModel");

const addAirCraftSeat = async (req, res) => {
    const airCraftSeatData = req.body
    await airCraftSeatModel.addAirCraftSeat(airCraftSeatData)
        .then(result => {
            console.log("AircraftSeat added!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN ADDING AN AIRCRAFTSeat: " + err);
            res.status(500).json({
                success: false,
                err
            })
        })
};

const deleteAirCraftSeat = async (req, res) => {
    const deleteId = req.params.id
    await airCraftSeatModel.deleteAirCraftSeat(deleteId)
        .then(result => {
            console.log("AircraftSeat deleted!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN DELETING AN AIRCRAFTSeat: " + err);
            res.status(500).json({
                success: false,
                err
            })
        })
};

const updateAirCraftSeat = async (req, res) => {
    const updateId = req.params.id
    const aircraftSeatData = req.body
    await airCraftSeatModel.updateAirCraftSeat(updateId, aircraftSeatData)
        .then(result => {
            console.log("AircraftSeat updated!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN UPDATING AN AIRCRAFTSeat: " + err);
            res.status(500).json({
                success: false,
                err
            })
        })
};

module.exports = {
    addAirCraftSeat,
    deleteAirCraftSeat,
    updateAirCraftSeat
}