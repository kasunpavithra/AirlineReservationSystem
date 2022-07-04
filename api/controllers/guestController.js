const guestModel = require("../models/guestModel");

const guestCreate = async (req, res) => {
    await guestModel
        .guestCreate(req.body)
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


module.exports ={guestCreate}