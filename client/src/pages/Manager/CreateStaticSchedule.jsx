import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import StaticFlight from "./staticFlight";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { IoLocation } from "react-icons/io5";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function CreateStaticSchedule() {
  const [routes, setRoutes] = useState({});
  const [flight, setFlight] = useState([{}]);
  const [org, setOrg] = useState({ val: [] });
  const [des, setDes] = useState({ val: [] });
  const navigate = useNavigate();
  const [airPort, setAirPort] = useState({ routes: [] });
  const [airCraft, setAirCraft] = useState({ airCrafts: [] });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchAirCrafts = async () => {
      const { data } = await axios("http://localhost:3001/api/aircraft/all");

      setAirCraft({ airCrafts: data.result });
    };
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3001/api/routes/all");
      data.result.map((obj) => {
        setRoutes((values) => ({ ...values, [obj.routeID]: obj }));
        setOrg((val) => ({
          ...val,
          [obj.originID]: obj.origin_name,
        }));
        setDes((val) => ({
          ...val,
          [obj.destinationID]: obj.destination_name,
        }));
      });

      //   Object.entries(routes).forEach((obj) => {
      //     setOrg((val) => ({
      //       ...val,
      //       [obj[1].originID]: obj[1].origin_name,
      //     }));
      //     setDes((val) => ({
      //       ...val,
      //       [obj[1].destinationID]: obj[1].destination_name,
      //     }));
      //   });
    };
    const fetchairports = async () => {
      const { data } = await axios("http://localhost:3001/api/airport/all");

      setAirPort({ routes: data.result });
      //   console.log(routes);
    };
    fetchData();
    fetchairports();
    fetchAirCrafts();

    //   setRoutes(data.result);
  }, []);

  function checkRouteAvailable(dep, des) {
    console.log(dep);
    console.log(des);
    var rid = undefined;
    Object.entries(routes).forEach((obj) => {
      // console.log(obj[1].routeID , dep ,des );
      if (dep == obj[1].originID && des == obj[1].destinationID) {
        console.log(obj[1].routeID);
        rid = obj[1].routeID;
      }
    });
    return rid;
  }
  const submitFlightSchedule = async (e) => {
    e.preventDefault();
    // console.log(routes);

    let grpOfFlights = [];

    var isSuccess = true;
    for (let index = 0; index < flight.length; index++) {
      const element = flight[index];
      console.log(element);
      const routeID = checkRouteAvailable(
        element.departure,
        element.destination
      );
      console.log(routeID);

      if (routeID !== undefined) {
        // console.log(new Tim);
        let objectOfFlight = {
          aircraftID: element.aircraft,
          RouteID: routeID,
          dispatchTime: element.time,
          status: 1,
        };
        grpOfFlights.push(objectOfFlight);
      } else {
        isSuccess = false;
        swal("Check Again?", "Route has been added wrong", "info");
        break;
      }
    }
    Object.entries(routes).forEach((obj) => {
      let objectOfFlight = {
        aircraftID: obj[1].airCraftID,
        RouteID: obj[1].routeID,
        dispatchTime: obj[1].time,
        status: 1,
      };
      grpOfFlights.push(objectOfFlight);
    });

    if (isSuccess) {
      console.log(grpOfFlights);
      setIsLoading(true);
      axios({
        method: "POST",
        url: "http://localhost:3001/api/staticFlight/addFlights",
        data: { grpOfFlights },
      })
        .then(function (response) {
          console.log(response.data.success);
          //   window.alert(response.data.result);
          swal(
            "Added Successfully!",
            "Flight Schedule added succesfully!",
            "success"
          ).then((res) => {
            navigate("/manager");
          });
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
      setIsLoading(false);
    }
  };
  const Background =
    "https://thumbs.dreamstime.com/b/white-model-plane-airplane-yellow-background-top-view-flat-lay-travel-vacation-concept-188196256.jpg";

  return (
    <div style={{ backgroundImage: `url(${Background})` }}>
      <div style={{ textAlign: "center" }}>
        <h1>CREATE STATIC FLIGHT SCHEDULE</h1>
      </div>
      {isLoading ? <Spinner /> : null}
      <div>
        {/* {JSON.stringify(routes)} */}
        <hr />
        {/* {JSON.stringify(flight)} */}
        <Container>
          <Form className="container4" onSubmit={submitFlightSchedule}>
            {Object.entries(routes).map(([key, val]) => (
              <>
                <Row>
                  <StaticFlight routes={val} func={setRoutes} />
                </Row>
                <hr />
              </>
            ))}
            <Col>
              {flight.length === 0 ? (
                <Col>
                  <Button
                    style={{ borderRadius: 50 }}
                    variant="dark"
                    class="btn btn-outline-dark"
                    onClick={(e) => {
                      e.preventDefault();
                      setFlight([...flight, {}]);
                    }}
                  >
                    +
                  </Button>
                </Col>
              ) : null}
              {flight.map((fg, index) => (
                <>
                  {index === 0 ? <br /> : null}
                  <hr />
                  <Row key={index}>
                    <Col>
                      <div className="col d-flex align-items-center justify-content-center">
                        <label htmlFor="departure">From </label>
                        <IoLocation size={30} />
                        <div>
                          <Form.Select
                            aria-label="Default select example"
                            name="departure"
                            onChange={(e) => {
                              const lst = [...flight];
                              lst[index][e.target.name] = e.target.value;
                              setFlight(lst);

                              // setDes({});
                              // Object.entries(routes).forEach((obj) =>
                              //   obj[1].originID == e.target.value || e.target.value==0
                              //     ? setDes((val) => ({
                              //         ...val,
                              //         [obj[1].destinationID]:
                              //           obj[1].destination_name,
                              //       }))
                              //     : null
                              // );
                            }}
                            required
                          >
                            <option value="">Select the departure</option>
                            {/* {Object.entries(routes).forEach((obj) => (
                            <option>{obj[1]["origin_name"]}</option>
                          ))} */}
                            {Object.entries(org).map(([key, val]) => (
                              <option key={key} data-key={key} value={key}>
                                {val}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="col d-flex align-items-center justify-content-center">
                        <label htmlFor="destination">To </label>
                        <IoLocation size={30} />
                        <div>
                          <Form.Select
                            aria-label="Default select example"
                            name="destination"
                            onChange={(e) => {
                              const lst = [...flight];
                              lst[index][e.target.name] = e.target.value;
                              setFlight(lst);
                              console.log(flight);
                            }}
                            required
                          >
                            <option value="">Select the destination</option>
                            {/* {Object.entries(routes).forEach((obj) => (
                            <option
                              key={obj[1].destinationID}
                              data-key={obj[1].destinationID}
                              value={obj[1].destination_name}
                            >
                              {obj[1].destination_name}
                            </option>
                          ))} */}
                            {Object.entries(des).map(([key, val]) => (
                              <option key={key} data-key={key} value={key}>
                                {val}
                              </option>
                            ))}
                          </Form.Select>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <Form.Control
                        type="time"
                        placeholder=""
                        value={fg.time}
                        variant
                        name="time"
                        onChange={(e) => {
                          const lst = [...flight];
                          lst[index][e.target.name] = e.target.value;
                          setFlight(lst);
                          console.log(flight);
                        }}
                        required
                      />
                    </Col>
                    <Col>
                      <div>
                        <Form.Select
                          aria-label="Default select example"
                          name="aircraft"
                          onChange={(e) => {
                            const lst = [...flight];
                            lst[index][e.target.name] = e.target.value;
                            setFlight(lst);
                            console.log(flight);
                            //  Object.entries(routes).forEach((obj) => {
                            //    console.log(obj[1]['origin_name']);
                            //  });
                          }}
                          required
                        >
                          <option value={""}>Select the Air Craft</option>
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
                    <Row>
                      <>
                        {index >= 0 ? (
                          <Col>
                            <Button
                              style={{ borderRadius: 50 }}
                              variant="secondary"
                              class="btn btn-outline-warning"
                              onClick={(e) => {
                                e.preventDefault();
                                const list = [...flight];
                                list.splice(index, 1);
                                setFlight(list);
                              }}
                            >
                              -
                            </Button>
                          </Col>
                        ) : (
                          <></>
                        )}
                      </>
                      {flight.length - 1 === index ? (
                        <Col>
                          <Button
                            style={{ borderRadius: 50 }}
                            variant="dark"
                            class="btn btn-outline-dark"
                            onClick={(e) => {
                              e.preventDefault();
                              setFlight([...flight, {}]);
                            }}
                          >
                            +
                          </Button>
                        </Col>
                      ) : (
                        <></>
                      )}
                    </Row>
                  </Row>
                </>
              ))}
            </Col>
            <hr />
            <Row>
              <Button
                variant="warning"
                style={{ width: 150, border: "solid" }}
                type="submit"
              >
                Create Schedule
              </Button>
            </Row>
            <hr />
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default CreateStaticSchedule;
