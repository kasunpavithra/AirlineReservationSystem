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

module.exports = {
    get_all_customers
}