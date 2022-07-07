import React, { useState } from "react";
import { useEffect } from "react";
import { Form } from "react-bootstrap";

function SetupSchedule() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(
    new Date().getMonth().toString().length === 2
      ? new Date().getMonth() + 1
      : "0" + (new Date().getMonth() + 1)
  );
  const [days, setDays] = useState();
  const [dates, setDates] = useState({});
  const [datesOfMonths, setdatesOfMonths] = useState([
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
  ]);
  useEffect(() => {
    const isLeapYear = (year) => {
      if (year % 400 === 0) return true;
      if (year % 100 === 0) return false;
      return year % 4 === 0;
    };
    if (isLeapYear(year)) {
      setdatesOfMonths([31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
    }
    setDays(datesOfMonths[month - 1]);
    for (let i = 1; i <= days?.days; i++) {
      setDates((value) => ({
        ...value,
        [i]: new Date(year, month - 1, i),
      }));
    }
  }, []);

  return (
    <div>
      <Form.Group className="mb-3" controlId="startDate">
        <Form.Control
          aria-label="Default select example"
          className=""
          type="month"
          onChange={async (e) => {
            setYear(e.target.value.split("-")[0]);
            setMonth(e.target.value.split("-")[1]);
            const isLeapYear = (year) => {
              if (year % 400 === 0) return true;
              if (year % 100 === 0) return false;
              return year % 4 === 0;
            };
            let datesOfMonths = [
              31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
            ];
            if (isLeapYear(e.target.value.split("-")[0])) {
              datesOfMonths[1] = 29;
            }
            setDays(datesOfMonths[e.target.value.split("-")[1] - 1]);

            setDates({});
            for (
              let i = 1;
              i <= datesOfMonths[e.target.value.split("-")[1] - 1];
              i++
            ) {
              setDates((value) => ({
                ...value,
                [i]: new Date(year, month - 1, i),
              }));
            }
          }}
          value={[year, month].join("-")}
          min={[
            new Date().getFullYear(),
            new Date().getMonth().toString().length === 2
              ? new Date().getMonth() + 1
              : "0" + (new Date().getMonth() + 1),
          ].join("-")}
        />
      </Form.Group>
      <h1>{days}</h1>
      {JSON.stringify(dates)}
    </div>
  );
}

export default SetupSchedule;
