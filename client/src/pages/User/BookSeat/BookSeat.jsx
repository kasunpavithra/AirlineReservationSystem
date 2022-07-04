import SeatGrid from "../../../components/SeatGrid/SeatGrid";
import { useLocation } from "react-router";

import { useEffect } from "react";
import axios from "../../../api/axios";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import "./style.css";
import { useRef } from "react";

const GET_BOOKED_SEATS_URL = "/api/bookings/getBookedseatsByFlight/";
const GET_ALL_SEATS_URL = "/api/airCraftSeat/getSeatsByflightID/";

const BookSeat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  const errRef = useRef();

  try {
    if(localStorage.getItem("AccessToken")){
      var registeredUserID = jwtDecode(localStorage.getItem("AccessToken"))
      .userInfo.id;
    }
    
    var guestUserID = null;
  } catch (err) {
    throw err;
  }

  useEffect(() => {
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
              allseats.forEach((element) => {
                const obj = {};
                obj.id = element?.airCraftseatID;
                if (bookedSeats.includes(element.airCraftseatID))
                  obj.isReserved = true;
                if (element.classID != parseInt(location.state.category))
                  obj.isReserved = true;
                obj.number = element?.xCord;
                if (rowData[element.yCord]) rowData[element.yCord].push(obj);
                else rowData[element.yCord] = [obj];
              });
              setRows(rowData);
              setLoading(false);
            });
        });
    };

    getAllSeats();
  }, []);



  return (
    <>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      {loading && <p>Loading...</p>}
      {rows && registeredUserID && (
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
          errHandler ={[errMsg,setErrMsg]}
        />
      )}

    </>
  );
};

export default BookSeat;
