const authorizedUserModel = require("../models/authorizedUserModel")

const get_all_authorized_users = async (req, res) => {
    await authorizedUserModel.get_all_authorized_users()
    .then(result => {
        res.json({
            success: true,
            result
        })
    })
    .catch(err => {
        res.json({
            success: false,
            err
        })
    })
}

const delete_authorized_users_by_id = async (req, res) => {
    const userID = req.params.id
    await authorizedUserModel.delete_authorized_users_by_id(userID)
    .then(result => {
        res.json({
            success: true,
            result
        })
    })
    .catch(err => {
        res.json({
            success: false,
            err
        })
    })
}

module.exports = {
    get_all_authorized_users,
    delete_authorized_users_by_id
}