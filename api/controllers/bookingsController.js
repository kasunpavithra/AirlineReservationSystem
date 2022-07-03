const bookingsModel = require("../models/bookingsModel");

const getRegisteredBooking = async (req, res) => {
  await bookingsModel
    .getRegisteredBooking(parseInt(req.params.id))
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      console.log("ERROR WHEN FETCHING BOOKINGS: " + err);
      res.status(500).json({
        success: false,
        err,
      });
    });
};

const getGuestBooking = async (req, res) => {
  await bookingsModel
    .getGuestBooking(parseInt(req.params.id))
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      console.log("ERROR WHEN FETCHING BOOKINGS: " + err);
      res.json({
        success: false,
        err,
      });
    });
};

// const addBooking = async (req, res) => {
//   await bookingsModel
//     .addBooking(req)
//     .then((result) => {
//       res.json({
//         success: true,
//         result,
//       });
//     })
//     .catch((err) => {
//       console.log("ERROR WHEN CREATING BOOKING: " + err);
//       res.json({
//         success: false,
//         err,
//       });
//     });
// };

const cancelBooking = async (req, res) => {
  await bookingsModel
    .cancelBooking(req)
    .then((result) => {
      res.json({
        success: true,
        result,
      });
    })
    .catch((err) => {
      console.log("ERROR WHEN CANCELLING BOOKING: " + err);
      res.json({
        success: false,
        err,
      });
    });
};


const getBookedseatsByFlight = async (req, res) => {
  await bookingsModel
      .getBookedseatsByFlight(parseInt(req.params.id))
      .then((result) => {
        const newArr=[];
        result.forEach(element => {
          newArr.push(element.airCraftseatID);
        });
        res.json({result:newArr});

      })
      .catch((err) => {
          res.status(500).json({        //500 for server err
              success: false,
              err,
          });
      });
};


const addBooking = async (req, res) => {
  await bookingsModel
      .addBooking(req.body)
      .then((result) => {
          res.status(201).json({     //201 for created
              success: true,
              result,
          });
      })
      .catch((err) => {
          if(err?.message==="BadRequest") return res.status(400).json({        //400 bad request
              success: false,
              err,
          });
          res.status(500).json({        //500 for server err
              success: false,
              err,
          });
      });
};

module.exports = {
  getRegisteredBooking,
  getGuestBooking,
  getBookedseatsByFlight,
  addBooking,
  cancelBooking,
};
