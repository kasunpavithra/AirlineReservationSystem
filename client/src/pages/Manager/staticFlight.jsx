import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { IoLocation } from "react-icons/io5";
import axios from "axios";
// import TimePicker from 'react-time-picker'

function StaticFlight(props) {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [airPort, setAirPort] = useState({ routes: [] });
  const [flightTime, setFlightTime] = useState();
  const [route, setRoute] = useState({
    routeID: "",
    originID: "",
    origin_name: "",
    destinationID: "",
    destination_name: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios("http://localhost:3001/api/airport/all");

      setAirPort({ routes: data.result });
    };
    const routeData = props.routes;
    setRoute(routeData);
    fetchData();
  }, []);

  const submitForm = () => {};

  return (
    <div>
      {JSON.stringify(route)}
      <Form className="container4" onSubmit={submitForm}>
        <div className="container4 mt-5">
          <div className="row mt-3">
            <div className="col d-flex align-items-center justify-content-center">
              <label htmlFor="departure">From </label>
              <IoLocation size={30} />
              {/* <Form.Select
                aria-label="Default select example"
                name="departure"
                onChange={(e) => {
                  const selectedIndex = e.target.options.selectedIndex;
                  setDeparture(
                    e.target.options[selectedIndex].getAttribute("data-key")
                  );
                }}
              >
                <option>Select the departure</option>
                {airPort.routes.map((airPort) => (
                  <option
                    key={airPort.airport_id}
                    data-key={airPort.airport_id}
                  >
                    {airPort.name}
                  </option>
                ))}
              </Form.Select> */}
              <Form.Control
                style={{ "font-family": "FontAwesome" }}
                type="text"
                name="departure"
                value={route.origin_name}
                placeholder="&#xf007; Departure"
                readOnly
              />
            </div>
            <div className="col d-flex align-items-center justify-content-center">
              <label htmlFor="destination">To </label>
              <IoLocation size={30} />
              {/* <Form.Select
                aria-label="Default select example"
                name="destination"
                onChange={(e) => {
                  const selectedIndex = e.target.options.selectedIndex;
                  setDestination(
                    e.target.options[selectedIndex].getAttribute("data-key")
                  );
                }}
              >
                <option> Select the destination</option>
                {airPort.routes.map((airPort) => (
                  <option
                    key={airPort.airport_id}
                    data-key={airPort.airport_id}
                  >
                    {airPort.name}
                  </option>
                ))}
              </Form.Select> */}
              <Form.Control
                style={{ "font-family": "FontAwesome" }}
                type="text"
                name="destination"
                value={route.destination_name}
                placeholder="Destination"
                readOnly
              />
            </div>
            <div>
              <Form.Control
                style={{ "font-family": "FontAwesome" }}
                type="time"
                
                name="destination"
                value={flightTime}
                placeholder="Destination"
                onChange={(e) => {
                  setFlightTime(e.target.value);
                }}
                required
              />
              {/* Add more flights on same route with aircrafts */}
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default StaticFlight;
