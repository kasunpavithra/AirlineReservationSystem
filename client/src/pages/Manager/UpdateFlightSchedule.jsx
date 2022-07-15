import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import FlightDetail from "./FlightDetail";
import DatePicker from "react-datepicker";
function UpdateFlightSchedule() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [date, setDate] = useState(new Date().getDate());
  const [details, setDetails] = useState({});
  const [searchDate, setSearchDate] = useState(
    [
      new Date().getFullYear(),
      new Date().getMonth().toString().length === 2
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1),
      new Date().getDate().toString().length === 2
        ? new Date().getDate().toString()
        : "0" + new Date().getDate().toString(),
    ].join("-")
  );
  useEffect(() => {
    const url =
      "http://localhost:3001/api/flights/year/" +
      year +
      "/month/" +
      (month + 1) +
      "/date/" +
      date +
      "";
    axios
      .get(url)
      .then((result) => {
        result.data.result.map((obj) => {
          if (obj.endTimeDate === null) {
            setDetails((value) => ({ ...value, [obj.flightID]: obj }));
          }
        });
      })
      .catch((err) => {});
  }, []);
  const Background =
    "https://thumbs.dreamstime.com/b/white-model-plane-airplane-yellow-background-top-view-flat-lay-travel-vacation-concept-188196256.jpg";

  return (
    <div style={{ backgroundImage: `url(${Background})` }}>
      <div style={{ textAlign: "center" }}>
        <h1>UPDATE FLIGHT SCHEDULE</h1>
      </div>
      <div className="" style={{alignItems:'center',justifyContent:'center',display:'grid'}}>
        <Form.Control
          aria-label="Default select example"
          className=""
          type="date"
          value={searchDate}
          min={[
            new Date().getFullYear(),
            new Date().getMonth().toString().length === 2
              ? new Date().getMonth() + 1
              : "0" + (new Date().getMonth() + 1),
            new Date().getDate().toString().length === 2
              ? new Date().getDate().toString()
              : "0" + new Date().getDate().toString(),
          ].join("-")}
          max={[
            new Date().getFullYear(),
            new Date().getMonth().toString().length === 2
              ? new Date().getMonth() + 1
              : "0" + (new Date().getMonth() + 1),
            (new Date().getDate() + 7).toString().length === 2
              ? (new Date().getDate() + 7).toString()
              : "0" + (new Date().getDate() + 7).toString(),
          ].join("-")}
          onChange={async (e) => {
            setSearchDate(e.target.value);
            let year = e.target.value.split("-")[0];
            let month = e.target.value.split("-")[1];
            let date = e.target.value.split("-")[2];
            setDetails({});
            await axios
              .get(
                "http://localhost:3001/api/flights/year/" +
                  year +
                  "/month/" +
                  month +
                  "/date/" +
                  date +
                  ""
              )
              .then((result) => {
                console.log(result);
                result.data.result.map((obj) => {
                  if (obj.endTimeDate === null) {
                    setDetails((value) => ({ ...value, [obj.flightID]: obj }));
                  }
                });
              })
              .catch((err) => {});
          }}
        />
      </div>
      {Object.entries(details).map(([key, val]) => (
        <Row>
          <FlightDetail value={val} />
        </Row>
      ))}
    </div>
  );
}

export default UpdateFlightSchedule;
