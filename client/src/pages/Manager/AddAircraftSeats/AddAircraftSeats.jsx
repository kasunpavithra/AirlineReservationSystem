import { useState } from "react";
import AddSeatGrid from "../../../components/AddSeatsGrid/AddSeatGrid";
import { useLocation } from "react-router";

function AddAircraftSeat() {
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const location = useLocation();
  const classCounts = location.state.classCounts;
  const aircraftTypeID = location.state.aircraftTypeID;
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
