const registeredCustomerModel = require("../models/registeredCustomerModel")

const get_all_customers = async (req, res) => {
    await registeredCustomerModel.get_all_customers()
    .then(result => {
        res.json({
            success: true,
            result 
        })
    })
    .catch(err => {
        console.log("ERROR WHEN FETCHING ALL CUSTOMERS: "+err);
        res.status(500).json({
            success: false,
            err
        })
    })
}

const get_only_active_customers = async (req, res) => {
    await registeredCustomerModel.get_only_active_customers()
    .then(result => {
        res.json({
            success: true,
            result 
        })
    })
    .catch(err => {
        console.log("ERROR WHEN FETCHING ONLY-ACTIVE CUSTOMERS: "+err);
        res.status(500).json({
            success: false,
            err
        })
    })
}

const get_only_deleted_customers = async (req, res) => {
    await registeredCustomerModel.get_only_deleted_customers()
    .then(result => {
        res.json({
            success: true,
            result 
        })
    })
    .catch(err => {
        console.log("ERROR WHEN FETCHING ONLY-DELETED CUSTOMERS: "+err);
        res.status(500).json({
            success: false,
            err
        })
    })
}

const delete_customers_by_id = async (req, res) => {
    const userID = req.params.id
    await registeredCustomerModel.delete_customers_by_id(userID)
    .then(result => {
        console.log("Registered customer deleted!")
        res.json({
            success: true,
            result 
        })
    })
    .catch(err => {
        console.log("ERROR WHEN DELETING A CUSTOMER BY ID: "+err);
        res.status(500).json({
            success: false,
            err
        })
    })
}

const update_customer = async (req, res) => {
    const userData=req.body
    await registeredCustomerModel.update_customer(userData)
    .then(result => {
        console.log("Registered customer updated!")
        res.json({
            success: true,
            result 
        })
    })
    .catch(err => {
        console.log("ERROR WHEN UPDATING A CUSTOMER: "+err);
        res.status(500).json({
            success: false,
            err
        })
    })
}

const update_customer_by_customer= async (req, res) => {
    var userData=req.body
    userData={...userData,'Image': req.file}
    console.log(userData)
    await registeredCustomerModel.update_customer_by_customer(userData)
    .then(result => {
        console.log("Registered customer updated!")
        res.json({
            success: true,
            result 
        })
    })
    .catch(err => {
        console.log("ERROR WHEN UPDATING A CUSTOMER: "+err);
        res.status(500).json({
            success: false,
            err
        })
    })
}

const get_customer_by_id = async (req, res) => {

    const userID = req.params.id
    await registeredCustomerModel.get_customer_by_id(userID)
    .then(result => {
        res.json({
            success: true,
            result 
        })
    })
    .catch(err => {
        console.log("ERROR WHEN FETCHING THE CUSTOMERS BY ID: "+err);
        res.status(500).json({
            success: false,
            err
        })
    })
}

const register_customer = async (req, res) => {
    const userData = req.body
    await registeredCustomerModel.register_customer(userData)
    .then(result => {
        console.log("Registered customer Added successfully!")
        res.json({
            success: true,
            result 
        })
    })
    .catch(err => {
        console.log("ERROR WHEN ADDING A CUSTOMER: "+err);
        res.status(500).json({
            success: false,
            err
        })
    })
}

const get_total_registered_customers = async (req, res) => {
    await registeredCustomerModel.get_total_registered_customers()
    .then(result => {
        res.json({
            success: true,
            result 
        })
    })
    .catch(err => {
        console.log("ERROR WHEN GETTING TOTAL CUSTOMERS: "+err);
        res.status(500).json({
            success: false,
            err
        })
    })
}

module.exports = {
    get_all_customers,
    delete_customers_by_id,
    update_customer,
    update_customer_by_customer,
    get_customer_by_id,
    register_customer,
    get_only_active_customers,
    get_only_deleted_customers,
    get_total_registered_customers
}