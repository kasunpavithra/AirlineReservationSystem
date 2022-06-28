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

const deleteAirCraft = async (req, res) => {
    const deleteId = req.params.id
    await airCraftTypeModel.deleteAirCraft(deleteId)
        .then(result => {
            console.log("Aircraft deleted!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN DELETING AN AIRCRAFT: " + err);
            res.json({
                success: false,
                err
            })
        })
};

const updateAirCraft = async (req, res) => {
    const updateId = req.params.id
    const aircraftData = req.body
    await airCraftTypeModel.updateAirCraft(updateId, aircraftData)
        .then(result => {
            console.log("Aircraft updated!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN UPDATING AN AIRCRAFT: " + err);
            res.json({
                success: false,
                err
            })
        })
};

module.exports = {
    addAirCraftType
}