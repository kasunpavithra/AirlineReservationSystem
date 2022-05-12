const siteModel = require("../models/registerModel");
// const CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const saltRounds = 9;
    // const hash = bcrypt.hash(req.body["password"], saltRounds, (err, hash) => {
    //     if(err) return false;
    //     return;
    //   });
    // console.log(hash);
    bcrypt.hash(req.body["password"], saltRounds,async (err, hash) => {
        if(err){
            res.status(500).send({success:false})
        }
        const userInfo = { ...(req.body), ["password"]: hash };
        const success = await siteModel.registerUser(userInfo);
        if (success) res.status(200).json({ success: true });
        else res.status(500).send({ success: false });
    });

}

module.exports = {
    registerUser
}