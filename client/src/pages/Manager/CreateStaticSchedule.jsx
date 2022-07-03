import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import StaticFlight from "./staticFlight";

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
        {/* {JSON.stringify(routes)} */}
        {Object.entries(routes).map(([key, val]) => (
          <StaticFlight routes={val}/>
        ))}
      </div>
    </>
  );
}

export default CreateStaticSchedule;
