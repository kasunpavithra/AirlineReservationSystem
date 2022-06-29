const airCraftTypeModel = require("../models/airCraftTypeModel");

const addAirCraftType = async (req, res) => {
    const airCraftTypeData = req.body
    await airCraftTypeModel.addAirCraftType(airCraftTypeData)
        .then(result => {
            console.log("AircraftType added!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN ADDING AN AIRCRAFTTYPE: " + err);
            res.json({
                success: false,
                err
            })
        })
};

const deleteAirCraftType = async (req, res) => {
    const deleteId = req.params.id
    await airCraftTypeModel.deleteAirCraftType(deleteId)
        .then(result => {
            console.log("AircraftType deleted!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN DELETING AN AIRCRAFTTYPE: " + err);
            res.json({
                success: false,
                err
            })
        })
};

const updateAirCraftType = async (req, res) => {
    const updateId = req.params.id
    const aircraftTypeData = req.body
    await airCraftTypeModel.updateAirCraftType(updateId, aircraftTypeData)
        .then(result => {
            console.log("AircraftType updated!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN UPDATING AN AIRCRAFTTYPE: " + err);
            res.json({
                success: false,
                err
            })
        })
};

module.exports = {
    addAirCraftType,
    deleteAirCraftType,
    updateAirCraftType
}