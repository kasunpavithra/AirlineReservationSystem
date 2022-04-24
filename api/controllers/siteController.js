const siteModel = require('../models/siteModel');
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
                message: err.message || 'Some errors occured while recieving'
            });
        } else {
            data.forEach(element => {
                console.log(element.name);
            });
            // res.render('users', { data })
            res.send(data);
            // return data;
        }
    })
}

const loginUser= (req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

     siteModel.loginUser((err, data) => {
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
     },{username,password});
}

// const addUser = (req, res) => {
//     console.log(req.params['id']);
//     res.send(req.params.id);
// }

module.exports = {
  // index,
  // about,
  getUsers,
  loginUser,
  // addUser
};