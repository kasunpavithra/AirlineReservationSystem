import { useState } from "react";
import SeatPicker from "react-seat-picker";

function AddSeatGrid(props) {
  const [loading, setLoading] = useState(false);
  const [seleted, setSelected] = useState([]);


  const genarateIntialRows = (x_length, y_length) => {
    const rows = [];
    var id = 1;
    for (let x = 0; x < x_length; x++) {
      var cols = [];
      for (let y = 0; y < y_length; y++) {
        var obj = {};
        obj.id = id++;
        obj.number = y;
        obj.orientation = "east";
        cols.push(obj);
      }
      rows.push(cols);
    }
    return rows;
  };

  const [rows, setRows] = useState(genarateIntialRows(props.width,props.length));

  const addSeatCallback = ({ row, number, id }, addCb) => {
    setLoading(true);
    setSelected([...seleted, id]);

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

  return (
    <div>
      <h1>Seat Picker</h1>
      <p>{props.width}</p>
      <div style={{ marginTop: "100px" }} rows={rows}>
        <SeatPicker
          addSeatCallback={addSeatCallback}
          removeSeatCallback={removeSeatCallback}
          rows={rows}
          maxReservableSeats={1000}
          alpha
          visible
          selectedByDefault
          loading={loading}
          tooltipProps={{ multiline: true }}
        />
      </div>
      <button
        onClick={() => {
          setRows([...rows,[{number:6,orientation:'east'}]]);
        }}
      >
        ADD
      </button>
    </div>
  );
}

export default AddSeatGrid;
