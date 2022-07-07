const airCraftTypeModel = require("../models/airCraftTypeModel");

const addAirCraftType = async (req, res) => {
    var airCraftTypeData=req.body
    airCraftTypeData={... airCraftTypeData,'Image': req.file}
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

const getAllAirCraftTypes = async (req, res) => {
    // var airCraftTypeData=req.body
    // airCraftTypeData={... airCraftTypeData,'Image': req.file}
    await airCraftTypeModel.getAllAirCraftTypes()
        .then(result => {
            console.log("AircraftType Getting Successfull!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN TAKING ALL AIRCRAFTTYPES: " + err);
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
    console.log('fdsf')
    var airCraftTypeData=req.body
    airCraftTypeData={... airCraftTypeData,'Image': req.file}
    await airCraftTypeModel.updateAirCraftType(airCraftTypeData)
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



const  getAirCraftType = async (req, res) => {
    const aircrafttypeId = req.params.id
    await airCraftTypeModel.getAirCraftType(aircrafttypeId)
        .then(result => {
            console.log("AircraftType Reached!")
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
    updateAirCraftType,
    getAllAirCraftTypes,
    getAirCraftType
}