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
        res.json({
            success: false,
            err
        })
    })
}

const delete_customers_by_id = async (req, res) => {
    const userID = req.params.id
    await registeredCustomerModel.delete_customers_by_id(userID)
    .then(result => {
        console.log("Registered  user deleted!")
        res.json({
            success: true,
            result 
        })
    })
    .catch(err => {
        console.log("ERROR WHEN DELETING A CUSTOMER BY ID: "+err);
        res.json({
            success: false,
            err
        })
    })
}

module.exports = {
    get_all_customers,
    delete_customers_by_id
}