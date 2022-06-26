const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { getUserByEmail } = require('../models/authModel');


const loginHandler = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    await getUserByEmail(email).then(result => {
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, response) => {
                if (err) {
                    return res.status(500).json({ err: err });
                }
                if (response) {
                    const id = result[0].userID;
                    const accessToken = jwt.sign({
                        "userInfo": {
                            "id": id,
                            "role": 5000   //5000 for registered users
                        }
                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 300 });
                    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

                    //here you need to store this refreshtoken in a database

                    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                    res.send({ auth: true, token: accessToken, result: result[0] });
                } else res.status(401).json({ auth: false });
            });
        }
        else {
            return res.sendStatus(401);
        }
    }).catch(err => {
        console.log("ERROR WHILE GETTING USER BY EMAIL : " + err);
        return res.status(500).json({ err: err });
    });

}

module.exports = loginHandler;