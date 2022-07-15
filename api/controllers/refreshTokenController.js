const db = require("../db/db");
const jwt = require("jsonwebtoken");
const { updateRefreshToken,checkTokenFromDatabase} = require('../models/authModel');


const refreshTokenHandler =async (req, res) => {
    const cookies = req.cookies
    console.log(cookies)
    if (!cookies?.jwt) return res.sendStatus(401);
    // console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const auth=await checkTokenFromDatabase(refreshToken,req.params.role);
    if (!auth) {
        console.log("invalid refresh token :", refresh_token);
        return res.status(403).json({ "message": "Invalid token" });
    }
    // here you need to check the wethear there is a refreshtoken in a database
    //if not return with statuscode 403
    //and also you need to get the role of the user


    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({
            "userInfo":{
                "id": decode.id,
                "role":parseInt(req.params.role)       //for now it is 5000 for registeredUsers
            }
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '60s'
        });
        return res.status(200).json({
            "message": "Refresh token successful",
            "access_token": accessToken,
        });
    });
}

module.exports = refreshTokenHandler;