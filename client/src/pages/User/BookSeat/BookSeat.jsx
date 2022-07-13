import SeatGrid from "../../../components/SeatGrid/SeatGrid";
import { useLocation } from "react-router";

import { useEffect } from "react";
import axios from "../../../api/axios";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import "./style.css";
import { useRef } from "react";
import Swal from "sweetalert2";

const GET_BOOKED_SEATS_URL = "/api/bookings/getBookedseatsByFlight/";
const GET_ALL_SEATS_URL = "/api/airCraftSeat/getSeatsByflightID/";

const BookSeat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const errRef = useRef();

  try {
    if (localStorage.getItem("AccessToken")) {
      var registeredUserID = jwtDecode(localStorage.getItem("AccessToken"))
        .userInfo.id;
      var guestUserID = null;
    } else {
      var registeredUserID = null;
      var guestUserID = location.state.guestUserID;
    }
  } catch (err) {
    throw err;
  }

  useEffect(() => {
    console.log("In bookSeat:", location.state);
    const getAllSeats = async () => {
      await axios
        .get(GET_ALL_SEATS_URL + location.state.flightID)
        .then(async (result1) => {
          await axios
            .get(GET_BOOKED_SEATS_URL + location.state.flightID)
            .then((result2) => {
              const allseats = result1.data.result;
              const bookedSeats = result2.data.result;
              console.log(allseats);
              const rowData = [];
              var reservedSeatCount = 0;
              allseats.forEach((element) => {
                const obj = {};
                obj.id = element?.airCraftseatID;
                if (
                  bookedSeats.includes(element.airCraftseatID) ||
                  element.classID != parseInt(location.state.category)
                ) {
                  obj.isReserved = true;
                  reservedSeatCount++;
                }
                obj.number = element?.xCord;
                obj.orientation = "east";
                if (rowData[element.yCord]) rowData[element.yCord].push(obj);
                else rowData[element.yCord] = [obj];
              });
              if (
                allseats.length - reservedSeatCount <
                parseInt(location.state.adultCount) +
                  parseInt(location.state.childCount)
              ) {
                informUnavailability();
              }
              setRows(rowData);
              setLoading(false);
            });
        });
    };

    getAllSeats();
  }, []);

  const informUnavailability = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "We're sorry! The required seat count is unavailable. Please Select another flight or seat count!",
    }).then(() => {
      registeredUserID
        ? navigate(-1, { state: { unavailableSeatCount: true } })
        : navigate(-2, { state: { unavailableSeatCount: true } });
    });
  };

  return (
    <>
      <body className="bookseat-body">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        {loading && <p>Loading...</p>}
        {rows && (registeredUserID || guestUserID) && (
          <SeatGrid
            rows={rows}
            childCount={location.state.childCount}
            adultCount={location.state.adultCount}
            flightID={location.state.flightID}
            airCraftID={location.state.airCraftID}
            registeredUserID={registeredUserID}
            guestUserID={guestUserID}
            classID={location.state.category}
            navigate={navigate}
            errHandler={[errMsg, setErrMsg]}
          />
        )}
      </body>
    </>
  );
};

export default BookSeat;
