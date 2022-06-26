const db = require("../db/db");
const jwt = require("jsonwebtoken");


const refreshTokenHandler = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(401);
    // console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    // here you need to check the wethear there is a refreshtoken in a database
    //if not return with statuscode 403
    //and also you need to get the role of the user

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({
            "userInfo":{
                "id": decode.id,
                "role": 5000         //for now it is 5000 for registeredUsers
            }
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 300
        });
        res.send({ token: accessToken });
    });
}

module.exports = refreshTokenHandler;