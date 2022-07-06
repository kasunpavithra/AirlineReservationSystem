const discountModel = require("../models/discountModel");

const getAllDiscounts = async (req, res) => {
    await discountModel.getAllDiscounts()
        .then(result => {
            console.log("discount fetched!")
            res.status(200).json({
                success: true,
                result
            })
        })
        .catch(err => {
            console.log("ERROR WHEN GETTING ALL discount: " + err);
            res.status(500).json({
                success: false,
                err
            })
        })
};

module.exports = {
    getAllDiscounts,
}