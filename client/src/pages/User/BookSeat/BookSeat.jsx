import SeatGrid from "../../../components/SeatGrid/SeatGrid";
import { useLocation } from "react-router";
import { useEffect } from "react";
import axios from "../../../api/axios";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";

const GET_BOOKED_SEATS_URL = "/api/bookings/getBookedseatsByFlight/";
const GET_ALL_SEATS_URL = "/api/airCraftSeat/getSeatsByflightID/";
//hard coded values
const flightID = 1;
const maxSeats = 2;

const BookSeat = () => {
  const navigate  = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  try {
    var registeredUserID = jwtDecode(localStorage.getItem("AccessToken"))
      .userInfo.id;
    var guestUserID = null;
  } catch (err) {
    throw err;
  }

  useEffect(() => {
    const getAllSeats = async () => {
      await axios.get(GET_ALL_SEATS_URL + flightID).then(async (result1) => {
        await axios.get(GET_BOOKED_SEATS_URL + flightID).then((result2) => {
          const allseats = result1.data.result;
          const bookedSeats = result2.data.result;
          console.log(allseats);
          const rowData = [];
          allseats.forEach((element) => {
            const obj = {};
            obj.id = element?.airCraftseatID;
            if (bookedSeats.includes(element.airCraftseatID))
              obj.isReserved = true;
            if(element.classID!=parseInt(location.state.category)) obj.isReserved = true;
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
      {/* Child Count is : {location.state.childCount}
      Adult count is : {location.state.adultCount}
      Flight ID :{location.state.flightID}
      Category is : {location.state.category}
      AirCraft ID: {location.state.aircraftID} */}
      <h1>{location.state.category}</h1>
      <h1>{location.state.adultCount}</h1>
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
        />
      )}
    </>
  );
};

export default BookSeat;
