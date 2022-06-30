const classPriceModel = require("../models/classPriceModel");

const addClassPrice = async (req, res) => {
    await classPriceModel
        .addClassPrice(req.body)
        .then((result) => {
            res.status(201).json({     //201 for created
                success: true,
                result,
            });
        })
        .catch((err) => {
            if(err?.message==="BadRequest") return res.status(400).json({        //400 bad request
                success: false,
                err,
            });
            res.status(500).json({        //500 for server err
                success: false,
                err,
            });
        });
};

const updateClassPrice = async (req, res) => {
    await classPriceModel
        .addClassPrice(req.body)
        .then((result) => {
            res.status(201).json({     //201 for created
                success: true,
                result,
            });
        })
        .catch((err) => {
            if(err?.message==="BadRequest") return res.status(400).json({        //400 bad request
                success: false,
                err,
            });
            res.status(500).json({        //500 for server err
                success: false,
                err,
            });
        });
};

const getClassPriceBYIDs = async (req, res) => {
    await classPriceModel
        .getClassPriceBYIDs(parseInt(req.params.RouteID),parseInt(req.params.classID))
        .then((result) => {
            res.status(200).json({
                success: true,
                result,
            });
        })
        .catch((err) => {
            res.status(500).json({        //500 for server err
                success: false,
                err,
            });
        });
};
module.exports = {addClassPrice,updateClassPrice,getClassPriceBYIDs}