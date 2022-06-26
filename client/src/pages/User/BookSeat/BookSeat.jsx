import SeatGrid from "../../../components/SeatGrid/SeatGrid";
import { useLocation } from "react-router";

const BookSeat = () => {
  const location = useLocation();

  return (
    <>
      Child Count is : {location.state.childCount}
      Adult count is : {location.state.adultCount}
      Flight ID :{location.state.flightID}
      Category is : {location.state.category}
      AirCraft ID: {location.state.aircraftID}
      <SeatGrid />
    </>
  );
};

export default BookSeat;
