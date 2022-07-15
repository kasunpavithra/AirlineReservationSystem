import { useState } from "react";
import AddSeatGrid from "../../../components/AddSeatsGrid/AddSeatGrid";

function AddAircraftSeat() {
  const [width,setWidth] = useState(0);
  const [length,setLength] = useState(0);

  
  return (
    <>
    <label>Width(In terms of seats): <input type="number" onChange={e=>setWidth(e.target.value)} /></label>
    <br /><br />
    <label>Length(In terms of seats): <input type="number" onChange={e=>setLength(e.target.value)} /></label>



      {width && length && <AddSeatGrid width={width} length={length}/>}
    </>
  );
}

export default AddAircraftSeat;
