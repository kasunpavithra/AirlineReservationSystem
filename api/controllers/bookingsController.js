const bookingsModel = require("../models/bookingsModel");

const getBooking = (req,res)=>{
    bookingsModel.getBooking(parseInt(req.params.id),(err,data)=>{
        if (err) {
            res.status(500).send({
              message: err.message || "Some errors occured while recieving",
            });
          }
        else{
            res.send(data);
        }
    });
    console.log(req.params.id);
    res.send({id:req.params.id});
}

module.exports = {getBooking};