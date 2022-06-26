import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import FlightCard from "./FlightCard";
import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
function FlightList(props) {
  const [originName, setOriginName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  // const [classDetails, setClassDetails] = useState({});
  const [dob, setdob] = useState("");
  const [highlight, setHighlight] = useState([new Date()]);
 
  // console.log(highlight)
  useEffect(() => {
    console.log("Flight List loading");
    setOriginName("");
    setDestinationName("");
    let highlight1 = [];

    Object.values(props).map((obj) =>
      Object.values(obj).map((ele) => highlight1.push(new Date(ele.dispatchTime)))
    );
    setHighlight(highlight1);
    // setClassDetails({});
  }, [props]);
  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex align-items-center justify-content-center">
          <div style={{ justifyContent: "center" }}>
            {originName !== "" ? (
              <h1>
                {originName}-{destinationName}
              </h1>
            ) : (
              ""
            )}
            {Object.values(props).map((obj) =>
              Object.values(obj).map((ele) => (
                <FlightCard
                  props={ele}
                  f1={setOriginName}
                  f2={setDestinationName}
                />
              ))
            )}
          </div>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          {/* <DatePicker
        className="form-control"
        selected={dob}
        placeholderText={"dd/mm/yyyy"}
        maxDate={new Date("09/09/2022")}
        minDate={new Date()}
        name="dob"
        highlightDates={highlight}
        required
      /> */}
          {/* <Calend /> */}
          <Calendar value={highlight} />
        </div>
      </div>
    </div>
  );
}

export default FlightList;
