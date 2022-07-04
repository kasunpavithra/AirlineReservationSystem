import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import StaticFlight from "./staticFlight";
import { Button, Container, Form, Row } from "react-bootstrap";

function CreateStaticSchedule() {
  const [routes, setRoutes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3001/api/routes/all");
      data.result.map((obj) => {
        setRoutes((values) => ({ ...values, [obj.routeID]: obj }));
      });
    };
    fetchData();
    //   setRoutes(data.result);
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>CREATE STATIC FLIGHT SCHEDULE</h1>
      </div>
      <div>
        {JSON.stringify(routes)}
        <Container>
          <Form className="container4">
            {Object.entries(routes).map(([key, val]) => (
              <Row>
                <StaticFlight routes={val} func={setRoutes} />
              </Row>
            ))}
            <Row>
              <Button type="submit">Create Schedule</Button>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default CreateStaticSchedule;
