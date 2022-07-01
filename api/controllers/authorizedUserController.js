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
        res.status(500).json({
            success: false,
            err
        })
    })
}

const get_only_deleted_authorized_users = async (req, res) => {
    await authorizedUserModel.get_only_deleted_authorized_users()
    .then(result => {
        res.json({
            success: true,
            result
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            err
        })
    })
}

const get_only_active_authorized_users = async (req, res) => {
    await authorizedUserModel.get_only_active_authorized_users()
    .then(result => {
        res.json({
            success: true,
            result
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            err
        })
    })
}

const get_authorized_user = async (req, res) => {
    const userID = req.params.id
    await authorizedUserModel.get_authorized_user(userID)
    .then(result => {
        res.json({
            success: true,
            result
        })
    })
    .catch(err => {
        res.status(500).json({
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
        res.status(500).json({
            success: false,
            err
        })
    })
}

const update_authorized_user = async (req, res) => {
    const userData = req.body
    await authorizedUserModel.update_authorized_user(userData)
    .then(result => {
        console.log("Authorized user updated!")
        res.json({
            success: true,
            result 
        })
    })
    .catch(err => {
        console.log("ERROR WHEN UPDATING AN AUTHORIZED USER: "+err);
        res.status(500).json({
            success: false,
            err
        })
    })
}

const register_authorized_users = async (req, res) => {
    const userData = req.body
    await authorizedUserModel.register_authorized_users(userData)
    .then(result => {
        console.log("Authorized user updated!")
        res.json({
            success: true,
            result 
        })
    })
    .catch(err => {
        console.log("ERROR WHEN UPDATING AN AUTHORIZED USER: "+err);
        res.status(500).json({
            success: false,
            err
        })
    })
}

const get_total_authorized_users = async (req, res) => {
    await authorizedUserModel.get_total_authorized_users()
    .then(result => {
        res.json({
            success: true,
            result 
        })
    })
    .catch(err => {
        console.log("ERROR WHEN GETTING TOTAL AUTHORIZED USERS: "+err);
        res.status(500).json({
            success: false,
            err
        })
    })
}

module.exports = {
    get_all_authorized_users,
    delete_authorized_users_by_id,
    update_authorized_user,
    register_authorized_users,
    get_authorized_user,
    get_only_active_authorized_users,
    get_only_deleted_authorized_users,
    get_total_authorized_users
}