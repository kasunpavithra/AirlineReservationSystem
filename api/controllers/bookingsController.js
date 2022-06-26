const bookingsModel = require("../models/bookingsModel");

const getRegisteredBooking = async(req,res)=>{
    await bookingsModel.getRegisteredBooking(parseInt(req.params.id))
    .then(result =>{
      res.json({
        success: true,
        result
      })
    })
    .catch(err => {
      console.log("ERROR WHEN FETCHING BOOKINGS: "+err);
      res.status(500).json({
          success: false,
          err
      })
  })
}

const getGuestBooking = async(req,res)=>{
  await bookingsModel.getGuestBooking(parseInt(req.params.id))
  .then(result =>{
    res.json({
      success: true,
      result
    })
  })
  .catch(err => {
    console.log("ERROR WHEN FETCHING BOOKINGS: "+err);
    res.json({
        success: false,
        err
    })
})
}

module.exports = {getRegisteredBooking,getGuestBooking};