import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { IoLocation } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function FlightDetail(props) {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [airCraftFlight, setAirCraftFlight] = useState(props.value.aircraftID);
  const [flightDate, setFlightDate] = useState(
    [
      new Date(props.value.dispatchTime).getFullYear(),
      new Date(props.value.dispatchTime).getMonth().toString().length === 2
        ? new Date(props.value.dispatchTime).getMonth() + 1
        : "0" + (new Date(props.value.dispatchTime).getMonth() + 1),
      new Date(props.value.dispatchTime).getDate().toString().length === 2
        ? new Date(props.value.dispatchTime).getDate().toString()
        : "0" + new Date(props.value.dispatchTime).getDate().toString(),
    ]
      .join("-")
      .toString()
  );
  const [show, setShow] = useState(false);
  const [isChangedFlight, setIsChangedAirCraft] = useState(false);
  const [isChangedTime, setisChangedTime] = useState(false);
  const [isChangedDate, setisChangedDate] = useState(false);

  const [time, setTime] = useState(
    [
      new Date(props.value.dispatchTime).getHours().toString().length === 1
        ? "0" + new Date(props.value.dispatchTime).getHours().toString()
        : new Date(props.value.dispatchTime).getHours().toString(),
      new Date(props.value.dispatchTime).getMinutes().toString().length === 1
        ? "0" + new Date(props.value.dispatchTime).getMinutes().toString()
        : new Date(props.value.dispatchTime).getMinutes().toString(),
    ]
      .join(":")
      .toString()
  );
  const [airCraft, setAirCraft] = useState({ airCrafts: [] });
  useEffect(() => {
    // console.log(":")
    axios.get("http://localhost:3001/api/routes/all").then((result) => {
      result.data.result.map((obj) => {
        // console.log(obj);
        if (obj.routeID === props.value.routeID) {
          setDeparture(obj.origin_name);
          setDestination(obj.destination_name);
        }
        console.log(props.value.aircraftID);
      });
      axios("http://localhost:3001/api/aircraft/all").then((result) => {
        setAirCraft({ airCrafts: result.data.result });
        console.log(result.data.result);
      });
    });
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row mt-3">
          <Col>
            <div className="col d-flex align-items-center justify-content-center">
              <label htmlFor="departure">From </label>
              <IoLocation size={30} />

              <Form.Control
                style={{ fontFamily: "FontAwesome" }}
                type="text"
                name="departure"
                value={departure}
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
                style={{ fontFamily: "FontAwesome" }}
                type="text"
                name="destination"
                value={destination}
                placeholder="Destination"
                readOnly
              />
            </div>
          </Col>
          <Col>
            <div>
              <Form.Control
                style={{ fontFamily: "FontAwesome" }}
                type="time"
                name="time"
                defaultValue={time}
                placeholder="time"
                readOnly
                required
              />
            </div>
          </Col>
          <Col>
            <div>
              <Form.Select
                aria-label="Default select example"
                name="aircraft"
                value={props.value.aircraftID}
                required
                readOnly
              >
                <option>Select the Air Craft</option>
                {airCraft?.airCrafts?.map((airCraft) => (
                  <option
                    key={airCraft?.aircraftid}
                    data-key={airCraft?.aircraftid}
                    value={airCraft?.aircraftid}
                  >
                    {airCraft?.name + "-" + airCraft?.aircraftid}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Col>
          <Col>
            <Button
              onClick={(e) => {
                setShow(true);
              }}
            >
              Update Flight Here
            </Button>
          </Col>
          
          <Modal
            show={show}
            onHide={() => {
              setShow(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {" "}
                <h3>Flight Update</h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  console.log(time);
                  if (
                    isChangedFlight === false &&
                    isChangedTime === false &&
                    isChangedDate === false
                  ) {
                    swal({
                      icon: "info",
                      title: "No Changes",
                      text: "You have not done any change!",
                      button: "OK",
                    }).then((res) => {});
                  } else {
                    await axios
                      .put("http://localhost:3001/api/flights/updateFlight", {
                        flightID: props.value.flightID,
                        dispatchTime: time,
                        aircraftID: airCraftFlight,
                        flightTimeID: props.value.flightTimeID,
                        flightDate: flightDate,
                        isChangedFlight: isChangedFlight,
                        isChangedTime: isChangedTime,
                        isChangedDate: isChangedDate,
                      })
                      .then((result) => {
                        swal(
                          "Updated Successfully!",
                          "Flight  updated succesfully!",
                          "success"
                        ).then((res) => {
                          setShow(false);
                          window.location.reload(true);
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                }}
              >
                <div>
                  <Form.Group className="mb-3" controlId="startDate">
                    <Form.Control
                      aria-label="Default select example"
                      className=""
                      type="date"
                      min={[
                        new Date(props.value.dispatchTime).getFullYear(),
                        new Date(props.value.dispatchTime).getMonth().toString()
                          .length === 2
                          ? new Date(props.value.dispatchTime).getMonth() + 1
                          : "0" +
                            (new Date(props.value.dispatchTime).getMonth() + 1),
                        new Date(props.value.dispatchTime).getDate().toString()
                          .length === 2
                          ? new Date(props.value.dispatchTime)
                              .getDate()
                              .toString()
                          : "0" +
                            new Date(props.value.dispatchTime)
                              .getDate()
                              .toString(),
                      ]
                        .join("-")
                        .toString()}
                      value={flightDate}
                      onChange={(e) => {
                        setFlightDate(e.target.value);
                        if (
                          e.target.value ===
                          [
                            new Date(props.value.dispatchTime).getFullYear(),
                            new Date(props.value.dispatchTime)
                              .getMonth()
                              .toString().length === 2
                              ? new Date(props.value.dispatchTime).getMonth() +
                                1
                              : "0" +
                                (new Date(props.value.dispatchTime).getMonth() +
                                  1),
                            new Date(props.value.dispatchTime)
                              .getDate()
                              .toString().length === 2
                              ? new Date(props.value.dispatchTime)
                                  .getDate()
                                  .toString()
                              : "0" +
                                new Date(props.value.dispatchTime)
                                  .getDate()
                                  .toString(),
                          ]
                            .join("-")
                            .toString()
                        ) {
                          setisChangedDate(false);
                        } else {
                          setisChangedDate(true);
                        }
                      }}
                    />
                  </Form.Group>
                </div>
                <hr />
                <div>
                  <Form.Control
                    style={{ fontFamily: "FontAwesome" }}
                    type="time"
                    name="time"
                    defaultValue={time}
                    placeholder="time"
                    onChange={(e) => {
                      setTime(e.target.value);
                      if (
                        e.target.value ===
                        [
                          new Date(props.value.dispatchTime)
                            .getHours()
                            .toString().length === 1
                            ? "0" +
                              new Date(props.value.dispatchTime)
                                .getHours()
                                .toString()
                            : new Date(props.value.dispatchTime)
                                .getHours()
                                .toString(),
                          new Date(props.value.dispatchTime)
                            .getMinutes()
                            .toString().length === 1
                            ? "0" +
                              new Date(props.value.dispatchTime)
                                .getMinutes()
                                .toString()
                            : new Date(props.value.dispatchTime)
                                .getMinutes()
                                .toString(),
                        ]
                          .join(":")
                          .toString()
                      ) {
                        setisChangedTime(false);
                      } else {
                        setisChangedTime(true);
                      }
                    }}
                    required
                  />
                </div>
                <hr />
                <div>
                  <Form.Select
                    aria-label="Default select example"
                    name="aircraft"
                    value={airCraftFlight}
                    onChange={(e) => {
                      setAirCraftFlight(e.target.value);
                      if (
                        e.target.value.toString() ===
                        props.value.aircraftID.toString()
                      ) {
                        setIsChangedAirCraft(false);
                      } else {
                        setIsChangedAirCraft(true);
                      }
                    }}
                    required
                  >
                    <option>Select the Air Craft</option>
                    {airCraft?.airCrafts?.map((airCraft) => (
                      <option
                        key={airCraft?.aircraftid}
                        data-key={airCraft?.aircraftid}
                        value={airCraft?.aircraftid}
                      >
                        {airCraft?.name + "-" + airCraft?.aircraftid}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <hr />
                <Button type="submit">Update</Button>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default FlightDetail;
