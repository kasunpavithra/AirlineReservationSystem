import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./flightCard.css";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./bookingCard.css";
import Guestpopup from './Guestpopup';
function FlightCard(props) {
  const [airCraft, setAirCraft] = useState({});
  const [airCraftName, setAirCraftName] = useState("");
  const [airPortsList, setAirPorts] = useState(null);
  const [originName, setOriginName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [classDetails, setClassDetails] = useState({});
  const [show, setShow] = useState(false);
  const [classIDs, setClassIDs] = useState({});
  const [adultCount, setAdultCount] = useState("0");
  const [childCount, setChildCount] = useState("0");
  const [category, setCategory] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getAirCraftByFlight = async () => {
      const { data } = await axios.get(
        "http://localhost:3001/api/airCraft/getAirCraftByFlight",
        {
          params: {
            flightID: props.props.flightID,
          },
        }
      );

      setAirCraft({
        airCraftID: data.result[0].aircraftID,
        flightID: data.result[0].flightID,
        name: data.result[0].name,
      });
      setAirCraftName(data.result[0].name);
    };
    const airPorts = async () => {
      const { data } = await axios.get("http://localhost:3001/api/airport/all");
      setAirPorts(data.result);
      data.result.forEach((obj) =>
        obj.airport_id === flight.OriginID ? setOriginName(obj.name) : ""
      );
      data.result.forEach((obj) =>
        obj.airport_id === flight.DestinationID
          ? setDestinationName(obj.name)
          : ""
      );
    };
    setClassDetails({});
    const routeDetail = async () => {
      const { data } = await axios.get(
        "http://localhost:3001/api/routes/routePrice/" + props.props.RouteID
      );
      data.result.forEach((obj) => {
        setClassDetails((values) => ({ ...values, [obj.name]: obj.Price }));
        setClassIDs((values) => ({ ...values, [obj.classID]: obj.classID }));
      });
      

    };
    console.log(classDetails);
    console.log(classIDs)
    getAirCraftByFlight();
    airPorts();
    routeDetail();
    // console.log(props.props);
  }, [props]);

  const handleBooking = (e) => {
    e.preventDefault();
    if (childCount === "0" && adultCount === "0") {
      window.alert("Please add Passenger Count!!!");
    } else {
      if(localStorage.getItem("AccessToken"))
        navigate("/bookSeat",{state: 
          {childCount: childCount,
          adultCount: adultCount,
          flightID: props.props.flightID,
          category: category,
          aircraftID: props.props.aircraftID}
    });
      else{
        console.log('hi')
       navigate('/guestForm',{state: 
        {childCount: childCount,
        adultCount: adultCount,
        flightID: props.props.flightID,
        category: category,
        aircraftID: props.props.aircraftID}
      })
      }
    }
  };

  const flight = props.props;
  return (
    <div>
      {/* {JSON.stringify(flight)}
      {JSON.stringify(airCraft)}
      {JSON.stringify(airPortsList)} */}
      {/* {console.log(classDetails)} */}
      {/* {JSON.stringify(classDetails)} */}
      {console.log(classIDs)}
      {console.log(airCraft)}
      {props.f1(originName)}
      {props.f2(destinationName)}
      <div className="card">
        <div className="card-body">
          <Container>
            <Row>
              <Col>
                {/* <p>
                  From {originName} To {destinationName}
                </p> */}
                <p>{"AirCraft Type " + airCraftName}</p>
                <p>{new Date(flight.dispatchTime).toLocaleString()}</p>
              </Col>
              <Col>
                {Object.entries(classDetails).map(([key, val]) => (
                  <p>
                    <b>
                      {key} class ${val}
                      {<br />}
                    </b>
                  </p>
                ))}
                <Button variant="primary" onClick={handleShow}>
                  {"Select >"}
                </Button>
              </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {" "}
                  <h3>Travel Booking Form</h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleBooking}>
                  <div class="row">
                    <div class="col-sm-4">
                      {" "}
                      <h5>
                        {new Date(flight.dispatchTime).toLocaleDateString()}
                      </h5>
                    </div>
                    <div class="col-sm-4">
                      {" "}
                      <h5>
                        <h5>
                          {new Date(flight.dispatchTime).toLocaleTimeString()}
                        </h5>
                      </h5>
                    </div>
                    <div class="col-sm-4">
                      {" "}
                      <h5>
                        <h5>{airCraftName}</h5>
                      </h5>
                    </div>
                  </div>
                  {Object.entries(classDetails).map(([key, val]) => (
                    <p>
                      <b>
                        {key} class ${val}
                        {<br />}
                      </b>
                    </p>
                  ))}

                  <div>
                    <div>
                      <div class="row">
                        <div class="col-sm-6">
                          <input
                            className="browser-default custom-select mb-4"
                            type="text"
                            name=""
                            id="select"
                            value={originName}
                            readOnly
                          />
                        </div>

                        <div class="col-sm-6">
                          <input
                            className="browser-default custom-select mb-4"
                            type="text"
                            name=""
                            id="select"
                            value={destinationName}
                            readOnly
                          />
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-6">
                          <select
                            class="browser-default custom-select mb-4"
                            id="select"
                            name="childCount"
                            onChange={(e) => {
                              setChildCount(e.target.value);
                            }}
                          >
                            <option value="0" disabled="" selected="">
                              Children(0-18)
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>

                        <div class="col-sm-6">
                          <select
                            class="browser-default custom-select mb-4"
                            id="select"
                            name="adultCount"
                            onChange={(e) => {
                              setAdultCount(e.target.value);
                            }}
                          >
                            <option value="0" disabled="" selected="">
                              Adults(18+)
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>

                        <div class="col-sm-12">
                          <select
                            class="browser-default custom-select mb-4"
                            id="select"
                            name="category"
                            onChange={(e) => {
                              setCategory(e.target.value);
                            }}
                            required
                          >
                            <option value="" disabled="" selected="">
                              Category
                            </option>
                            <option value="3">Economy</option>
                            <option value="2">Business</option>
                            <option value="1">Planinum</option>
                          </select>
                        </div>
                        <div class="col-sm-12">
                          <Button type="submit">BOOK YOUR SEAT HERE</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default FlightCard;
