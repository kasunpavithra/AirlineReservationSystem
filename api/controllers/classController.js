const classModel = require("../models/classModel");

const addClass = async (req, res) => {
    const classData = req.body
    await classModel.addClass(classData)
        .then(result => {
            console.log("class added!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN ADDING A class: " + err);
            res.status(500).json({
                success: false,
                err
            })
        })
};

const deleteClass = async (req, res) => {
    const deleteId = req.params.id
    await classModel.deleteClass(deleteId)
        .then(result => {
            console.log("class deleted!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN DELETING A class: " + err);
            res.status(500).json({
                success: false,
                err
            })
        })
};

const updateClass = async (req, res) => {
    const updateId = req.params.id
    const classData = req.body
    await classModel.updateClass(updateId, classData)
        .then(result => {
            console.log("class updated!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN UPDATING A class: " + err);
            res.status(500).json({
                success: false,
                err
            })
        })
};

module.exports = {
    addClass,
    deleteClass,
    updateClass
}