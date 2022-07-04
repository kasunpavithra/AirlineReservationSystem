import { useEffect, useState } from "react";
import "./viewbookings.css"
import jwtDecode from "jwt-decode";
import Layout from "../../Navbar/Layout/Layout";
//apiurl for guestUser= "/api/bookings/getGuestUserBooking/:id"
//apiurl for RegistertUser= "http://localhost:3001/api/bookings/getRegUserBooking/1"
const ViewBookings = (prop) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    var v = 0;




    useEffect(() => {
        //const abortCont = new AbortController();
        try{
            var user=jwtDecode(localStorage.getItem("AccessToken"))
            console.log(user)
           }
          

        catch(err){
            user=null
        }
        const url=prop.user=='reg'? `http://localhost:3001/api/bookings/getRegUserBooking/${user.userInfo.id}` :`http://localhost:3001/api/bookings/getGuestUserBooking/${user.userInfo.id}`
        
        fetch(url)
            .then(res => {
                if (!res.ok) throw Error("Could not fetch the data for that resource")
                return res.json()
            })
            .then(data => {
                setData(data)
                setIsPending(false)
                setError(null)
                console.log(data)
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted', err)
                } else {
                    setIsPending(false)
                    setError(err.message)
                }
            })

        //return () => { abortCont.abort(); }
    }, [])

    return (
        <><div><Layout/></div>
        <div className="vbody" style={{  height:'753.6px' }}>
            

            <div class=" container-fluid p-5" style={{height:'15%', backgroundColor: "#351b63", position: 'fixed' }}><h2 style={{ color: 'white'}}>All bookings</h2></div>

            <br />
            {isPending && <p> Loading... </p>}
            {error && <p>Error occured: {error} </p>}
            {data && !data.success && <p>Error occured: {JSON.stringify(data.err)} </p>}
            {data && data.success &&
                <div className="viewbookingscontainer"><table className="viewbookingstable">
                    <thead>
                        <tr>
                            <th className="viewbookingsth">Booking ID</th>
                            <th className="viewbookingsth">Flight ID</th>
                            <th className="viewbookingsth">Payment Status</th>
                            <th className="viewbookingsth">Booking Time</th>
                            <th className="viewbookingsth">Class ID</th>
                            <th className="viewbookingsth">Aircraft Seat ID</th>
                            <th className="viewbookingsth">Discount ID</th>
                            <th className="viewbookingsth">Flight Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.result.map(user => {
                            if ((user.status === 1)||(user.status===0)) {
                                v += 1;
                                return (<tr   className="vtr" key={user.bookingID}>
                                    <td className="viewbookingstd vtd">{user.bookingID}</td>
                                    <td className="viewbookingstd vtd">{user.flightID}</td>
                                    {(user.paymentStatus==1 && <td className="viewbookingstd vtd">Payed</td>)|| (user.paymentStatus==0 && <td className="viewbookingstd vtd">Not Payed</td>)}
                                    <td className="viewbookingstd vtd">{new Date(user.bookingTimeDate).toLocaleString()}</td>
                                    <td className="viewbookingstd vtd">{user.name}</td>
                                    <td className="viewbookingstd vtd">{user.airCraftseatID}</td>
                                    <td className="viewbookingstd vtd">{user.amount}</td>
                                    {(user.status==0 && <td className="viewbookingstd vtd" style={{ color: 'red' }}>Cancelled</td>)||(user.status==1 && <td className="viewbookingstd vtd">Booked</td>)}
                                </tr>);
                            }
                        })}

                    </tbody>
                </table>
                    {v == 0 && (<div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '20vh',
                    }}><h3 style={{ color: '#fa345c' }}>Sorry, You have no bookings for now !</h3></div>)}
                </div>
            }

        </div>
        </>
    );
}

export default ViewBookings;