

const logoutHandler = (req,res)=>{
    //need to delete the application on client also
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); //no content to send
    const refreshToken = cookies.jwt;

    //chech whether refreshZToken in the database
    //if there is a record then set refreshToken to '';

    res.clearCookie('jwt',{httpOnly:true});  // for https we need to pass secure: true
    res.sendStatus(204);
}

module.exports = logoutHandler;