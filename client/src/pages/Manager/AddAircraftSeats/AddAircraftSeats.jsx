import { useState } from "react";
import AddSeatGrid from "../../../components/AddSeatsGrid/AddSeatGrid";
import { useLocation } from "react-router";
import Layout from "../../Navbar/Layout/Layout";

function AddAircraftSeat() {
  const [width, setWidth] = useState(0);
  const [length, setLength] = useState(0);
  const location = useLocation();
  const classCounts = location.state.classCounts;
  const aircraftTypeID = location.state.aircraftTypeID;
  //this is a comment
  const background =  "https://wallpapercave.com/wp/wp4128800.jpg";
  return (<> <Layout/>
    <div style={{backgroundImage: `url(${background})`,backgroundPosition: 'center', backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat', height:"800px",marginTop:"50px"}}>
      <AddSeatGrid
        width={width}
        length={length}
        classCounts={classCounts}
        aircraftTypeID={aircraftTypeID}
      />
    </div>
    </>
  );
}

export default AddAircraftSeat;
