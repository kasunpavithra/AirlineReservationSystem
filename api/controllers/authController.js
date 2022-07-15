const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { getUserByEmail, getAuthUserByEmail,updateRefreshTokenAndLoggedAt} = require('../models/authModel');


const loginHandler = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) return res.sendStatus(400); //bad request

    try {
        var result;
        (req.body.isAuthorizedUser) ? result = await getAuthUserByEmail(email) : result = await getUserByEmail(email);
    } catch (err) {
        console.log("ERROR WHILE GETTING USER BY EMAIL : " + err);
        return res.status(500).json({ err: err });
    }

    if (result?.length > 0) {

        let role = 5000; // registered user
        if (req.body.isAuthorizedUser) {
            (result[0].type==1) ? role = 5003 : role = 5002;       //manager = 5003 and admin role=5002   manager=1 in db admin=0
        }

        bcrypt.compare(password, result[0].password, (err, response) => {
            if (err) {
                return res.status(500).json({ err: err });
            }
            if (response) {
                const id = result[0].userID;
                const accessToken = jwt.sign({
                    "userInfo": {
                        "id": id,
                        "role": role   //5000 for registered users
                    }
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s'});
                const refreshToken = jwt.sign({ id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

                //here you need to store this refreshtoken in a database

                var result1=""
                  try{
                    const update=async()=>{
                        console.log('hello')
                        result1= await updateRefreshTokenAndLoggedAt(refreshToken,id,role)
                    }
                    update();
                   
                }catch(err){
                    console.log(err)
                }
                
                console.log(result1)

                res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.send({ auth: true, accessToken: accessToken, result: result[0] });
            } else res.status(401).json({ auth: false });
        });
    }
    else {
        return res.sendStatus(401);
    }


}

module.exports = loginHandler;