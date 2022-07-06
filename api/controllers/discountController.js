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

const addDiscount = async (req, res) => {
    const discountData = req.body

    await discountModel.addDiscount(discountData)
        .then(result => {
            console.log("discount added!")
            res.status(201).json({ //Created - status code 201
                success: true,
                result
            })
        })
        .catch(err => {
            if (err === "bad_request") {
                console.log("BAD REQUEST WHEN ADDING A discount: " + err);
                res.status(400).json({
                    success: false,
                    err
                })
            } else {
                console.log("ERROR WHEN ADDING A discount: " + err);
                res.status(500).json({
                    success: false,
                    err
                })
            }
        })
};

module.exports = {
    getAllDiscounts,
    addDiscount
}