const router = require("express").Router();
const db = require("../db/db");
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");


router.post("/login", (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM registeredcustomer where email=?",email,(err,result)=>{
        if(err) res.send({err:err});
        if(result.length>0){
            bcrypt.compare(password,result[0].password, (err,response)=>{
                if(err){
                    res.send({err:err});
                }
                if(response){
                    const id = result[0].userID;
                    const token = jwt.sign({id},process.env.JWT_secret,{expiresIn:300});

                    res.send({auth: true, token:token,result:result});
                }else res.send({auth:false});
            });
        }
        else{
            res.send({success:false , message:"No such user"});
        }
    });
});

const verifyJWT = (req,res,next)=>{
    const token = req.headers["x-access-token"];
    if(!token) res.status(401).json("You're not Authenticated!");
    else{
        jwt.verify(token,process.env.JWT_secret, (err,decode)=>{
            if(err) res.status(403).json({auth:false ,message:"Invalid token!"});
            else{
                req.userID = decode.id;
                next();
            }
        });
    }
}

router.get("/checklogin",verifyJWT, (req,res)=>{
    res.send({auth:true});
})



module.exports = router;