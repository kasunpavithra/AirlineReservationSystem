import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { IoLocation } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "../../api/axios";

function UpdateStaticSchedule() {
  const [staticFlightData, setStaticFlightData] = useState({});
  const [airCraft, setairCraft] = useState({});
  const [routeData, setRouteData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/staticFlight/getRoutesData")
      .then((res) => {
        // console.log(res.data.result);
        res.data.result.map((obj) => {
          setStaticFlightData((value) => ({
            ...value,
            [obj.staticflightid]: obj,
          }));
        });
      })
      .catch((err) => {
        console.log("Error Occured!");
      });

    const fetchData = async () => {
      await axios("http://localhost:3001/api/aircraft/all")
        .then((res) => {
          setairCraft({ airCrafts: res.data.result });
          res.data.result.map((obj) => {
            setairCraft((value) => ({
              ...value,
              [obj.aircraftid]: obj,
            }));
          });
        })
        .catch((err) => {
          console.log("Error Occured!");
        });
    };

    const fetchRoutes = async () => {
      await axios("http://localhost:3001/api/routes/all")
        .then((res) => {
          res.data.result.map((obj) => {
            setRouteData((value) => ({
              ...value,
              [obj.routeID]: obj,
            }));
          });
        })
        .catch((err) => {
          console.log("Error Occured!");
        });
    };

    fetchData();
    fetchRoutes();
  }, []);

  const updateSchedule = (e) => {
    e.preventDefault();
    console.log(staticFlightData);
    let grpOfFlights = [];
    Object.entries(staticFlightData).forEach((obj) => {
      if (obj[1].isUpdated === true) {
        let objectOfFlight = {
          staticflightid: obj[1].staticflightid,
          aircraftID: obj[1].aircraftid,
          RouteID: obj[1].routeid,
          dispatchTime: obj[1].dispatchtime,
          status: "1",
        };
        grpOfFlights.push(objectOfFlight);
      }
    });
    axios({
      method: "PUT",
      url: "http://localhost:3001/api/staticFlight/updateFlights",
      data: { grpOfFlights },
    })
      .then(function (response) {
        console.log(response);
        if (response.status === 204) {
          swal({
            icon: "info",
            title: "No Changes",
            text: "You have not done any change!",
            button: "OK",
          }).then((res) => {});
        } else {
          swal(
            "Updated Successfully!",
            "Flight Schedule updated succesfully!",
            "success"
          ).then((res) => {
            navigate("/manager");
          });
        }
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          swal({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            button: "OK",
          }).then((res) => {
            window.location.reload();
          });
        }
      });
    console.log(grpOfFlights);
  };
  const Background =
    "https://thumbs.dreamstime.com/b/white-model-plane-airplane-yellow-background-top-view-flat-lay-travel-vacation-concept-188196256.jpg";

  return (
    <div className="" style={{ backgroundImage: `url(${Background})` }}>
      <div style={{ textAlign: "center" }}>
        <h1>UPDATE STATIC FLIGHT SCHEDULE</h1>
      </div>
      <div class="container">
        <Form onSubmit={updateSchedule}>
          {Object.entries(staticFlightData).map(([key, val]) => (
            <div key={key}>
              <Row>
                <div className="container4 mt-5">
                  <div className="row mt-3">
                    <Col>
                      <div className="col d-flex align-items-center justify-content-center">
                        <label htmlFor="departure">From </label>
                        <IoLocation size={30} />

                        <Form.Control
                          style={{ fontFamily: "FontAwesome" }}
                          type="text"
                          name="departure"
                          value={routeData[val.routeid]?.["origin_name"]}
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
                          value={routeData[val.routeid]?.["destination_name"]}
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
                          defaultValue={val.dispatchtime}
                          placeholder="Destination"
                          onChange={(e) => {
                            setStaticFlightData((value) => ({
                              ...value,
                              [val.staticflightid]: {
                                ...val,
                                dispatchtime: e.target.value,
                                isUpdated: true,
                              },
                            }));
                          }}
                          required
                        />
                      </div>
                    </Col>
                    <Col>
                      <div>
                        <Form.Select
                          aria-label="Default select example"
                          name="aircraft"
                          value={val.aircraftid}
                          onChange={(e) => {
                            if (e.target.value !== val.aircraftid) {
                              setStaticFlightData((value) => ({
                                ...value,
                                [val.staticflightid]: {
                                  ...val,
                                  aircraftid: e.target.value,
                                  isUpdated: true,
                                },
                              }));
                            }
                            setStaticFlightData((value) => ({
                              ...value,
                              [val.staticflightid]: {
                                ...val,
                                aircraftid: e.target.value,
                                isUpdated: true,
                              },
                            }));
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
                    </Col>
                  </div>
                </div>
              </Row>
              <hr />
            </div>
          ))}

          <Row>
            <Button
              variant="warning"
              style={{ width: 150, border: "solid" }}
              type="submit"
            >
              Update Schedule
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default UpdateStaticSchedule;
