const { updateRefreshToken,checkTokenFromDatabase} = require('../models/authModel');


const logoutHandler = async(req,res)=>{

    //need to delete the application on client also
    const cookies = req.cookies
    console.log(req.params)
    if (!cookies?.jwt) return res.sendStatus(204); //no content to send
    const refreshToken = cookies.jwt;

    // chech whether refreshZToken in the database

    const auth=await checkTokenFromDatabase(refreshToken,req.params.role);
    if (!auth) {
        return res.status(404).json({ "message": `User does not exist...` });
    }
    //if there is a record then set refreshToken to '';
    const result = await updateRefreshToken(refreshToken,req.params.role);

    console.log(result)

    res.clearCookie('jwt',{httpOnly:true});  // for https we need to pass secure: true
    res.sendStatus(204);
}

module.exports = logoutHandler;