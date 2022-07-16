import SeatGrid from "../../../components/SeatGrid/SeatGrid";
import { useLocation } from "react-router";
import { useEffect } from "react";
// import axios from "../../../../services/HttpServices";
import axios from "../../../api/axios";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import "./style.css";
import { useRef } from "react";
import Swal from "sweetalert2";
import Layout from "../../Navbar/Layout/Layout";

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
              const maxX = Math.max(...allseats.map(e=>e?.xCord));
              const maxY = Math.max(...allseats.map(e=>e?.yCord));
              const rowData = getInitialGrid(maxX+1,maxY+1);
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
                obj.number = element?.yCord;
                obj.orientation = "east";
                rowData[element.xCord][element.yCord]=obj;
                // if (rowData[element.xCord]) rowData[element.xCord].push(obj);
                // else rowData[element.xCord] = [obj];
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

  const getInitialGrid = (maxrows,maxCols)=>{
    const out = []
    for (let x = 0; x < maxrows; x++) {
      var newRow = []
      for (let y = 0; y < maxCols; y++) {
        newRow.push(null);
        
      }
      out.push(newRow);
    }
    return out;
  }

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

  const background =  "https://wallpapercave.com/wp/wp4128800.jpg";
  return (<> <Layout/>
    <div style={{backgroundImage: `url(${background})`,backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', height:"800px",marginTop:"50px"}}>
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
    </div>
    </>
  );
};

export default BookSeat;
