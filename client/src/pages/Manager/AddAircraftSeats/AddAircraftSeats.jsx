import { useState } from "react";
import AddSeatGrid from "../../../components/AddSeatsGrid/AddSeatGrid";

function AddAircraftSeat() {
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const classCounts = [
    { name: "Platinam", id: 1, count: 2 },
    { name: "Bussiness", id: 2, count: 3 },
    { name: "Economy", id: 3, count: 4 },
  ];
  const aircraftTypeID = 1;
  //this is a comment

  return (
    <>
      <AddSeatGrid
        width={width}
        length={length}
        classCounts={classCounts}
        aircraftTypeID={aircraftTypeID}
      />
    </>
  );
}

export default AddAircraftSeat;
