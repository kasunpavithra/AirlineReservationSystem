const express = require("express");
const router = express.Router();
const db = require("../db/db");
const siteController = require("../controllers/siteController");
router
  // .get('/', siteController.index)
  // .get('/about', siteController.about)
  .get("/getUsers", siteController.getUsers)
  // .get('/submit/:id', siteController.addUser)
  //   .post("/login", siteController.loginUser);
  .post("/login", (req, res) => {
    const username = req.body.name;
    const password = req.body.password;

    let sql = "select * from student where name=?";
    db.query(sql, [username], (err, result) => {
      if (err) {
        console.log("error: ", err);
        res.send({err:err});
      } else {
        if(result){
            res.send(result);
            // console.log(result);
        }
        else{
            res.send({message:"Wrong username"});
        }
      }
    });
  });

module.exports = router;
