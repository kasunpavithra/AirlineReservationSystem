const siteModel = require("../models/siteModel");
// const index = (req, res) => {
//     console.log(req.body.foo);
//     res.render('index', { viewTitle: 'Home' });
// };
// const about = (req, res) => {
//     res.render('about', {
//         viewTitle: 'About-us'
//     })
// };
const getUsers = (req, res) => {
  siteModel.getUsers((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some errors occured while recieving",
      });
    } else {
      data.forEach((element) => {
        console.log(element.name);
      });
      // res.render('users', { data })
      res.send(data);
      // return data;
    }
  });
};

// const loginUser = (req, res) => {
//   const username = req.body.name;
//   const password = req.body.password;

//   let sql = "select * from student where name=?";
//   db.query(sql, [username], (err, result) => {
//     if (err) {
//       console.log("error: ", err);
//       res.send({ err: err });
//     } else {
//       if (result) {
//         res.send(result);
//         // console.log(result);
//       } else {
//         res.send({ message: "Wrong username" });
//       }
//     }
//   });
// };

// const addUser = (req, res) => {
//     console.log(req.params['id']);
//     res.send(req.params.id);
// }

module.exports = {
  // index,
  // about,
  getUsers,
//   loginUser,
  // addUser
};
