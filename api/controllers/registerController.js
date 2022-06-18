const siteModel = require("../models/registerModel");
// const CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt');
const { json } = require("express");

const registerUser = async (req, res) => {
    const saltRounds = 9;
    bcrypt.hash(req.body["password"], saltRounds, async (err, hash) => {
        if (err) {
            res.json({success:false,err:err.message});
        }
        const userInfo = { ...(req.body), ["password"]: hash };

        try {
            const success = await siteModel.registerUser(userInfo);
            if (success) res.json({success:true})
        }
        catch (err) {
            res.json({success:false,err:err.message});
        }

    });

}

module.exports = {
    registerUser
}