const levelModel = require("../models/levelModel");

const getAllLevels = async (req, res) => {
    await levelModel
        .getAllLevels()
        .then((result) => {
            res.json({
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

const addLevel = async (req, res) => {
    await levelModel
        .addLevel(req.body)
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


const updateLevel = async (req, res) => {
    await levelModel
        .updateLevel(req.body)
        .then((result) => {
            res.status(200).json({     
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

const deleteLevel = async (req, res) => {
    await levelModel
        .deleteLevel(parseInt(req.params.id))
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

module.exports ={getAllLevels,addLevel,deleteLevel,updateLevel}