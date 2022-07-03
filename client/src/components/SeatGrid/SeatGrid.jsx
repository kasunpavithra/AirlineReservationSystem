import React, { Component } from "react";
import axios from "../../api/axios";
import SeatPicker from "react-seat-picker";
import Swal from "sweetalert2";
const ADD_BOOKING_URL = "/api/bookings/addBooking";



export default class SeatGrid extends Component {
  state = {
    loading: false,
    seletedSeats: [],
  };

  addSeatCallback = ({ row, number, id }, addCb) => {
    this.setState(
      {
        seletedSeats: [...this.state.seletedSeats, id],
        loading: true,
      },
      () => {
        console.log(`Added seat ${number}, row ${row}, id ${id}`);
        const newTooltip = `selected by you`;
        console.log(this.state.seletedSeats);
        addCb(row, number, id, newTooltip);
        this.setState({ ...this.state, loading: false });
      }
    );
  };

  addSeatCallbackContinuousCase = (
    { row, number, id },
    addCb,
    params,
    removeCb
  ) => {
    this.setState(
      {
        ...this.state,
        loading: true,
      },
      async () => {
        if (removeCb) {
          await new Promise((resolve) => setTimeout(resolve, 750));
          console.log(
            `Removed seat ${params.number}, row ${params.row}, id ${params.id}`
          );
          removeCb(params.row, params.number);
        }
        await new Promise((resolve) => setTimeout(resolve, 750));
        console.log(`Added seat ${number}, row ${row}, id ${id}`);

        const newTooltip = `tooltip for id-${id} added by callback`;
        addCb(row, number, id, newTooltip);
        this.setState({ ...this.state, loading: false });
      }
    );
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    const oldarr = [...this.state.seletedSeats];
    oldarr.splice(this.state.seletedSeats.indexOf(id), 1);
    this.setState(
      {
        seletedSeats: oldarr,
        loading: true,
      },
      () => {
        console.log(`Removed seat ${number}, row ${row}, id ${id}`);
        // A value of null will reset the tooltip to the original while '' will hide the tooltip
        const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
        console.log(this.state.seletedSeats);
        removeCb(row, number, newTooltip);
        this.setState({ ...this.state, loading: false });
      }
    );
  };

  showErr = ()=>{
    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: 'Seems like someone has booked your seats before! Please try with another seats!',  
    }).then(()=>{
      window.location.reload();
    });
  }

  showSuccess = ()=>{
    Swal.fire({
      icon: 'success',
      title: 'Success',    
      text: 'Congratulations! Successfully Booked your seats!',  
    }).then(()=>{
      this.props.navigate("/dashboard");
    });
  }

  conformSeats = async () => {
    const [errMsg,setErrMsg] = this.props.errHandler;
    try {
      const response = await axios.post(
        ADD_BOOKING_URL,
        {
          registeredUserID:this.props.registeredUserID,
          guestUserID:this.props.guestUserID,
          flightID:this.props.flightID,
          classID:this.props.classID,
          under18:parseInt(this.props.childCount),
          airCraftseatIDList:this.state.seletedSeats
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      this.showSuccess();
      
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server responce");
      } else if (err.response?.status === 500 && err.response.data.tryAgain) {
        this.showErr();
      } else if(err.response?.status===500){
        setErrMsg("Server Error");
      }else{
        setErrMsg("Something went wrong!")
      }
    }
  };

  render() {
    const rows = this.props.rows;
    const { loading } = this.state;
    return (
      <div>
        <h1>Seat Picker</h1>
        <div style={{ marginTop: "100px" }}>
          <SeatPicker
            addSeatCallback={this.addSeatCallback}
            removeSeatCallback={this.removeSeatCallback}
            rows={rows}
            maxReservableSeats={parseInt(this.props.childCount)+ parseInt(this.props.adultCount)}
            alpha
            visible
            selectedByDefault
            loading={loading}
            tooltipProps={{ multiline: true }}
          />
        </div>
        <br />
        <button
          onClick={this.conformSeats}
          disabled={
            (this.state.seletedSeats.length < (parseInt(this.props.childCount)+ parseInt(this.props.adultCount))) ? true : false
          }
        >
          Conform
        </button>
      </div>
    );
  }
}
