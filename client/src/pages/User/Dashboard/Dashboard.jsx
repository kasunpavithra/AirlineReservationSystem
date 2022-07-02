import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import DatePicker from "react-datepicker";
import "./dashboard.css";
import "react-datepicker/dist/react-datepicker.css";
// import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Layout from "../../Navbar/Layout/Layout";
function Dashboard() {
  const [airRoute, setAirRoutes] = useState({ routeDat: [] });

  const [airPort, setAirPort] = useState({ routes: [] });

  // const [allFlight, setAllFlights] = useState({ flights: [] });

  const [flight, setFlight] = useState({ flights: {} });

  const [dob, setdob] = useState("");

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchRoutes = async () => {
      const { data } = await axios("http://localhost:3001/api/routes/all");
      setAirRoutes({ routeDat: data.result });
    };
    const fetchData = async () => {
      const { data } = await axios("http://localhost:3001/api/airport/all");
      setAirPort({ routes: data.result });
    };

    const fetchFlights = async () => {
      let year = new Date().getFullYear();
      let month = new Date().getMonth();
      let date = new Date().getDate();
      const url =
        "http://localhost:3001/api/flights/year/" +
        year +
        "/month/" +
        (month + 1) +
        "/date/" +
        date +
        "";
      const { data } = await axios(url);
      const url2 = "http://localhost:3001/api/flights/all";
      const res = await axios(url2);
      let AllTimes = res.data.result;
      const checkIsChanged = function (obj) {
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
      console.log(data.result);

      data.result.map((obj) =>
        setFlight((values) => ({ ...values, [obj.flightTimeID]: obj }))
      );
      setLoading(false);
    };

    fetchRoutes();
    fetchData();
    fetchFlights();
    setLoading(true);
  }, [setAirPort, setAirRoutes, setFlight]);

  let handleSubmit = async (event) => {
    event.preventDefault();
    let date = event.target.dob.value;
    let dateArr = date.split("/");

    const url =
      "http://localhost:3001/api/flights/year/" +
      dateArr[2] +
      "/month/" +
      dateArr[0] +
      "/date/" +
      dateArr[1] +
      "";
    const { data } = await axios(url);
    // setLoading(true);
    // setInterval(async () => {

    //   setLoading(false);
    // }, 1000);
    setFlight({ flights: {} });
    const url2 = "http://localhost:3001/api/flights/all";
    const res = await axios(url2);
    let AllTimes = res.data.result;
    const checkIsChanged = function (obj) {
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
    console.log(data.result);
    data.result.map((obj) =>
      setFlight((values) => ({ ...values, [obj.flightTimeID]: obj }))
    );
  };

  return (
    <>
      <div>
        <Layout/>
        <Container>
          <Row
            // style={{ margin: 10, justifyContent: "center" }}
            className="Dashboard"
          >
            <Col>
              <form onSubmit={handleSubmit}>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Date</label>
                    <DatePicker
                      className="form-control"
                      selected={dob}
                      onChange={(date) => {
                        setdob(date);
                      }}
                      placeholderText={"dd/mm/yyyy"}
                      maxDate={new Date("09/09/2022")}
                      minDate={new Date()}
                      name="dob"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <br />
                    <button
                      className="btn btn-primary profile-button"
                      name="getSchedule"
                      type="submit"
                    >
                      Get Schedule
                    </button>
                  </div>
                </div>
              </form>
            </Col>
          </Row>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <Row
              style={{ margin: 10, justifyContent: "center" }}
              className="Dashboard"
            >
              <Table
                striped
                bordered
                hover
                variant="dark"
                style={{
                  borderWidth: "1px",
                  borderColor: "#aaaaaa",
                  borderStyle: "solid",
                }}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    {airPort.routes.map((item) => (
                      <th key={item.airport_id}>{item.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {airPort.routes.map((item1) => (
                    <tr key={item1.airport_id}>
                      <td key={item1.airport_id}>{item1.name}</td>
                      {airPort.routes.map((item2) => (
                        <td key={item2.airport_id}>
                          {airRoute.routeDat.map((route) =>
                            item1.airport_id === route.originID &&
                            item2.airport_id === route.destinationID ? (
                              <h5 key={route.routeID}>
                                {Object.values(flight).map((obj) =>
                                  obj.routeID === route.routeID ? (
                                    obj.updated ? (
                                      <pre style={{ color: "red" }}>
                                        {new Date(
                                          obj.dispatchTime
                                        ).toLocaleTimeString()}
                                      </pre>
                                    ) : (
                                      <pre>
                                        {new Date(
                                          obj.dispatchTime
                                        ).toLocaleTimeString()}
                                      </pre>
                                    )
                                  ) : (
                                    ""
                                  )
                                )}
                              </h5>
                            ) : (
                              ""
                            )
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Row>
          )}

          <Button
            onClick={() => {
              navigate("/getFlight");
            }}
          >
            Book Your Flight
          </Button>
          &nbsp;&nbsp;

          <Button
            onClick={() => {
              navigate("/reguserbookings");
            }}
          >
           View My Bookings
          </Button>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
