const db = require("../db/db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const loginHandler = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM registeredcustomer where email=?", email, (err, result) => {
        if (err) return res.status(500).json({ err: err });
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, response) => {
                if (err) {
                    return res.status(500).json({ err: err });
                }
                if (response) {
                    const id = result[0].userID;
                    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 });
                    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

                    //here you need to store this refreshtoken in a database

                    res.cookie('jwt', refreshToken,{ httpOnly:true , maxAge: 24*60*60*1000});
                    res.send({ auth: true, token: accessToken, result: result[0] });
                } else res.status(401).json({ auth: false });
            });
        }
        else {
            res.send({ success: false, message: "No such user" });
        }
    });
}

module.exports = loginHandler;