const airportInfoModel = require("../models/airportInfoModel");

const addAirportInfo = async (req, res) => {
    await airportInfoModel
        .addAirportInfo(req.body)
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
            else if(err?.message==="AirportAlreadyExists") return res.status(403).json({        //400 bad request
                success: false,
                err,
            });
            res.status(500).json({        //500 for server err
                success: false,
                err,
            });
        });
};

module.exports = {addAirportInfo}