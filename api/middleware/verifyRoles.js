
const verifyRoles = (...allowdRoles)=>{
    return (req,res,next)=>{
        if(!req?.role) return res.sendStatus(401);   //unauthorizes 
        const rolesArray = [...allowdRoles];
        console.log(rolesArray);
        console.log(req.role);
        if(!rolesArray.includes(req.role)) return res.sendStatus(401)  //unauthorized
        next();

    }
}

module.exports = verifyRoles;