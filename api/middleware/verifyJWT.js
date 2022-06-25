const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json("You're not Authenticated!");
    // console.log(authHeader);

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) res.status(403).json({ auth: false, message: "Invalid token!" });
        else {
            req.userID = decode.id;
            next();
        }
    });
}

module.exports = verifyJWT;