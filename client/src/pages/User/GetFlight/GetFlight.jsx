import React from "react";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FlightList from "./FlightList";
import "./GetFlight.module.css";
// import "./bookFlight.css"
import { useLayoutEffect } from "react";
import { Button } from "react-bootstrap";
import { ArrowRight, ArrowUpRightCircle } from "react-bootstrap-icons";
import { IoLocation } from "react-icons/io5";
import Layout from "../../Navbar/Layout/Layout";
function GetFlight() {
  const [airPort, setAirPort] = useState({ routes: [] });
  // const [dob, setdob] = useState("");
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [flight, setFlight] = useState({});
  const [isSubmitted, setSubmit] = useState(false);

  const [startDate, setStartDate] = useState(
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
  console.log(startDate);
  const [endDate, setEndDate] = useState(
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

  useLayoutEffect(() => {
    console.log("Lay out");
  });
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios("http://localhost:3001/api/airport/all");

      setAirPort({ routes: data.result });
      console.log("API was Fetched");
    };
    fetchData();
  }, [setAirPort]);

  const submitForm = async (event) => {
    event.preventDefault();
    console.log(
      departure + " " + destination + " " + startDate + " " + endDate
    );
    const year = new Date().toLocaleDateString().split("/")[2];
    const month = new Date().toLocaleDateString().split("/")[0];
    const date = new Date().toLocaleDateString().split("/")[1];
    const dep_id = departure;
    const des_id = destination;

    const { data } = await axios(
      "http://localhost:3001/api/flights/getFlightsOnwards",
      {
        params: {
          year: year,
          month: month,
          date: date,
          originID: dep_id,
          destinationID: des_id,
        },
      }
    );
    const url2 = "http://localhost:3001/api/flights/all";
    const res = await axios(url2);
    let AllTimes = res.data.result;
    const checkIsChanged = async function (obj) {
      AllTimes.map((data) => {
        if (
          data.flightID === obj.flightID &&
          data.flightTimeID > obj.flightTimeID
        ) {
          obj.updated = true;
          return true;
        }
      });
    };
    data.result.map((obj) => checkIsChanged(obj));
    setFlight({});
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    // date1.setUTCHours(0, 0, 0);
    // date2.setUTCHours(23, 59, 59);

    // console.log(new Date("7/16/2022") <= new Date("7/7/2022"));
    // console.log(date2.toLocaleDateString());

    const makeFlight = async () => {
      data.result.map(
        (obj) =>
          !obj.updated &&
          new Date(date1.toLocaleDateString().toString()) <=
            new Date(
              new Date(obj.dispatchTime).toLocaleDateString().toString()
            ) &&
          new Date(
            new Date(obj.dispatchTime).toLocaleDateString().toString()
          ) <= new Date(date2.toLocaleDateString().toString())
            ? setFlight((values) => ({ ...values, [obj.flightTimeID]: obj }))
            : null
        // date1.toLocaleDateString().toString() <=
        //   new Date(obj.dispatchTime).toISOString() &&
        // new Date(obj.dispatchTime).toISOString() <=
        //   new Date(date2).toISOString()
      );
      // data.result.map((obj) => {
      //   if (!obj.updated) {
      //     console.log(
      //       "Here ",
      //       new Date(obj.dispatchTime).toLocaleDateString().toString(),
      //       date1.toLocaleDateString().toString(),
      //       date2.toLocaleDateString().toString()
      //     );
      //     console.log(
      //       new Date(date1.toLocaleDateString().toString()) <=
      //         new Date(
      //           new Date(obj.dispatchTime).toLocaleDateString().toString()
      //         ),
      //       new Date(
      //         new Date(obj.dispatchTime).toLocaleDateString().toString()
      //       ) <= new Date(date2.toLocaleDateString().toString())
      //     );
      //   }
      // });
    };
    await makeFlight();
    console.log(flight)
    // console.log(new Date(flight[2].dispatchTime).toLocaleDateString());
    // console.log(new Date(flight[5].dispatchTime).toLocaleDateString());
    setSubmit(false);

    if (flight !== {}) {
      setSubmit(true);
    }
  };

  return (
    <>
      <Layout />

      <div className="body" style={{ "margin-top": 100 }}>
        <div className="upper ">
          <Form className="container4" onSubmit={submitForm}>
            <div className="container">
              <div className="row mt-3">
                <div className="col d-flex align-items-center justify-content-center">
                  <label htmlFor="departure">From </label>
                  <IoLocation size={30} />
                  <Form.Select
                    aria-label="Default select example"
                    name="departure"
                    onChange={(e) => {
                      const selectedIndex = e.target.options.selectedIndex;
                      setDeparture(
                        e.target.options[selectedIndex].getAttribute("data-key")
                      );
                    }}
                    required
                  >
                    <option>Select the departure</option>
                    {airPort.routes.map((airPort) => (
                      <option
                        key={airPort.airport_id}
                        data-key={airPort.airport_id}
                        value={airPort.name}
                      >
                        {airPort.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div className="col d-flex align-items-center justify-content-center">
                  <label htmlFor="destination">To </label>
                  <IoLocation size={30} />
                  <Form.Select
                    aria-label="Default select example"
                    name="destination"
                    onChange={(e) => {
                      const selectedIndex = e.target.options.selectedIndex;
                      setDestination(
                        e.target.options[selectedIndex].getAttribute("data-key")
                      );
                    }}
                    required
                  >
                    <option> Select the destination</option>
                    {airPort.routes.map((airPort) => (
                      <option
                        key={airPort.airport_id}
                        data-key={airPort.airport_id}
                        value={airPort.name}
                      >
                        {airPort.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row mt-3">
                <div className="col">
                  <label htmlFor="startDate">Start Date </label>
                  <Form.Group className="mb-3" controlId="startDate">
                    <Form.Control
                      aria-label="Default select example"
                      className=""
                      type="date"
                      value={startDate}
                      min={[
                        new Date().getFullYear(),
                        new Date().getMonth().toString().length === 2
                          ? new Date().getMonth() + 1
                          : "0" + (new Date().getMonth() + 1),
                        new Date().getDate().toString().length === 2
                          ? new Date().getDate().toString()
                          : "0" + new Date().getDate().toString(),
                      ].join("-")}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                      }}
                    />
                  </Form.Group>
                </div>
                <div className="col">
                  <label htmlFor="endDate">End Date </label>
                  <Form.Group className="mb-3" controlId="endDate">
                    <Form.Control
                      aria-label="Default select example"
                      type="date"
                      value={endDate}
                      min={[
                        new Date().getFullYear(),
                        new Date().getMonth().toString().length === 2
                          ? new Date().getMonth() + 1
                          : "0" + (new Date().getMonth() + 1),
                        new Date().getDate().toString().length === 2
                          ? new Date().getDate().toString()
                          : "0" + new Date().getDate().toString(),
                      ].join("-")}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        console.log(endDate);
                      }}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col d-flex align-items-center justify-content-center">
                  <Button type="submit">Search</Button>
                  {/* <button type="submit">Search</button> */}
                </div>
              </div>
            </div>
          </Form>

          {/* <Form onSubmit={submitForm}></Form> */}
        </div>
        <div className="lower">
          {isSubmitted && Object.keys(flight).length > 0 ? (
            <FlightList props={flight} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default GetFlight;
