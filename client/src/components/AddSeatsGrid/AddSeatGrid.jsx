import { useState } from "react";
import SeatPicker from "react-seat-picker";
import axios from "../../../services/HttpServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ADD_AIRCRAFT_URL = "/api/airCraft/add";

function AddSeatGrid(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [seleted, setSelected] = useState([]);
  const [classIncrementer, setClassIncrementer] = useState(0);
  const [maxSeats, setMaxSeats] = useState(0);
  const [fOut,setFOut] =useState([]);

  const genarateIntialRows = (x_length, y_length) => {
    const rows = [];
    var id = 1;
    for (let x = 0; x < x_length; x++) {
      var cols = [];
      for (let y = 0; y < y_length; y++) {
        var obj = {};
        obj.id = String.fromCharCode(65 + x) + y;
        obj.number = y;
        obj.orientation = "east";
        cols.push(obj);
      }
      rows.push(cols);
    }
    return rows;
  };

  const [rows, setRows] = useState(genarateIntialRows(5, 10));

  const addSeatCallback = ({ row, number, id }, addCb) => {
    setLoading(true);
    setSelected([...seleted, id]);
    if (row.charCodeAt() - 64 === rows.length && number + 1 != rows[0].length)
      addRow();
    if (number + 1 === rows[0].length && row.charCodeAt() - 64 != rows.length)
      addColumn();
    if (row.charCodeAt() - 64 === rows.length && number + 1 === rows[0].length)
      addRowColumn();
    console.log(`Added seat ${number}, row ${row}, id ${id}`);
    const newTooltip = `selected by you`;
    console.log(seleted);
    addCb(row, number, id, newTooltip);
    setLoading(false);
  };

  const removeSeatCallback = ({ row, number, id }, removeCb) => {
    const oldarr = [...seleted];
    oldarr.splice(seleted.indexOf(id), 1);
    setLoading(true);
    setSelected(oldarr);

    console.log(`Removed seat ${number}, row ${row}, id ${id}`);
    // A value of null will reset the tooltip to the original while '' will hide the tooltip
    const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
    console.log(seleted);
    removeCb(row, number, newTooltip);
    setLoading(false);
  };

  const addRow = () => {
    const newRow = [];
    for (let y = 0; y < rows[0].length; y++) {
      var obj = {};
      obj.id = String.fromCharCode(rows.length + 65) + y;
      obj.number = y;
      obj.orientation = "east";
      newRow.push(obj);
    }

    setRows([...rows, newRow]);
  };

  const addColumn = () => {
    const newRows = [...rows];
    for (let i = 0; i < newRows.length; i++) {
      const element = newRows[i];
      element.push({
        id: String.fromCharCode(i + 65) + element.length,
        number: element.length,
        orientation: "east",
      });
    }
    setRows(newRows);
  };

  const addRowColumn = () => {
    const newRow = [];
    for (let y = 0; y < rows[0].length; y++) {
      var obj = {};
      obj.id = String.fromCharCode(rows.length + 65) + y;
      obj.number = y;
      obj.orientation = "east";
      newRow.push(obj);
    }
    const newRows = [...rows, newRow];
    for (let i = 0; i < newRows.length; i++) {
      const element = newRows[i];
      element.push({
        id: String.fromCharCode(i + 65) + element.length,
        number: element.length,
        orientation: "east",
      });
    }
    setRows(newRows);
  };

  const showSuccess = ()=>{
    Swal.fire({
      icon: 'success',
      title: 'Success',    
      text: 'Successfully added the Aircraft',  
    }).then(()=>{
      navigate(-2,{replace:true});  //navigate correct place here
    });
  }

  const showErr = (errMsg)=>{
    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: errMsg,  
    }).then(()=>{
      window.location.reload(); //change if you want
    });
  }

  const handleConfirmation =async () => {
    const fOutElement = [];
    if (classIncrementer < props.classCounts.length) {
      setMaxSeats(maxSeats + parseInt(props.classCounts[classIncrementer]?.count));
      const newRows = [...rows];
      
      seleted.forEach((element) => {
        newRows[element.charCodeAt(0) - 65][
          parseInt(element.slice(1))
        ].isReserved = true;
        fOutElement.push({
          seatNumber: element,
          xCord: element.charCodeAt(0) - 65,
          yCord: parseInt(element.slice(1)),
          classID: props.classCounts[classIncrementer].id,
        });
      });
      setRows(newRows);
      setSelected([]);
      if (classIncrementer < props.classCounts.length - 1){
        setFOut([...fOut, ...fOutElement]);
        setClassIncrementer(classIncrementer + 1);
      }
    }
    if(classIncrementer===props.classCounts.length-1){
      try {
        const response = await axios.post(
          ADD_AIRCRAFT_URL,
          {
            AircraftTypeID:props.aircraftTypeID,
            EconomySeatCount:props.classCounts.find((e)=>e.name==="Economy").count,
            BusinessSeatCount:props.classCounts.find((e)=>e.name==="Bussiness").count,
            PlatinumSeatCount:props.classCounts.find((e)=>e.name==="Platinam").count,
            seatInfo:[...fOut,...fOutElement]
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response);
        showSuccess();
        
      } catch (err) {
        console.log(err)
        if (!err?.response) {
          showErr("No server responce");
        }else if(err.response?.status===500){
          showErr("Server Error");
        }else{
          showErr("Something went wrong!")
        }
      }

    }
  };

  return (
    <div>
      <h1>Select {props.classCounts[classIncrementer].name} seats</h1>
      <div style={{ marginTop: "100px" }} rows={rows}>
        <SeatPicker
          addSeatCallback={addSeatCallback}
          removeSeatCallback={removeSeatCallback}
          rows={rows}
          maxReservableSeats={
            maxSeats + parseInt(props.classCounts[classIncrementer]?.count)
          }
          alpha
          visible
          selectedByDefault
          loading={loading}
          tooltipProps={{ multiline: true }}
        />
      </div>
      <br />
      <button
        onClick={handleConfirmation}
        disabled={
          seleted.length < parseInt(props.classCounts[classIncrementer]?.count)
            ? true
            : false
        }
      >
        Confirm {props.classCounts[classIncrementer].name} seats
      </button>
    </div>
  );
}

export default AddSeatGrid;
