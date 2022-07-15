import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { IoLocation } from "react-icons/io5";
import axios from "../../../services/HttpServices";
// import TimePicker from 'react-time-picker'

function StaticFlight(props) {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [airCraft, setairCraft] = useState({ airCrafts: [] });
  const [flightTime, setFlightTime] = useState();
  const [routeID, setRouteID] = useState(null);
  const [route, setRoute] = useState({
    routeID: "",
    originID: "",
    origin_name: "",
    destinationID: "",
    destination_name: "",
    time: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios("http://localhost:3001/api/aircraft/all");

      setairCraft({ airCrafts: data.result });
    };
    const routeData = props.routes;
    setRouteID(routeData.routeID);
    setRoute(routeData);
    fetchData();
  }, []);

  return (
    <div>
      {/* {JSON.stringify(route)} */}
      {/* <Form className="container4" onSubmit={submitForm}> */}
      <div className="container4 mt-5">
        <div className="row mt-3">
          <Col>
            <div className="col d-flex align-items-center justify-content-center">
              <label htmlFor="departure">From </label>
              <IoLocation size={30} />

              <Form.Control
                style={{ "font-family": "FontAwesome" }}
                type="text"
                name="departure"
                value={route.origin_name}
                placeholder="&#xf007;  Departure"
                readOnly
              />
            </div>
          </Col>
          <Col>
            <div className="col d-flex align-items-center justify-content-center">
              <label htmlFor="destination">To </label>
              <IoLocation size={30} />

              <Form.Control
                style={{ "font-family": "FontAwesome" }}
                type="text"
                name="destination"
                value={route.destination_name}
                placeholder="Destination"
                readOnly
              />
            </div>
          </Col>
          <Col>
            <div>
              <Form.Control
                style={{ "font-family": "FontAwesome" }}
                type="time"
                name="time"
                value={flightTime}
                placeholder="Destination"
                onChange={(e) => {
                  setFlightTime(e.target.value);

                  props.func((values) => ({
                    ...values,
                    [routeID]: { ...route, time: e.target.value },
                  }));
                  setRoute((value) => ({ ...value, time: e.target.value }));
                }}
                required
              />

              {/* Add more flights on same route with aircrafts */}
            </div>
          </Col>
          <Col>
            <div>
              <Form.Select
                aria-label="Default select example"
                name="aircraft"
                onChange={(e) => {
                  props.func((values) => ({
                    ...values,
                    [routeID]: { ...route, airCraftID: e.target.value },
                  }));
                  setRoute((value) => ({
                    ...value,
                    airCraftID: e.target.value,
                  }));
                }}
                required
              >
                <option value={''}>Select the Air Craft</option>
                {airCraft.airCrafts.map((airCraft) => (
                  <option
                    key={airCraft.aircraftid}
                    data-key={airCraft.aircraftid}
                    value={airCraft.aircraftid}
                  >
                    {airCraft.name + "-" + airCraft.aircraftid}
                  </option>
                ))}
                
              </Form.Select>
            </div>
          </Col>
          
        </div>
      </div>
      {/* <Button type="submit">Create Schedule</Button> */}
     
    </div>
  );
}

export default StaticFlight;
