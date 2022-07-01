const userPhoneModel = require("../models/userPhoneModel");

const addUserPhone = async (req, res) => {
    const userPhoneData = req.body
    await userPhoneModel.addUserPhone(userPhoneData)
        .then(result => {
            console.log("userPhone added!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN ADDING A userPhone: " + err);
            res.status(500).json({
                success: false,
                err
            })
        })
};

const deleteUserPhone = async (req, res) => {
    const deleteId = req.params.id
    await userPhoneModel.deleteUserPhone(deleteId)
        .then(result => {
            console.log("userPhone deleted!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN DELETING A userPhone: " + err);
            res.status(500).json({
                success: false,
                err
            })
        })
};

const updateUserPhone = async (req, res) => {
    const updateId = req.params.id
    const userPhoneData = req.body
    await userPhoneModel.updateUserPhone(updateId, userPhoneData)
        .then(result => {
            console.log("userPhone updated!")
            res.json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN UPDATING A userPhone: " + err);
            res.status(500).json({
                success: false,
                err
            })
        })
};

module.exports = {
    addUserPhone,
    deleteUserPhone,
    updateUserPhone
}