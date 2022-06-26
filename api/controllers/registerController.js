const siteModel = require("../models/registerModel");
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const saltRounds = 9;
    bcrypt.hash(req.body["password"], saltRounds, async (err, hash) => {
        if (err) {
            res.status(500).json({success:false,err:err.message});
        }
        const userInfo = { ...(req.body), ["password"]: hash };

        try {
            const success = await siteModel.registerUser(userInfo);
            if (success) res.status(201).json({success:true})
        }
        catch (err) {
            res.status(500).json({success:false,err:err.message});
        }

    });

}

module.exports = {
    registerUser
}