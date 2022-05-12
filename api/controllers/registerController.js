const siteModel = require("../models/registerModel");
// const CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const saltRounds = 9;
    bcrypt.hash(req.body["password"], saltRounds,async (err, hash) => {
        if(err){
            res.status(500).send({success:false,err:err})
        }
        const userInfo = { ...(req.body), ["password"]: hash };
        const success = await siteModel.registerUser(userInfo);
        if (success===true) res.status(200).json({ success: true });
        else res.send({ success: false, err:success });
    });

}

module.exports = {
    registerUser
}