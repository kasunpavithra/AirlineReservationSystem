import SeatGrid from "../../../components/SeatGrid/SeatGrid";
import { useLocation } from "react-router";
import { Navigate } from 'react-router-dom';

const BookSeat = () => {
  const location = useLocation();



  return (
    <>
    {location.state?
   
      <SeatGrid /> :  <Navigate to='/getFlight'/> }
      
    </>
  );
};

export default BookSeat;
