const siteModel = require("../models/registerModel");
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const saltRounds = 9;
    if (!req.body.password) return res.sendStatus(400);   //bad request

    bcrypt.hash(req.body["password"], saltRounds, async (err, hash) => {
        if (err) {
            res.status(500).json({ success: false, err: err.message });
        }
        const userInfo = { ...(req.body), ["password"]: hash };

        try {
            const success = await siteModel.registerUser(userInfo);
            if (success) res.status(201).json({ success: true })
        }
        catch (err) {
            if (err.message === "EmailAlreadyExists") return res.status(403).json({ success: false, err: err.message });   //email has already registered
            if(err.message === "BadRequest") return res.status(400).json({ success: false, err: err.message });
            res.status(500).json({ success: false, err: err.message });
        }

    });

}

module.exports = {
    registerUser
}