import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Row } from "react-bootstrap";
import FlightDetail from "./FlightDetail";

function UpdateFlightSchedule() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [date, setDate] = useState(new Date().getDate());
  const [details, setDetails] = useState({});
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

      {Object.entries(details).map(([key, val]) => (
        <Row>
          <FlightDetail value={val} />
        </Row>
      ))}
    </div>
  );
}

export default UpdateFlightSchedule;
